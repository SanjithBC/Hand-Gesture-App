prediction = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YITcHLWqO/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();

        if (results[0].label == "Hand") {
            document.getElementById("update_gesture").innerHTML = "&#9995;";
        }
        if (results[0].label == "Pointing up") {
            document.getElementById("update_gesture").innerHTML = "&#128070;";
        }
        if (results[0].label == "Pointing left") {
            document.getElementById("update_gesture").innerHTML = "&#128072;";
        }
        if (results[0].label == "OK") {
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        if (results[0].label == "Thumbs up") {
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        if (results[0].label == "Clap") {
            document.getElementById("update_gesture").innerHTML = "&#128079;";
        }
    }
}