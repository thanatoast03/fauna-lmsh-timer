from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")

counter = 0

@app.route("/increment", methods=["GET"])
def addCount():
    global counter 
    counter += 1

    return get_counter()

@app.route('/getCounter', methods=['GET'])
def get_counter():
    """
    Endpoint for long polling to get the current counter value.
    Simulate a delay to mimic long polling behavior if necessary.
    """
    return jsonify({"counter":counter})

# This is crucial for Vercel
def create_app():
    return app

# TODO: comment this out on Vercel deployment
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)