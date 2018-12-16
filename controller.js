var app = angular.module("FirebaseApp");
app.controller("firstController", ["$scope","$firebaseAuth", function ($scope, $firebaseAuth) {
// firebaseAuth det här method låta mig att göra mång function som log in och signout och signUp
    $firebaseAuth().$onAuthStateChanged(function(user){ //الطريقة الموصى بها للحصول على المستخدم الحالي هي عن طريق تعيين مراقب على كائن المصادقة:

if(user){
    $scope.user= user;
}else{
    $scope.user= null;
}
    })
    document.body.style.backgroundImage = "url('people.jpg')";
    document.body.style.backgroundSize ='cover';
    document.body.style.backgroundAttachment='fixed';
    document.body.style.backgroundRepeat='no-repeat';
}]);
app.controller("SignUpController", ["$scope", "$firebaseAuth", "$location", function ($scope, $firebaseAuth, $location) {

    $scope.signUp = function (user) { // det är en function som jag skriv denna i form ng-submit="singUp(user)"
        $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password) // de som jag skriver inner button som ng-modle
            .then(function (fireUser) {
                if (fireUser) {
                    var theUser = firebase.auth().currentUser;//????

                    theUser.updateProfile({
                        displayName: user.username 
                    }).then(function () {
                        
                    }).catch(function (error) {
                       console.log(error)
                        
                        
                    });
                    firebase.database().ref('users/' + fireUser.id).set({
                        username: user.username
                    });

                    $location.path('/');
                    
                }

            })
            .catch(function (err) {
                $scope.error = err.message;
            });
    };

    document.body.style.backgroundImage = "url('people.jpg')"
    document.body.style.backgroundSize ='cover';
    document.body.style.backgroundAttachment='fixed';
 
}]);    
app.controller("loginController", ["$scope", "$firebaseAuth", "$location", function ($scope, $firebaseAuth, $location) {
    $scope.login = function (user) {
        $firebaseAuth().$signInWithEmailAndPassword(user.email, user.password)
        .then(function (user) {
            $location.path('/');
        })
        .catch(function (err) {
            $scope.error = err.message;
        })      
    };
    document.body.style.backgroundImage = "url('people.jpg')"
    document.body.style.backgroundSize ='cover';
    document.body.style.backgroundAttachment='fixed';
}]);
app.controller("AuthCtrl", ["$scope", "$location","$firebaseAuth", function ($scope, $location,$firebaseAuth) {
    $firebaseAuth().$onAuthStateChanged(function(user){ // $onAuthStateChanged visar om iloggad eller outloggad 
        if(user){
            $scope.user= user;
        }else{
            $scope.user= null;
        }
            
    })
    $scope.signOut = function () {
        $firebaseAuth().$signOut();
        $location.path('/');
    };
    
}])
app.controller("control1", function ($scope) {

    document.body.style.backgroundColor = "#FFF";
    


    $scope.startRecording = function () {
      startRecording();
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
  })

  app.controller('AfCtrl', ['$scope', '$http', function ($scope, $http) {
    document.body.style.backgroundImage = 'url("arbetsformedlingen-skylt1.jpg")';
    document.body.style.backgroundSize ='cover';
    document.body.style.backgroundAttachment='fixed';
    $http.get("https://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/lan")
        .then(function (data) {
            $scope.lan = data.data.soklista.sokdata;
            $scope.selected = $scope.lan[0]
            $scope.changeLan = function () {
                $http.get("https://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/kommuner?lanid=" + $scope.selected.id)
                    .then(function (data) {
                        $scope.kommuner = data.data.soklista.sokdata;
                        if ($scope.kommuner[0]) {
                            $scope.selectedKommun = $scope.kommuner[0]
                        }
                    });
            }
        });
    $http.get("https://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesomraden")
        .then(function (data) {
            $scope.yrkes = data.data.soklista.sokdata;
            $scope.selectedYrkes = $scope.yrkes[0]
            $scope.changeYrke = function () {
                $http.get("https://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesgrupper?yrkesomradeid="+ $scope.selectedYrkes.id)
                .then(function (data) {
                    $scope.yrkesGrupper = data.data.soklista.sokdata;
                    $scope.selectedYrkesGrupper= $scope.yrkesGrupper[0]                    
                });
            }
        });

   $scope.run = ()=>{
    if($scope.selectedKommun.id && $scope.selectedYrkesGrupper.id){
    var url = "https://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?kommunid="+$scope.selectedKommun.id+"&nyckelord="+$scope.selectedYrkesGrupper.namn+" "+$scope.selectedKommun.namn;
    $http.get(url)
        .then(function (data) {
            var data1 = data.data.matchningslista;
            var annonser1 = data1.matchningdata;
            $scope.annonser = annonser1;
        });
    }
   }
   


    
}]);
$(document).ready(function(){
    $(window).click(function(){
        $("#brothers").css({
            color:"#1b1209"
        }).animate({
            marginTop:"10%",
        });
        
    })
    $(window).click(function(){
        $(".btnH").fadeIn(4000)
        
    })
    })
    
  