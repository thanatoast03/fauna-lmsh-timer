from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, origins="http://localhost:1234")
socketio = SocketIO(app, cors_allowed_origins="http://localhost:1234", transports=["websocket"])

counter = 0

@app.route("/increment", methods=["GET"])
@cross_origin(origins="http://localhost:1234")
def addCount():
    global counter 
    counter += 1
    print(counter)

    socketio.emit('update_counter', {'counter':counter})

    return jsonify({'message': 'Counter incremented', 'counter': counter})

@socketio.on('connect')
def handle_connect():
    print("client connected")
    emit('update_counter', {'counter':counter})

@socketio.on('disconnect')
def handle_disconnect():
    print("client disconnected")

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=8080)