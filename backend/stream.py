from flask import Flask, Response
from .counter import stream_counter
import sys

app = Flask(__name__)

@app.route('/api/stream')
def stream():
    print("Attempting SSE connection", file=sys.stdout)

    # Set headers for Server-Sent Events (SSE)
    headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-open'
    }
    
    # Return a generator that can be streamed
    return Response(stream_counter(), mimetype='text/event-stream', headers=headers)

if __name__ == "__main__":
    app.run(debug=True)


