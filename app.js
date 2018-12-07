
function speak() {
  var x = document.getElementById("t")
  var text = x.value;
  var read = new SpeechSynthesisUtterance(text)
  read.lang = document.getElementById("språk")
  window.speechSynthesis.speak(read)
}

function startRecording() {

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // för att recording stop om 10 sek // om det är 
    recognition.interimResults = true;// om det är true så det skriva som jag säger 

    recognition.lang = document.getElementById("chang-språk-1").value;// jag gjorde det för att byta språk 
    recognition.start(); // för att börjar rccording

    recognition.onresult = function (e) {
      document.getElementById('transcript').value
        = e.results[0][0].transcript;
    };
  }
}
$('#button').click(function () { translate(); });
function translate() {
  var sourceText = $('#transcript').val();
  var sourceLang = document.getElementById("chang-språk-2").value
  var targetLang = document.getElementById("chang-språk-3").value
  var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);


  $.getJSON(url, function (data) {
    $('textarea#resultText').val(data[0][0][0]);

  });

}


