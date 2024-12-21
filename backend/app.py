from fauna import fql
from fauna.client import Client
from fauna.encoding import QuerySuccess
from fauna.errors import FaunaException
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from googleapiclient.discovery import build
from email.message import EmailMessage
from google.oauth2 import service_account
import os, sys, base64, html

# Load environment variables
load_dotenv()

# FaunaDB
secret = os.getenv('FAUNADB_SECRET_KEY')
counter_id = os.getenv("COUNTER_ID")
client = Client(secret=secret)

# App Server
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://fauna-fun-sites.vercel.app"]}})
socketio = SocketIO(app, path='/api/ws', cors_allowed_origins="https://fauna-fun-sites.vercel.app")

#* FAUNA DB

def get_counter_value():
    try:
        query = fql(f"counter.byId({counter_id})")
        res: QuerySuccess = client.query(query)
        return res.data["counter"]
    except FaunaException as e:
        print("Exception occurred: " + e, file=sys.stderr)

def update_counter_value():
    try:
        current_counter = get_counter_value()
        query = fql("counter.byId(" + str(counter_id) + ")?.update({counter: " + str(current_counter + 1) + "})")
        res: QuerySuccess = client.query(query)
        return res.data['counter']
    except FaunaException as e:
        print("Exception occurred: " + e, file=sys.stderr)

#* WEBSOCKETS

@socketio.on('connect')
def socket_connect():
    print("client connected")
    counter = get_counter_value()
    emit('counter_update', {'value': counter})

@socketio.on('increment')
def socket_increment():
    new_counter = update_counter_value() # will broadcast new value to all in websocket
    emit('counter_update', {'value': new_counter}, broadcast=True)
    print(new_counter)

@socketio.on('disconnect')
def socket_disconnect():
    print("client disconnected")

@socketio.on_error()
def error_handler(e):
    print(f"SocketIO Error: {e}")
    emit('error', {'message': str(e)})

#* GMAIL API

def get_credentials():
    """Get credentials from Google Cloud default credentials"""
    try:
        
        credentials = service_account.Credentials.from_service_account_file(
            'credentials.json',
            scopes=['https://www.googleapis.com/auth/gmail.send']
        )

        return credentials
    except Exception as e:
        print(f"Error getting credentials: {e}", file=sys.stderr)
        return None

def send_email(to, subject, body, is_html=False):
    """Send an email using Gmail API with OAuth2"""
    try:
        # Get credentials
        creds = get_credentials()
        if not creds:
            raise Exception("Could not get credentials")

        # Create Gmail API service
        service = build('gmail', 'v1', credentials=creds)
        
        # Create message container
        message = EmailMessage()
        message['To'] = to
        message['From'] = os.getenv('GOOGLE_EMAIL')  # Your Gmail address
        message['Subject'] = subject
        
        # Set content type and body
        if is_html:
            message.add_alternative(body, subtype='html')
        else:
            message.set_content(body)
        
        # Encoded message
        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        create_message = {"raw": encoded_message}

        # Send email
        send_message = (
            service.users()
            .messages()
            .send(userId="me", body=create_message)
            .execute()
        )
        
        print(f'Message Id: {send_message["id"]}', file=sys.stderr)
        return send_message
        
    except Exception as error:
        print(f'An error occurred: {error}', file=sys.stderr)
        return None

#* OTHERS

@app.route("/api/user_submission", methods=["POST"])
def receive_user_submission():
    try:
        # Get and escape form data
        imageLink = html.escape(request.json.get('imageLink'))
        submitter = html.escape(request.json.get('submitter'))
        submitterLink = html.escape(request.json.get('submitterLink'))

        body_content = f"New art submission from: {submitter}\nLink to their account: {submitterLink}\n\nLink to the image: {imageLink}"

        #TODO: submission error
        if send_email(os.getenv('DEV_EMAIL'), 
                     f"new art submission from: {submitter}", 
                     body_content):
            return jsonify({"status": "success"})
        else:
            raise Exception("Failed to send email")
            
    except Exception as e:
        print(str(e), file=sys.stderr)
        return jsonify({"status": "failed"})

if __name__ == "__main__":
    # app.run(debug=True)
    socketio.run(app, host="0.0.0.0", port=8080)

    