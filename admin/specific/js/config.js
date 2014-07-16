app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/', {redirectTo: '/chapters'}).
        when('/chapters', {templateUrl: 'specific/templates/chapters.html', controller: ChaptersCtrl}).
        when('/organizations', {templateUrl: 'specific/templates/organizations.html', controller: OrganizationsCtrl}).
        otherwise({redirectTo: '/chapters'});
}]);
