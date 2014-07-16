'use strict';

/* App Module */
var app = angular.module('helloMurmansk', ['filters', 'directives', 'ngRoute']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: "templates/start.html",
                controller: MainCtrl
            })
            .when('/feedback', {
                templateUrl: 'templates/feedback.html',
                controller: FeedbackCtrl
            })
            .when('/about', {
                templateUrl: 'templates/about.html',
                controller: AboutCtrl
            })
            .when('/rubrics', {
                templateUrl: 'templates/rubrics.html',
                controller: RubricsCtrl
            })
            .when('/rubrics/:rubricId', {
                templateUrl: 'templates/rubric.html',
                controller: RubricCtrl
            })
            .when('/company/:companyId', {
                templateUrl: 'templates/company.html',
                controller: CompanyCtrl
            })
            .when('/search', {
                templateUrl: 'templates/search.html',
                controller: SearchCtrl
            })
            .otherwise({redirectTo: '/'});
    }]);
