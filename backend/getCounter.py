from flask import Flask, jsonify
from .counter import get_counter_value

app = Flask(__name__)

@app.route('/api/getCounter', methods=['GET'])
def get_counter():
    counter = get_counter_value()
    return jsonify({"counter":counter}), 200

if __name__ == "__main__":
    app.run(debug=True)
