let recognition;

// START LISTENING
function startListening() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech Recognition not supported");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        document.getElementById("output").innerText = "Listening...";
        console.log("Recognition started");
    };

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        console.log("User said:", text);
        document.getElementById("output").innerText = "You: " + text;

        sendToBackend(text); // ✅ NOW DEFINED
    };

    recognition.onend = () => {
        console.log("Recognition ended");
    };

    recognition.onerror = (err) => {
        console.error("Speech error:", err);
    };

    recognition.start();
}

// SEND TEXT TO PYTHON BACKEND
function sendToBackend(text) {
    fetch("http://127.0.0.1:5000/command", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Backend reply:", data.reply);
        document.getElementById("reply").innerText = "Veda: " + data.reply;
        speak(data.reply);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

// TEXT TO SPEECH
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    window.speechSynthesis.speak(speech);
}
