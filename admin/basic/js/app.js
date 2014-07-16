'use strict';

/* App Module */
var app = angular.module('helloAdmin', ['filters', 'directives', 'mgcrea.ngStrap', 'ngRoute', 'ngAnimate']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            //when('/', {redirectTo: '/chapters'}).
            when('/users', {templateUrl: 'basic/templates/users_main.html', controller: UsersCtrl}).
            when('/feedback', {templateUrl: 'basic/templates/feedback.html', controller: FeedbackCtrl}).
            when('/playground', {templateUrl: 'basic/templates/playground.html', controller: PlaygroundCtrl})
            //otherwise({redirectTo: '/chapters'});
    }]);
