'use strict';

/* App Module */
var app = angular.module('loginApp', ["ngAnimate"]);

function LoginCtrl($scope, $http, $window){
    $scope.login = new String();
    $scope.password = new String();
    $scope.email = new String();
    $scope.loginErrors = [];
    $scope.passwordErrors = [];
    $scope.emailErrors = [];
    $scope.inProgress = new Boolean(false);
    $scope.loginFailed = new Boolean(false);
    $scope.remindFailed = new Boolean(false);
    $scope.remindSuccess = new Boolean(false);
    $scope.inRemindPasswordMode = new Boolean(false);

    /* Отправляет логин и пароль на сервер для входа в систему */
    $scope.send = function(){
        $scope.loginErrors.splice(0, $scope.loginErrors.length);
        $scope.passwordErrors.splice(0, $scope.passwordErrors.length);

        if($scope.login == "")
            $scope.loginErrors.push("Вы не ввели логин.");

        if($scope.password == "")
            $scope.passwordErrors.push("Вы не ввели пароль.");

        if($scope.loginErrors.length == 0 && $scope.passwordErrors.length == 0){
            $scope.inProgress = true;
            var params = {
                "login" : $scope.login,
                "password" : $scope.password
            };

            $http.post('php/login.php', params).success(function(data){
                console.log(data);
                if(data != "fail"){
                    var user = new User();
                    user.fromJSON(data);
                    $scope.login = "";
                    $scope.password = "";
                    console.log(user);
                    setCookie("id", user.id);
                    $window.location.reload();
                } else {
                    $scope.loginFailed = true;
                }
                $scope.inProgress = false;

            });
        }
    };


    /* Отправляет e-mail на сервер для напоминания пароля */
    $scope.remind = function(){
        $scope.emailErrors.splice(0, $scope.emailErrors.length);

        if($scope.email == "")
            $scope.emailErrors.push("Вы не ввели e-mail.");

        if($scope.emailErrors.length == 0){
            var params = {
                "email" : $scope.email
            };

            $http.post('php/remindPassword.php', params).success(function(data){
                console.log(data);
                if(data == "success"){
                    $scope.email = "";
                    $scope.remindSuccess = true;
                    $scope.remindFailed = false;
                } else
                    $scope.remindFailed = true;
                $scope.inProgress = false;
            });
        }
    };

    /* Переводит триггер в режим напоминания пароля */
    $scope.setToRemindPasswordMode = function(){
        $scope.inRemindPasswordMode = true;
        $scope.loginErrors.splice(0, $scope.loginErrors.length);
        $scope.passwordErrors.splice(0, $scope.passwordErrors.length);
    };

    /* Отменяет триггер режима напоминания пароля */
    $scope.cancelRemindPasswordMode = function(){
        $scope.inRemindPasswordMode = false;
        $scope.remindSuccess = false;
        $scope.remindFailed = false;
        $scope.loginFailed = false;
        $scope.emailErrors.splice(0, $scope.emailErrors.length);
        $scope.login = "";
        $scope.password = "";
        $scope.email = "";
    };
};