# /api/increment.py
from flask import Flask, jsonify
# from flask_cors import CORS
from .counter import get_counter_value, update_counter_value

app = Flask(__name__)
# CORS(app, origins="*")

@app.route('/api/increment', methods=['GET'])
def increment():
    new_counter = update_counter_value()
    return jsonify({"counter":new_counter}), 200

if __name__ == "__main__":
    app.run(debug=True)