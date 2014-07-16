'use strict';

function NavbarCtrl($scope, BasicData){
    $scope.data = BasicData;
};

function MenuCtrl($scope, BasicData, SpecificData){
    $scope.data = BasicData;
    $scope.specific = SpecificData;
};


function UsersCtrl($scope, $http, BasicData){
    $scope.basic = BasicData;
    $scope.inUserAddMode = false;
    $scope.inGroupAddMode = false;
    $scope.size = 20;

    $scope.tabs = [
        {
            "title": "Пользователи",
            "template": "basic/templates/users/users.html"
        },
        {
            "title": "Группы",
            "template": "basic/templates/users/groups.html"
        }
    ];
    $scope.activeTab = 0;

    $scope.userGroupDelete = {
        "title": "Title",
        "template": "templates/users/user_group_delete.html"
    };

    $scope.newUser = {
        groupId: 0,
        login : new String(),
        password : new String(),
        name : new String(),
        surname : new String(),
        fname : new String(),
        email : new String(),
        allow_add : new Boolean(false),
        allow_edit : new Boolean(false),
        allow_delete : new Boolean(false)
    };

    $scope.addUser = function(){
        var params = {
            "operation": "add",
            "groupId": $scope.newUser.groupId,
            "login" : $scope.newUser.login,
            "password" : $scope.newUser.password,
            "surname" : $scope.newUser.surname,
            "name" : $scope.newUser.name,
            "fname" : $scope.newUser.fname,
            "email" : $scope.newUser.email,
            "allow_add" : $scope.newUser.allow_add,
            "allow_edit" : $scope.newUser.allow_edit,
            "allow_delete" : $scope.newUser.allow_delete
        };
        console.log(params);

        $http.post('basic/php/users.php', params).success(function(data) {
            if(data != "fail"){
                var user = new User();
                user.fromJSON(data);
                $scope.basic.users.addItem(user);

                $scope.newUser.groupId = 0;
                $scope.newUser.login = "";
                $scope.newUser.password = "";
                $scope.newUser.surname = "";
                $scope.newUser.name = "";
                $scope.newUser.fname = "";
                $scope.newUser.email = "";
                $scope.newUser.allow_add = false;
                $scope.newUser.allow_edit = false;
                $scope.newUser.allow_delete = false;
            }
        });
    };

    $scope.editUser = function(id){
        var user = $scope.data.users.findItemById(id);
        console.log(user);

        var params = {
            "id" : user.id,
            "groupId": user.groupId,
            "login" : user.login,
            "password" : user.password,
            "surname" : user.surname,
            "name" : user.name,
            "fname" : user.fname,
            "email" : user.email,
            "allow_add" : user.permissions.add,
            "allow_edit" : user.permissions.edit,
            "allow_delete" : user.permissions.delete
        };

        //console.log(params);

        $http.post('basic/php/editUser.php', params).success(function(data) {
            console.log(data);
            if(data == "success"){
                console.log(data);
                $scope.data.users.findItemById(id).update();
                $scope.data.users.findItemById(id).cancelEditMode();
                console.log($scope.data.users.findItemById(id));
            }
        });
    };

    $scope.deleteUser = function(id){
        var params = {
            "id" : id
        };
        $http.post('basic/php/deleteUser.php', params).success(function(data) {
            if(data != "fail"){
                $scope.data.users.deleteItem(id);
            }
        });
    };

    $scope.setToUserAddMode = function(){
        $("#add-user").animate({"bottom": "50px"}, 500);
        $scope.inUserAddMode = true;
    };

    $scope.cancelUserAddMode = function(){
        $("#add-user").animate({"bottom": "-700px"}, 500);
        $scope.inUserAddMode = false;
        $scope.newUser.login = "";
        $scope.newUser.password = "";
        $scope.newUser.surname = "";
        $scope.newUser.name = "";
        $scope.newUser.fname = "";
        $scope.newUser.email = "";
        $scope.newUser.allow_add = false;
        $scope.newUser.allow_edit = false;
        $scope.newUser.allow_delete = false;
    };

    $scope.setToGroupAddMode = function(){
        $("#add-group").animate({"bottom": "50px"}, 500);
        $scope.inGroupAddMode = true;
    };

    $scope.cancelGroupAddMode = function(){
        $("#add-group").animate({"bottom": "-700px"}, 500);
        $scope.inGroupAddMode = false;
        $scope.newUser.login = "";
        $scope.newUser.password = "";
        $scope.newUser.surname = "";
        $scope.newUser.name = "";
        $scope.newUser.fname = "";
        $scope.newUser.email = "";
        $scope.newUser.allow_add = false;
        $scope.newUser.allow_edit = false;
        $scope.newUser.allow_delete = false;
    };
};


function FeedbackCtrl($scope, $http, BasicData){
    $scope.data = BasicData;
    $scope.feedback = new Collection();

    $scope.load = function(){
        var params = {
            "operation": "load"
        };

        $http.post('basic/php/feedback.php', params).success(function(data) {
            if(data != "fail"){
                angular.forEach(data, function(message, key){
                    var msg = new Message();
                    msg.fromJSON(message);
                    $scope.feedback.addItem(msg);
                });
            }
        });
    };

    if($scope.feedback.length() == 0)
        $scope.load();

    console.log($scope.feedback.items);
};


function PlaygroundCtrl($scope, $http, BasicData){
    $scope.basic = BasicData;
};