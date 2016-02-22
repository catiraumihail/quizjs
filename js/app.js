var app = angular.module('QuizApp', ['ngRoute','ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'homeCtrl',
            templateUrl:'views/home.html'
        })
        .when('/contact', {
            controller: 'contactCtrl',
            templateUrl:'views/contact.html'
        })
        .when('/about', {
            controller: 'aboutCtrl',
            templateUrl:'views/about.html'
        })
        .when('/quizes', {
            controller: 'quizeCtrl',
            templateUrl:'views/quizes.html'
        })
        .when('/edit', {
            templateUrl:'views/edit.html'
        })
        .when('/new', {
            templateUrl:'views/new.html',
        })
        .otherwise({
            redirectTo:'/'
        });
});

app.controller('homeCtrl', function($scope){
    console.log($scope);
});

app.controller('contactCtrl', function($scope){
    console.log($scope);
});

app.controller('aboutCtrl', function($scope){
    console.log($scope);
});

app.controller('quizeCtrl', function($scope){
    console.log($scope);
});