from fauna import fql
from fauna.client import Client
from fauna.encoding import QuerySuccess
from fauna.errors import FaunaException
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os, sys

load_dotenv()

secret = os.getenv('FAUNADB_SECRET_KEY')
counter_id = os.getenv("COUNTER_ID")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://fauna-fun-sites.vercel.app"]}})
socketio = SocketIO(app, path='/api/ws', cors_allowed_origins="https://fauna-fun-sites.vercel.app")

client = Client(secret=secret)

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

#* OTHERS

@app.route("/api/user_submission", methods=["POST"])
def receive_user_submission():
    # TODO: gmail API integration
    # TODO: send data in email
    # TODO: gmail in requirements.txt
    # TODO: confirmation response to frontend; json with "status" field
    try:
        return jsonify({"status": "success"})
    except:
        return jsonify({"status": "failed"})

if __name__ == "__main__":
    # app.run(debug=True)
    socketio.run(app, host="0.0.0.0", port=8080)

    