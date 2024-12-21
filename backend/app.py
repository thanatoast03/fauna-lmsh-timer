from fauna import fql
from fauna.client import Client
from fauna.encoding import QuerySuccess
from fauna.errors import FaunaException
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from email.mime.text import MIMEText
import os, sys, base64, html, json

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
    """Get credentials from environment variables"""
    try:
        creds = Credentials(
            None,  # Token is not needed here since we'll use refresh token
            refresh_token=os.getenv('GOOGLE_REFRESH_TOKEN'),
            token_uri=os.getenv('GOOGLE_TOKEN_URI'),
            client_id=os.getenv('GOOGLE_CLIENT_ID'),
            client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
            scopes=['https://www.googleapis.com/auth/gmail.send']
        )
        
        # Refresh the token
        creds.refresh(Request())
        return creds
        
    except Exception as e:
        print(f"Error getting credentials: {e}", file=sys.stderr)
        return None

def send_email(to, subject, body):
    """Send an email using Gmail API with OAuth2"""
    try:
        creds = get_credentials()
        if not creds:
            raise Exception("Could not get credentials")

        service = build('gmail', 'v1', credentials=creds)
        
        message = MIMEText(body)
        message['to'] = to
        message['from'] = os.getenv('GOOGLE_EMAIL')
        message['subject'] = subject
        
        raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        create_message = {'raw': raw_message}

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

@app.route("/api/user_submission", methods=["POST"])
def receive_user_submission():
    try:
        data = request.get_json()
        if not data:
            raise ValueError("No JSON data received")
            
        required_fields = ['imageLink', 'submitter', 'submitterLink']
        if not all(field in data for field in required_fields):
            raise ValueError("Missing required fields")
            
        imageLink = html.escape(data['imageLink'])
        submitter = html.escape(data['submitter'])
        submitterLink = html.escape(data['submitterLink'])

        body_content = f"""
            New art submission received!

            Submitter: {submitter}
            Submitter's Account: {submitterLink}
            Image Link: {imageLink}
        """

        result = send_email(
            to=os.getenv('DEV_EMAIL'),
            subject=f"Fauna Website: New Art Submission from {submitter}",
            body=body_content
        )
        
        if not result:
            raise Exception("Failed to send email")
            
        return jsonify({
            "status": "success",
            "message": "Email sent successfully"
        })
            
    except ValueError as e:
        print(f"Validation error: {str(e)}", file=sys.stderr)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400
    except Exception as e:
        print(f"Server error: {str(e)}", file=sys.stderr)
        return jsonify({
            "status": "error",
            "message": "An internal server error occurred"
        }), 500
    
if __name__ == "__main__":
    # app.run(debug=True)
    socketio.run(app, host="0.0.0.0", port=8080)

    