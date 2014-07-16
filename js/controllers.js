'use strict';
/*** Контроллер справочника рубрик ***/
function MainCtrl($scope, $http, BasicData){

    $scope.data = BasicData;
    $scope.rows = [];
    $scope.col_one = [];
    $scope.col_two = [];
    $scope.col_three = [];
    $scope.col_four = [];

    $scope.groups = [
        {letter: "А", id: 1, chapters: [], limit: 5}, {letter: "Б", id: 2, chapters: [], limit: 5}, {letter: "В", id: 3, chapters: [], limit: 5},
        {letter: "Г", id: 4, chapters: [], limit: 5}, {letter: "Д", id: 5, chapters: [], limit: 5}, {letter: "Е", id: 6, chapters: [], limit: 5},
        {letter: "Ж", id: 7, chapters: [], limit: 5}, {letter: "З", id: 8, chapters: [], limit: 5}, {letter: "И", id: 9, chapters: [], limit: 5},
        {letter: "К", id: 10, chapters: [], limit: 5}, {letter: "Л", id: 11, chapters: [], limit: 5}, {letter: "М", id: 12, chapters: [], limit: 5},
        {letter: "Н", id: 13, chapters: [], limit: 5}, {letter: "О", id: 14, chapters: [], limit: 5}, {letter: "П", id: 15, chapters: [], limit: 5},
        {letter: "Р", id: 16, chapters: [], limit: 5}, {letter: "С", id: 17, chapters: [], limit: 5}, {letter: "Т", id: 18, chapters: [], limit: 5},
        {letter: "У", id: 19, chapters: [], limit: 5}, {letter: "Ф", id: 20, chapters: [], limit: 5}, {letter: "Х", id: 21, chapters: [], limit: 5},
        {letter: "Ц", id: 22, chapters: [], limit: 5}, {letter: "Ч", id: 23, chapters: [], limit: 5}, {letter: "Ш", id: 24, chapters: [], limit: 5},
        {letter: "Щ", id: 25, chapters: [], limit: 5}, {letter: "Э", id: 26, chapters: [], limit: 5}, {letter: "Ю", id: 27, chapters: [], limit: 5},
        {letter: "Я", id: 28, chapters: []}
    ];
    $scope.chapters = new Collection();

    $scope.getChapters = function(){
        $http.post('php/getChapters.php').success(function(data) {
            angular.forEach(data, function(value, key){
                var chapter = new Chapter();
                chapter.fromJSON(value);
                $scope.chapters.addItem(chapter);
                angular.forEach($scope.groups, function(group, key){
                    if(chapter.title[0].toLowerCase() == group.letter.toLowerCase() && chapter)
                        group.chapters.push(chapter);
                });
            });

            var index = 0;
            angular.forEach($scope.groups, function(group, key){
                if(group.chapters.length > 0){
                    index++;
                    if(index == 1)
                        $scope.col_one.push(group);
                    if(index == 2)
                        $scope.col_two.push(group);
                    if(index == 3)
                        $scope.col_three.push(group);
                    if(index == 4)
                        $scope.col_four.push(group);
                    if(index == 4)
                        index = 0;
                }
            });
            //console.log("count of chapters = " + $scope.chapters.items.length);
            //console.log($scope.groups);
            //console.log("1 = " + $scope.col_one);
            //console.log("2 = " + $scope.col_two);
            //console.log("3 = " + $scope.col_three);
            //console.log("4 = " + $scope.col_four);
        });
    };

    $scope.expand = function(id){
        //$scope.chapters.findItemById(id).limit = $scope.chapters.findItemById(id).items.length;
        angular.forEach($scope.data.groups, function(group, key){
            if(group.id == id)
                group.limit = group.chapters.length;
        });
    };

    //if($scope.data.chapters.items.length == 0)
    //    $scope.data.getChapters();

    $(".menu-item").each(function(index, element){
        $(element).removeClass("active");
    });
    $("#main").addClass("active");
};


