'use strict';

app.factory('BasicData', ['$http', '$location', function($http, $location) {
    var basic = {};

    basic.chapters = new Collection();
    basic.groups = [
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
    basic.col_one = [];
    basic.col_two = [];
    basic.col_three = [];
    basic.col_four = [];

    basic.left_col = [];
    basic.right_col = [];

    basic.searchString = "";
    basic.searchInProgress = false;
    basic.nothingFound = false;
    basic.searchStringTitle = "";
    basic.searchResult = {
        chapters: [],
        companies: []
    };

    basic.getChapters = function(){
        $http.post('php/getChapters.php').success(function(data) {
            angular.forEach(data, function(value, key){
                var chapter = new Chapter();
                chapter.fromJSON(value);
                basic.chapters.addItem(chapter);
                angular.forEach(basic.groups, function(group, key){
                    if(chapter.title[0].toLowerCase() == group.letter.toLowerCase() && chapter)
                        group.chapters.push(chapter);
                });
            });

            var index = 0;
            angular.forEach(basic.groups, function(group, key){
                if(group.chapters.length > 0){
                    index++;
                    if(index == 1)
                        basic.col_one.push(group);
                    if(index == 2)
                        basic.col_two.push(group);
                    if(index == 3)
                        basic.col_three.push(group);
                    if(index == 4)
                        basic.col_four.push(group);
                    if(index == 4)
                        index = 0;
                }
            });

            var index2 = 0;
            angular.forEach(basic.groups, function(group, key){
                if(group.chapters.length > 0){
                    index2++;
                    if(index2 == 1)
                        basic.left_col.push(group);
                    if(index2 == 2){
                        basic.right_col.push(group);
                        index2 = 0;
                    }
                }
            });
        });
    };


    basic.search = function(){
        if(basic.searchString != ""){
            var params = {
                "search": basic.searchString
            };
            basic.searchStringTitle = basic.searchString;
            basic.searchInProgress = true;
            basic.nothingFound = false;

            basic.searchResult.chapters.splice(0, basic.searchResult.chapters.length);
            basic.searchResult.companies.splice(0, basic.searchResult.companies.length);

            $http.post('php/search.php', params).success(function(data){
                if(data != null && data != undefined && data != "fail"){
                    //console.log(data);
                    if(data["chapters"] && data["chapters"] != null){
                        angular.forEach(data["chapters"], function(chapter, key){
                            var temp_chapter = new Chapter();
                            temp_chapter.fromJSON(chapter);
                            basic.searchResult.chapters.push(temp_chapter);
                        });
                    }

                    if(data["companies"] && data["companies"] != null){
                        angular.forEach(data["companies"], function(company, key){
                            var temp_company = new Organization();
                            temp_company.fromJSON(company);
                            basic.searchResult.companies.push(temp_company);
                        });
                    }

                    if(basic.searchResult.chapters.length == 0 && basic.searchResult.companies.length == 0)
                        basic.nothingFound = true;
                } else
                    basic.nothingFound = true;
            });
            $location.url("/search");
            basic.searchInProgress = false;
        }
    };

    if(basic.chapters.items.length == 0)
        basic.getChapters();

    return basic;
}]);