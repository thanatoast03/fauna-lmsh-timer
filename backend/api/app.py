from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")
socketio = SocketIO(app, 
            cors_allowed_origins="*", 
            async_mode='threading',
            ping_timeout=5,
            ping_interval=5,
            transports=["websocket"])

counter = 0

@app.route("/increment", methods=["GET"])
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

# This is crucial for Vercel
def create_app():
    return app

# TODO: comment this out on Vercel deployment
# if __name__ == '__main__':
#     socketio.run(app, host="0.0.0.0", port=8080)