'use strict';

/* Directives */
angular.module("directives", [])
    .directive("list", function(BasicData){
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'basic/templates/components/table.html',
            scope: {
                data: "=",
                size: "="
            },
            link: function(scope, element, attrs){
                scope.basic = BasicData;
                scope.total = 0;
                scope.start = 0;
                scope.sizes = [10, 20, 30, 40, 50, 100];
                //scope.size = scope.sizes[0];
                scope.pagesCount = 1;
                scope.currentPage = 1;
                scope.fields = [];
                scope.headers = [];

                if(attrs.data && attrs.data != ""){
                    scope.total = scope.data.length;
                    scope.pagesCount = Math.ceil(scope.total / scope.size);
                    scope.start += scope.size;
                } else
                    scope.data = "";

                if(attrs.toolbar && attrs.toolbar != "")
                    scope.toolbar = new Boolean(parseInt(attrs.toolbar))
                else
                    scope.toolbar = false;

                if(attrs.editable && attrs.editable != "" && attrs.editable == "1")
                    scope.editable = 1
                else
                    scope.editable = 0;

                if(attrs.fields && attrs.fields != ""){
                    scope.fields = attrs.fields.split(",");
                }

                if(attrs.headers && attrs.headers != ""){
                    scope.headers = attrs.headers.split(",");
                }


                scope.next = function(){
                    scope.start += scope.size;
                    scope.currentPage++;
                    console.log("start = " + scope.start);
                };

                scope.previous = function(){
                    scope.start -= scope.size;
                    scope.currentPage--;
                };

                scope.toPage = function(page){
                    scope.start = page * scope.size;
                    scope.currentPage = page;
                };
            }
        }
    })
    .directive("menuitem", function($location){
        return {
            restrict: "A",
            link: function(scope, element, attrs){
                element.on("click", function(){
                    scope.data.currentMenuItem = $(element).attr("id");
                    //console.log(scope.data.menu.findItemById(scope.data.currentMenuItem));
                    var path = scope.data.menu.findItemById(scope.data.currentMenuItem).link;
                    //$location.url(path);
                    //console.log($location.url(path).absUrl());

                });

                scope.$watch('data.currentMenuItem', function(newVal, oldVal){
                    $(element).parent().children("div").each(function(index, elm){
                        $(elm).removeClass("active");
                    });
                    $("#" + newVal).addClass("active");
                });
            }
        }

   });


