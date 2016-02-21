var app = angular.module('QuizApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'views/home.html'
        })
        .when('/contact', {
            templateUrl:'views/contact.html'
        })
        .when('/about', {
            templateUrl:'views/contact.html'
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