from flask import Flask, jsonify
from .counter import update_counter_value

app = Flask(__name__)

@app.route('/api/increment', methods=['GET'])
def increment():
    new_counter = update_counter_value()
    return jsonify({"counter":new_counter}), 200

if __name__ == "__main__":
    app.run(debug=True)