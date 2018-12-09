
var app = angular.module("myApp",["ngRoute"])
app.config(["$routeProvider",function($routeProvider){
$routeProvider
.when("/home",{
  templateUrl:"item1.html",
  controller:"control1"
})
.when("/antoon",{
  templateUrl:"item2.html",
  controller:"control2"
})

}])