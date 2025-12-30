from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route("/command", methods=["POST"])
def handle_command():
    data = request.get_json()
    user_text = data.get("text", "").lower()

    if "hello" in user_text:
        reply = "Hello Deepak, how can I help you?"
    elif "time" in user_text:
        reply = datetime.now().strftime("The time is %H:%M")
    elif "veda" in user_text:
        reply = "I am Veda, your personal assistant."
    else:
        reply = "Sorry, I did not understand that."

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
