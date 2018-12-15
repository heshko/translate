var app =angular.module("FirebaseApp",["ngRoute","firebase"])
app.config(["$routeProvider",function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"/templates/home.html",
        controller:"firstController"
    })
    .when("/sign-up",{
        templateUrl:"/templates/sign-up.html",
        controller:"SignUpController"
    })
    .when("/login",{
        templateUrl:"/templates/login.html",
        controller:"loginController"
    })
    .when("/translate",{
        templateUrl:"translate.html",
        controller:"control1"
    })
    .when("/arbetsformdligen", {
        templateUrl: "arbetsformedlingen.html",
        controller: "AfCtrl"
    })
    
    
}])

$(document).ready(function(){
    $(window).click(function(){
        $("#brothers").css({
            color:"#1b1209"
        }).animate({
            marginTop:"10%", 
        });
        $(".btnH").fadeIn(4000)({
        }) 
    })
    })
    
    