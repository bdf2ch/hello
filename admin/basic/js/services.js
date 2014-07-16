'use strict';

var BasicModule = angular.module('BasicModule', []);
app.factory('BasicData', ['$http', '$window', function($http, $window){

    var basic = {};

    basic.user = new User(); // Текущий пользователь


    /** Меню **/
    basic.menu = new Collection();
    basic.menu.addItem(new MenuItem(1, "Доступ к панели", "#/users", "icon-user", true));
    basic.menu.addItem(new MenuItem(2, "Монитор активности", "#/activity", "icon-tasks", true));
    basic.menu.addItem(new MenuItem(3, "Шаблоны", "#/templates", "icon-list-alt", true));
    basic.menu.addItem(new MenuItem(4, "Обратная связь", "#/feedback", "icon-envelope", false));
    basic.menu.addItem(new MenuItem(5, "отладка и тестирование", "#/playground", "icon-star", false));
    basic.currentMenuItem = new Number(); // Текущий раздел меню

    /** Коллекции данных **/
    basic.users = new Collection();
    basic.userGroups = new Collection();
    basic.feedback = new Collection();

    basic.organizations = new Collection();
    basic.chapters = new Collection();


    basic.getUserGroups = function(){
        var params = {
            "operation": "load"
        };

        $http.post('basic/php/userGroup.php', params).success(function(data) {
            angular.forEach(data, function(group, index){
                var user_group = new UserGroup();
                user_group.fromJSON(group);
                basic.userGroups.addItem(user_group);
            });
            console.log(basic.userGroups.items);
        });
    };

    basic.getUsers = function(){
        var params = {
            "operation": "load"
        };

        $http.post('basic/php/users.php', params).success(function(data) {
            angular.forEach(data, function(user, index){
                var temp_user = new User();
                temp_user.fromJSON(user);
                basic.users.addItem(temp_user);
            });
            console.log(basic.users.items);
        });
    };

    basic.getUser = function(){
        var cookie = getCookie();
        var params = {id: cookie["id"]};
        $http.post('basic/php/getUser.php', params).success(function(data) {
            basic.user.fromJSON(data);
            if(basic.user.isAdministrator == true)
                basic.getUsers();
        });
    };

    basic.logOut = function(){
        setCookie("id", "");
        $window.location.reload();

        //$http.post('php/logOut.php').success(function(data) {
        //    if(data == "success"){
        //

        //    }
            //console.log(utils.statusList);
        //});
    };


    if(basic.userGroups.length() == 0)
        basic.getUserGroups();
    if(basic.user.id == 0)
        basic.getUser();

    return basic;
}]);