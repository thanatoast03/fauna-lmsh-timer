from fauna import fql, Document
from fauna.client import Client
from fauna.encoding import QuerySuccess
from fauna.errors import FaunaException
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from threading import Thread
import os, sys, json

load_dotenv()

secret = os.getenv('FAUNADB_SECRET_KEY')
counter_id = os.getenv("COUNTER_ID")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://fauna-lmsh-timer.vercel.app"]}})
socketio = SocketIO(app, path='/api/ws', cors_allowed_origins="https://fauna-lmsh-timer.vercel.app")

client = Client(secret=secret)

# Get the current counter value from FaunaDB
def get_counter_value():
    try:
        query = fql(f"counter.byId({counter_id})")
        res: QuerySuccess = client.query(query)
        return res.data["counter"]
    except FaunaException as e:
        print("Exception occurred: " + e, file=sys.stderr)

# Update current counter value from FaunaDB
def update_counter_value():
    try:
        current_counter = get_counter_value()
        query = fql("counter.byId(" + str(counter_id) + ")?.update({counter: " + str(current_counter + 1) + "})")
        res: QuerySuccess = client.query(query)
        return res.data['counter']
    except FaunaException as e:
        print("Exception occurred: " + e, file=sys.stderr)

def stream_counter():
    try:
        # Initialize the stream query
        stream_query = client.stream(fql(f"Set.single(counter.byId({counter_id})!).eventsOn(.counter)"))
        print("Stream initialized successfully", file=sys.stderr)
        
        while True:
            try:
                # Get the next event from the stream, or None if no event is available
                event = next(stream_query, None)
                
                if event:
                    if event.get('type') == 'update':
                        document: Document = event['data']
                        counter_value = document.get('counter', 0)
                        # yield f"data: {json.dumps({'counter': counter_value})}\n\n" 
                        emit('counter_update', {'value':counter_value}, broadcast=True) # send to all websockets
                        print(f"New counter value: {counter_value}", file=sys.stderr)
            
            except Exception as inner_e:
                # Log and handle any exceptions during the event streaming
                print(f"Error during stream processing: {str(inner_e)}", file=sys.stderr)
                yield f"data: {json.dumps({"error": f"Error {str(inner_e)}\n\n"})}"
                break  # Optionally, break the loop on failure to process event
            
    except FaunaException as e:
        print(f"FaunaDB Exception: {str(e)}", file=sys.stderr)
        yield f"data: {json.dumps({"error": f"Error {str(e)}\n\n"})}"
    except Exception as e:
        # Catch any unexpected exceptions that occur outside the streaming logic
        print(f"Unexpected error: {str(e)}", file=sys.stderr)
        yield f"data: {json.dumps({"error": f"Error {str(e)}\n\n"})}"
    
    # If you end up here, it means the loop was broken unexpectedly.
    print("Exiting stream_counter unexpectedly", file=sys.stderr)

#* ROUTES

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

if __name__ == "__main__":
    # app.run(debug=True)
    socketio.run(app, host="0.0.0.0", port=8080)
    # socketio.run(app)

    # stream_thread = Thread(target=stream_counter) # make a counter faunadb stream running on its own thread
    # stream_thread.daemon = True
    # stream_thread.start()

    