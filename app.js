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
    .when('/arbetsförmdligen', {
        templateUrl: 'templates/arbetsförmedlingen.html',
        controller: 'AfCtrl'
    })
    
    
}])