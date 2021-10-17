prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 370,
    height: 320,
    image_format: 'png',
    png_quality: 90
})

camera = document.getElementById("camera").value;

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML="<img id='picture' src='"+data_uri+"'>";
    })
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/RgaubIziD/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var UtterThis =  new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(UtterThis);
}

function check() {
    img = document.getElementById("picture");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
       console.error(error); 
    } else {
       console.log(result);
       document.getElementById("result_emotion_name").innerHTML = result[0].label;
       document.getElementById("result_emotion_name2").innerHTML = result[1].label;
       prediction_1 = result[0].label;
       prediction_2 = result[1].label;
       speak();
       if (result[0].label == "happy") {
           document.getElementById("result_emoji").innerHTML = "&#128522;"; 
       }
       if (result[0].label == "sad") {
          document.getElementById("result_emoji").innerHTML = "&#128532;";
       }
       if (result[0].label == "angry") {
          document.getElementById("result_emoji").innerHTML = "&#128545;";
       }
       if (result[0].label == "awe") {
          document.getElementById("result_emoji").innerHTML = "&#128565;";
       }
       if (result[0].label == "disgust") {
          document.getElementById("result_emoji").innerHTML = "&#128534;";
       }
       if (result[1].label == "happy") {
          document.getElementById("result_emoji2").innerHTML = "&#128522;"; 
      }
      if (result[1].label == "sad") {
         document.getElementById("result_emoji2").innerHTML = "&#128532;";
      }
      if (result[1].label == "angry") {
         document.getElementById("result_emoji2").innerHTML = "&#128545;";
      }
      if (result[1].label == "awe") {
         document.getElementById("result_emoji2").innerHTML = "&#128565;";
      }
      if (result[1].label == "disgust") {
         document.getElementById("result_emoji2").innerHTML = "&#128534;";

       }
    }
}