/* Контроллер обратной связи */
function FeedbackCtrl($scope, $http){
    $scope.name = "";
    $scope.nameErrors = [];
    $scope.email = "";
    $scope.emailErrors = [];
    $scope.message = "";
    $scope.messageErrors = [];
    $scope.inProgress = false;
    $scope.messageSent = false;

    $scope.sendMessage = function(){
        $scope.messageSent = false;

        $scope.nameErrors.splice(0, $scope.nameErrors.length);
        $scope.emailErrors.splice(0, $scope.emailErrors.length);
        $scope.messageErrors.splice(0, $scope.messageErrors.length);

        if($scope.name == "")
            $scope.nameErrors.push("Вы не указали Ваше имя");
        if($scope.email == "")
            $scope.emailErrors.push("Вы не указали Ваш e-mail");
        if($scope.message == "")
            $scope.messageErrors.push("Вы ничего не написали в сообщении");

        if($scope.nameErrors.length == 0 && $scope.emailErrors.length == 0 && $scope.messageErrors.length == 0){
            $scope.inProgress = true;
            var browser = navigator.userAgent;
            var params = {
                "name": $scope.name,
                "email": $scope.email,
                "message": $scope.message,
                "browser": browser
            };
            $http.post('php/sendMessage.php', params).success(function(data){
                if(data == "success"){
                    $scope.inProgress = false;
                    $scope.messageSent = true;
                    $scope.name = "";
                    $scope.email = "";
                    $scope.message = "";
                }
            });
        }
    };

    $(".menu-item").each(function(index, element){
        $(element).removeClass("active");
    });
    $("#feedback").addClass("active");
};

/* Контроллер информации о справочнике */
function AboutCtrl(){
    $(".menu-item").each(function(index, element){
        $(element).removeClass("active");
    });
    $("#about").addClass("active");
};

/* Контроллер рубрик */
function RubricsCtrl($scope, $http, BasicData){
    $scope.data = BasicData;

    $scope.scroll = function(id){
        $('html, body').animate({scrollTop: $("#" + id).offset().top}, 300);
    };

    //if($scope.data.chapters.items.length == 0)
    //    $scope.data.getChapters();

    $(".menu-item").each(function(index, element){
        $(element).removeClass("active");
    });
    $("#chapters").addClass("active");

};

/* Контроллер рубрики */
function RubricCtrl($scope, $http, BasicData, $routeParams){
    $scope.data = BasicData;
    $scope.params = $routeParams;
    $scope.companies = new Collection();
    $scope.left_col = new Collection();
    $scope.right_col = new Collection();
    $scope.inProgress = false;

    $scope.start = 0;
    $scope.size = 20;
    $scope.total = 0;
    $scope.pages = 0;
    $scope.currentPage = 1;

    $scope.getCompanies = function(){
        var params = {
            "start": $scope.start,
            "size": $scope.size,
            "chapterId": $scope.params.rubricId
        };
        console.log(params);
        $scope.left_col.clear();
        $scope.right_col.clear();

        $scope.inProgress = true;
        $http.post('php/getCompanies.php', params).success(function(data){
            //console.log(data);
            if(data != null && data != "fail"){
                if($scope.total <= 0){
                    $scope.total = data["total"];
                    $scope.pages = Math.ceil($scope.total / $scope.size);
                    delete data["total"];
                }
                var i = 0;
                angular.forEach(data, function(value, key){
                    i++;
                    var temp_org = new Organization();
                    temp_org.fromJSON(value);

                    if(i == 1)
                        $scope.left_col.addItem(temp_org);
                    if(i == 2){
                        $scope.right_col.addItem(temp_org);
                        i = 0;
                    }

                    //$scope.start++;
                });

            }
            $scope.inProgress = false;
        });
        //console.log($scope.companies.items);
    };

    $scope.next = function(){
        $scope.getCompanies();
        $scope.start += $scope.size;
        $scope.currentPage++;
    };

    $scope.prev = function(){
        if($scope.start > $scope.size * 2)
            $scope.start -= $scope.size * 2;
        else
            $scope.start -= $scope.size;
        $scope.getCompanies();
        $scope.currentPage--;
    };

    if($scope.companies.items.length == 0){
        $scope.getCompanies();
        $scope.start += $scope.size;
    }

};

function SearchCtrl($scope, BasicData){
    $scope.data = BasicData;
};


function SearchBarCtrl($scope, BasicData){
    $scope.data = BasicData;
};

function CompanyCtrl($scope, BasicData, $routeParams, $http){
    $scope.data = BasicData;
    $scope.params = $routeParams;
    $scope.currentCompany = new Organization();
    $scope.inProgress = false;

    var params = {
        "companyId": $scope.params.companyId
    };
    $scope.getCompany = function(){
        $scope.inProgress = true;
        $http.post('php/getCompany.php', params).success(function(data){
            if(data != "fail"){
                $scope.currentCompany.fromJSON(data);
            }
            $scope.inProgress = false;
        });
    };

    $scope.getCompany();

};