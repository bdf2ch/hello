'use strict';

/* Directives */
angular.module("directives", []).directive('hdate', function($filter) {
    return {
        require: 'ngModel',
        //restrict: 'E',
        //scope: { ngModel: '=' },
        link: function(scope, element, attr, ctrl){
            var type = attr.hdate;
            ctrl.$formatters.push(function(modelValue){
                switch(type){
                    case "dateTime": return moment.unix(modelValue).format("DD MMM HH:mm");
                        break;
                    case "date": return moment.unix(modelValue).format("DD MMM");
                        break;
                    case "time": return moment.unix(modelValue).format("HH:mm");
                        break;
                    case "fullDate" : return moment.unix(modelValue).format("DD.MM.YY");
                        break;
                }
            });

            ctrl.$parsers.unshift(function(viewValue){
                if(moment(viewValue, "DD.MM.YY").isValid()){
                    //switch(type){
                    //	case "date": return
                    //}
                    // it is valid
                    //ctrl.$setValidity('hdate', true);
                    //return moment(viewValue, "DD.MM.YY").unix();

                    console.log(scope.request.id);
                    return "000222333";
                    console.log("valid");
                } else
                    return "";
            });

        }
    };
}).directive('keyFocus', function(){
        return {
            restrict: 'A',
            link:   function(scope, elem, attrs){
                //elem.bind('keydown', function(e){
                //	if (e.keyCode == 13){
                //		alert("enter pressed");
                //	}
                //});

                elem.on('keydown', function (e) {
                    if (e.keyCode === 38){
                        e.preventDefault();
                        alert("enter");
                    }
                });
            }
        };
    }).directive('transportitem', function() {
        return {
            require: 'ngModel',
            //restrict: 'E',
            //scope: { ngModel: '=' },
            link: function(scope, element, attr, ctrl){
                //var gscope = angular.element(element).scope();
                ctrl.$formatters.push(function(modelValue){
                    angular.forEach(scope.root.transportItemList, function(value, index){
                        if(value.id == modelValue){
                            return ("(" + value.gid + ") " + value.model);
                            console.log(value.id);
                        }
                    });
                });

                ctrl.$parsers.unshift(function(viewValue){

                });

            }
        }
    });

app.directive('dateTimePicker', ['GlobalData', function(gd){
    return {
        restrict: 'E',
        replace: true,
        //scope: {
        //
        //},
        //require: "?ngModel",
        template:
        //'<div class="input-append date" id="datetimepicker" data-date="12-02-2012" data-date-format="dd-mm-yyyy">'+
            '<input size="16" type="text" class="dateTime" >',
        //'<span class="add-on"><i class="icon-remove"></i></span>'+
        //'<span class="add-on"><i class="icon-th"></i></span></div>' ,
        //compile: function compile(tElement, tAttrs, transclude) {
        // return {
        //    pre: function preLink(scope, iElement, iAttrs, controller){
        //		if(iAttrs.id){
        //			$(iElement).attr("id", iAttrs.id);
        //		}
//		}
        //     }
        //  },

        link: function(scope, element, attrs){
            if(attrs.id){
                $(element).attr("id", attrs.id);
            }

            element.bind('$create', function() {
                element.datetimepicker({
                    format: "dd.mm.yy hh:ii",
                    weekStart: 1,
                    forceParse: true,
                    todayHighlight: true,
                    showMeridian: false,
                    autoclose: true,
                    todayBtn: true,
                    pickerPosition: 'bottom-left',
                    minuteStep: 15,
                    initialDate: moment(gd.currentDate).format("DD.MM.YY HH:mm")
                });
            });
            //scope.$watch("data", function(value){
            //	scope.data = value;
            //});
            //console.log("data = " + ngModel);
            //if(scope.data == undefined){
            //	gd.getCurrentDate();
            //}

            //ngModel.$parsers.push(function(value){
            //	return moment(value).format("DD.MM.YY HH:mm");
            //});

            //ngModel.$formatters.push(function(value){
            //	return moment(value).toDate();
            //});

            var input = element.find('input');
            //	console.log("controller = " + ngModel);

            //	ngModel.$render = function(){
            //		console.log("render");
            //		$(input).val(moment(scope.data).format("DD.MM.YY HH:mm"));
            //	};

            //ngModel.$parsers.push(function(value){
            //	if(typeof value = 'Date')
            //		return moment(value).format("DD.MM.YY  hh:mm");
            //});

            element.datetimepicker({
                format: "dd.mm.yy hh:ii",
                weekStart: 1,
                forceParse: true,
                todayHighlight: true,
                showMeridian: false,
                autoclose: true,
                todayBtn: true,
                pickerPosition: 'bottom-left',
                minuteStep: 15,
                initialDate: moment(gd.currentDate).format("DD.MM.YY HH:mm")
            });

            $(element).attr("value", moment(gd.currentDate).format("DD.MM.YY HH:mm"));

            console.log("date = " + gd.currentDate)

            $(element).datetimepicker('setStartDate', moment(gd.currentDate).format("DD.MM.YY HH:mm"));

            if(scope.id=="newRequestStartDate"){
                $("#newRequestEndDate").timepicker('setStartDate', moment($(element).val(), "DD.MM.YY HH:mm"));
            }

            element.bind('blur keyup change', function() {
                //ngModel.$setViewValue(moment(element.val(), "DD.MM.YY HH:mm").toDate());
                console.log(moment($(element).val(), "DD.MM.YY HH:mm").toDate());
                //scope.$apply(read);
                if(attrs.id && attrs.id == "newRequestStartTime"){
                    console.log("that's it " + attrs.id);
                    $("#newRequestEndTime").timepicker('setStartDate', moment($(element).val(), "DD.MM.YY HH:mm"));
                }
            });

            function read() {
                scope.ngModel = input.val();
                console.log(controller);
            }
        }
    }
}]);


app.directive('time', function(){
    //var compileFn = function(element, attrs){
    //	console.log(attrs);
    //	attrs.$set("request", $interpolate(attrs.request));
    //};

    var linkFn = function(scope, element, attrs, ngModel){
        //console.log(ngModel);

        var date = new moment(ngModel.$modelValue);
        //console.log(ngModel.$viewValue);
        //console.log("moment = " + date);

        ngModel.$render = function(){
            //console.log("value = " + ngModel.$modelValue);
            $(element).val(moment.unix(ngModel.$modelValue).format("DD.MM.YY HH:mm"));
        }

        ngModel.$parsers.push(function(value){
            return moment(value, "DD.MM.YY HH:mm").unix();
        });

        //ngModel.$formatters.push(function(value){
        //	var val = moment(value, "DD.MM.YY HH:mm");
        //	return val.unix();
        //});
        //controller.$setViewValue(moment.unix(controller.$modelValue).format("DD.MM.YY HH:mm"));
        //$(element).attr("value", moment(controller.$modelValue).format("DD.MM.YY HH:mm"));
        //$(element).val(moment(controller.$modelValue).format("DD.MM.YY HH:mm"));
        //var requestId = $(element).parent("div").parent("td").parent("tr").attr("id");
        //console.log($(element).parent("div").parent("td").parent("tr").attr("id"));

        //if(attrs.request)
        var requestId = $(element).attr("request");
        //console.log(scope.request);
        //console.log(attrs.$attr['request']);

        $(element).datetimepicker({
            language: "ru",
            format: "dd.mm.yy hh:ii",
            startView: 'month',
            weekStart: 1,
            forceParse: true,
            todayHighlight: true,
            showMeridian: false,
            autoclose: true,
            todayBtn: false,
            pickerPosition: 'bottom-left',
            minuteStep: 15
            //initialDate: moment(controller.$modelValue).format("HH:mm")
        });

        $(element).bind("change", function(){
            //e.preventDefault();
            ngModel.$setViewValue($(element).val());
            $(element).keypress();
            //$(element).change();
            //scope.$apply(setToChanged(attrs.request));
        });
    };

    return {
        restrict: "A",
        require: "?ngModel",
        link: linkFn
        //compile: compileFn
    }
});

app.directive("request", function($window){
    return {
        restrict: "A",
        require: "?ngModel",
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {},
                post: function postLink(scope, iElement, iAttrs, controller){
                    if(controller){
                        var startOfTheCurrentDay = moment(scope.data.currentMoment).hours(0).minutes(0).unix();
                        var endOfTheCurrentDay = moment(scope.data.currentMoment).hours(23).minutes(59).unix();
                        // moment(endOfTheCurrentDay).hours(23).minutes(59);


                        //console.log("startOfTheCurrentDay = " + startOfTheCurrentDay);
                        //console.log("endOfTheCurrentDay = " + endOfTheCurrentDay);
                        //console.log("startTime = " + controller.$modelValue.startTime);
                        //console.log("endTime = " + controller.$modelValue.endTime);
                        //console.log("");



                        // Пересчет размеров блока заявки при изменении модели данных
                        scope.$watch(controller.$modelValue, function(modelValue){
                            var tw = $(iElement).parent("div").width();
                            var startOfTheDay = moment.unix(controller.$modelValue.startTime).hour(0).minutes(0).unix();
                            var width, left;

                            // Начинается ранее, чем сегодня, заканчивается в течение дня
                            if(controller.$modelValue.startTime < startOfTheCurrentDay &&
                                controller.$modelValue.endTime >= startOfTheCurrentDay &&
                                controller.$modelValue.endTime <= endOfTheCurrentDay){
                                console.log("CASE 1");
                                width = ((controller.$modelValue.endTime - startOfTheCurrentDay) / 60) / 15 * (tw / 96);
                                left = 0;
                                $(iElement).addClass("request_ left");
                                $(iElement).children(".leftArrow").css("display", "block");
                            }
                            // Начинается ранее, чем сегодня и заканчивается позднее, чем сегодня
                            if(controller.$modelValue.startTime < startOfTheCurrentDay &&
                                controller.$modelValue.endTime > endOfTheCurrentDay){
                                width = tw;
                                left = 0;
                                $(iElement).addClass("request_ both");
                                $(iElement).children(".leftArrow").css("display", "block");
                                $(iElement).children(".rightArrow").css("display", "block");
                                console.log("BINGO");
                            } else {
                                // width = ((controller.$modelValue.endTime - controller.$modelValue.startTime) / 60) / 15 * (tw / 96) - 2;
                                // left = ((controller.$modelValue.startTime - startOfTheDay) / 60) / 15 * (tw / 96);
                                console.log("NO BINGO");
                            }

                            // Начинается в течении дня, заканчивается в течение дня
                            if(controller.$modelValue.startTime >= startOfTheCurrentDay &&
                                controller.$modelValue.endTime <= endOfTheCurrentDay){
                                console.log("CASE 2");
                                width = ((controller.$modelValue.endTime - controller.$modelValue.startTime) / 60) / 15 * (tw / 96);
                                left = ((controller.$modelValue.startTime - startOfTheCurrentDay) / 60) / 15 * (tw / 96);
                            }

                            // Начинается сегодня, заканчивается позднее, чем сегодня
                            if(controller.$modelValue.startTime >= startOfTheCurrentDay &&
                                controller.$modelValue.startTime < endOfTheCurrentDay &&
                                controller.$modelValue.endTime > endOfTheCurrentDay){
                                console.log("CASE 3");
                                width = ((endOfTheCurrentDay - controller.$modelValue.startTime) / 60) / 15 * (tw / 96);
                                left = ((controller.$modelValue.startTime - startOfTheCurrentDay) / 60) / 15 * (tw / 96);
                                $(iElement).addClass("request_ right");
                                $(iElement).children(".rightArrow").css("display", "block");
                            }


                            $(iElement).css("width", width);
                            $(iElement).css("left", left);
                        });

                        // Пересчет размеров блока заявки при изменении размеров окна
                        $($window).resize(function(){
                            //var tw = $(iElement).parent("div").width();
                            //var width = ((controller.$modelValue.endTime - controller.$modelValue.startTime) / 60) / 15 * (tw / 96);
                            //var startOfTheDay = moment.unix(controller.$modelValue.startTime).hour(0).minutes(0).unix();
                            //var left = ((controller.$modelValue.startTime - startOfTheDay) / 60) / 15 * (tw / 96);

                            var tw = $(iElement).parent("div").width();
                            var startOfTheDay = moment.unix(controller.$modelValue.startTime).hour(0).minutes(0).unix();
                            var width, left;

                            // Начинается ранее, чем сегодня, заканчивается в течение дня
                            if(controller.$modelValue.startTime < startOfTheCurrentDay &&
                                controller.$modelValue.endTime >= startOfTheCurrentDay &&
                                controller.$modelValue.endTime <= endOfTheCurrentDay){
                                width = ((controller.$modelValue.endTime - startOfTheCurrentDay) / 60) / 15 * (tw / 96);
                                left = 0;
                                $(iElement).addClass("request_ left");
                            }
                            // Начинается ранее, чем сегодня и заканчивается позднее, чем сегодня
                            if(controller.$modelValue.startTime < startOfTheCurrentDay &&
                                controller.$modelValue.endTime > endOfTheCurrentDay){
                                width = tw;
                                left = 0;
                                $(iElement).addClass("request_ both");
                            }
                            // Начинается в течении дня, заканчивается в течение дня
                            if(controller.$modelValue.startTime >= startOfTheCurrentDay &&
                                controller.$modelValue.endTime <= endOfTheCurrentDay){
                                width = ((controller.$modelValue.endTime - controller.$modelValue.startTime) / 60) / 15 * (tw / 96);
                                left = ((controller.$modelValue.startTime - startOfTheCurrentDay) / 60) / 15 * (tw / 96);
                            }
                            // Начинается сегодня, заканчивается позднее, чем сегодня
                            if(controller.$modelValue.startTime >= startOfTheCurrentDay &&
                                controller.$modelValue.startTime < endOfTheCurrentDay &&
                                controller.$modelValue.endTime > endOfTheCurrentDay){
                                width = ((endOfTheCurrentDay - controller.$modelValue.startTime) / 60) / 15 * (tw / 96);
                                left = ((controller.$modelValue.startTime - startOfTheCurrentDay) / 60) / 15 * (tw / 96);
                                $(iElement).addClass("request_ right");
                            }




                            $(iElement).css("width", width);
                            $(iElement).css("left", left);
                        });

                        // Обработчик двойного клика
                        $(iElement).dblclick(function(){
                            //console.log("dblclick");
                            //console.log(controller.$modelValue.id);
                            angular.forEach(scope.requests, function(value, key){
                                if(value.id == controller.$modelValue.id){
                                    var temp_request = new Request();
                                    var temp_user = new User();
                                    temp_user.fromAnother(value.user);
                                    temp_request.fromAnother(value);
                                    temp_request.user.fromAnother(temp_user);
                                    scope.currentRequest.fromAnother(temp_request);
                                    // scope.currentRequest.user.fromAnother(temp_user);
                                    console.log(scope.currentRequest);
                                    scope.$apply();
                                    scope.showEditDialog();
                                }
                            });
                        });

                    } // if(controller)

                } // postLink()
            }
        } // compile()
    };
});

app.directive("timeheader", function($window){
    return {
        restrict: "A",
        require: "?ngModel",
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {},
                post: function postLink(scope, iElement, iAttrs, controller){
                    var tw = $(".timeline_:first").width();
                    var tt = $("#timetable").width();
                    //console.log("tw = " + tw);
                    $(iElement).css("width", tt);
                    //console.log("ew = " + $(iElement).width());
                    //var hour = $(iElement).children("div");
                    //var minute = $(iElement).children("div").children("div");
                    //var headerWidth = $(iElement).width() + 2;
                    //var hourWidth = ($(iElement).width() - 24) / 24;
                    //var minuteWidth = (hourWidth) / 4;
                    //$(".minute").css("width", hourWidth);
                    //$(iElement).children("div").css("background", "red");
                    //hour.css("width", hourWidth);
                    //console.log($(".minute"));
                    //minute.css("width", minuteWidth);
                    //console.log("fuckdatshit");

                    $($window).resize(function(){
                        console.log("resized");
                        //var tw = $(".timeline_:first").width();
                        //console.log("tw = " + tw);
                        //$(iElement).css("width", tw + 4);
                        //var hour = $(iElement).children("div");
                        //var minute = $(iElement).children("div").children("div");
                        //var headerWidth = $(iElement).width();
                        //var hourWidth = (tw - 24) / 24;
                        //var minuteWidth = (hourWidth ) / 4;
                        //hour.css("width", hourWidth);
                        //minute.css("width", minuteWidth);
                        var tt = $("#timetable").width();
                        var tw = $(".timeline_:first").width();
                        //console.log("tw = " + tw);
                        $(iElement).css("width", tt);
                    });

                }
            }
        }
    };
});


app.directive("menuitem", function(){
    return {
        restrict: "A",
        link: function(scope, element, attrs){
            element.bind("click", function(){
                var parent = element.parent();
                var items = parent.children();
                angular.forEach(items, function(item, key){
                    angular.element(item).removeClass("active");
                });
                element.addClass("active");
                scope.currentMenuItem = attrs.menuId;
            });

        }
    }
});

app.directive("statusbutton",function(){
    return {
        restrict: "A",
        scope: {
            ngClick: '&'
        },
        link: function(scope, element, attrs){
            element.bind("click", function(){
                console.log(attrs);
                var content = element.html();
                if(element.prop("disabled") == false){
                    element.prop("disabled", true);
                    element.text("");
                    element.append("<img src='img/loading.gif'>");
                   console.log(scope.ngClick);

                }
            });
        }
    }
});

/* Всплывающее окно */
app.directive("window", function(){
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'templates/components/window.html',
        transclude: true,
        controller: function($scope, $element, $attrs, $transclude){
            $scope.close = function(){
                var height = $($element).height();
                var bottom = parseInt($($element).css("bottom"));
                var newBottom = height + bottom + 10;
                $($element).animate({"bottom": -(newBottom)});
            };
        },
        scope: {
            title: "&"
        },
        link: function(scope, element, attrs){
            console.log(attrs);
            scope.title = attrs.windowTitle;
        }
    }
});

/* Таблица с пагинацией */
app.directive("list", function($http, BasicData){
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'templates/components/list.html',
        transclude: true,
        controller: function($scope, $element, $attrs, $transclude){
            if($attrs.source && $attrs.source != null && $attrs.source != "")
                $scope.source = $attrs.source;

            if($attrs.toolbar && $attrs.toolbar != "")
                $scope.toolbar = new Boolean(parseInt($attrs.toolbar))
            else
                $scope.toolbar = false;

            if($attrs.type && $attrs.type != ""){
                $scope.type = $attrs.type
            }
            else
                $scope.type = "";

            $scope.fields = [];
            if($attrs.fields && $attrs.fields != ""){
                $scope.fields = $attrs.fields.split(",");
                console.log("fields = " + $scope.fields);
            }

            $scope.headers = [];
            if($attrs.headers && $attrs.headers != ""){
                $scope.headers = $attrs.headers.split(",");
                console.log("headers = " + $scope.headers);
            }

            $scope.data = BasicData;
            $scope.isEditable = 0;
            if($scope.data.user.permissions.edit == true)
                $scope.isEditable = 1;
            console.log("edit = " + $scope.isEditable);

            $scope.rows = new Collection();
            $scope.total = 0;
            $scope.start = 0;
            $scope.size = 50;
            $scope.sizes = [{"value": 10, "title": "10"}, {"value": 20, "title": "20"}, {"value": 50, "title": "50"}, {"value": 100, "title": "100"}];
            $scope.pagesCount = 1;
            $scope.currentPage = 1;



            $scope.$watch('size', function(oldValue, newValue){
                console.log("changed");
                //$scope.pagesCount = Math.ceil($scope.total / $scope.size);
                //console.log("pages count = " + $scope.pagesCount);
                //$scope.$apply();
            });

            /** Загружает следующую страницу **/
            $scope.nextPage = function(){
                var params = {
                    "start": $scope.start,
                    "size": $scope.size
                };
                $http.post($scope.source, params).success(function(data){
                    if(data["count"])
                        delete data["count"];
                    $scope.rows.items.splice(0, $scope.rows.items.length);
                    angular.forEach(data, function(value, key){
                        if($scope.type != ""){
                            var item = eval("new " + $scope.type + "();");
                            item.fromJSON(value);
                            $scope.rows.addItem(item);
                        } else
                            $scope.rows.addItem(value);
                    });
                    $scope.start += $scope.size;
                    $scope.currentPage++;
                    console.log("start = " + $scope.start);
                    console.log("size = " + $scope.size);
                });
            };

            /** Загружает предыдущую страницу **/
            $scope.prevPage = function(){
                var params = {
                    "start": $scope.start - $scope.size * 2,
                    "size": $scope.size
                };
                $http.post($scope.source, params).success(function(data){
                    if(data["count"])
                        delete data["count"];
                    $scope.rows.items.splice(0, $scope.rows.items.length);
                    angular.forEach(data, function(value, key){
                        if($scope.type != ""){
                            var item = eval("new "+ $scope.type + "();");
                            item.fromJSON(value);
                            $scope.rows.addItem(item);
                        } else
                            $scope.rows.addItem(value);
                    });
                    $scope.start -= $scope.size;
                    $scope.currentPage--;
                    console.log("start = " + $scope.start);
                });
            };

            /** Загружает указанную страницу **/
            $scope.setPage = function(page){
                var params = {
                    "start": $scope.size * page - $scope.size,
                    "size": $scope.size
                };
                $http.post($scope.source, params).success(function(data){
                    if(data["count"])
                        delete data["count"];
                    $scope.rows.items.splice(0, $scope.rows.items.length);
                    angular.forEach(data, function(value, key){
                        if($scope.type != ""){
                            var item = eval("new " + $scope.type + "();");
                            item.fromJSON(value);
                            $scope.rows.addItem(item);
                        } else
                            $scope.rows.addItem(value);
                    });
                    $scope.start = page * $scope.size;
                    $scope.currentPage = page;
                    console.log("start = " + $scope.start);
                });
            };



        },
        link: function(scope, element, attrs){
            if(scope.source != "" && scope.source != null){
                var params = {
                    "start": scope.start,
                    "size": scope.size
                };
                $http.post(scope.source, params).success(function(data){
                    if(data["count"] && data["count"] != null && data["count"] != ""){
                        scope.total = parseInt(data["count"]);
                        delete data["count"];
                    }
                    angular.forEach(data, function(value, key){
                        if(scope.type != ""){
                            var item = eval("Object.create(new " + scope.type + "());");
                            item.fromJSON(value);
                            console.log(item);
                            scope.rows.addItem(item);
                        } else
                            scope.rows.addItem(value);
                    });
                    scope.start += scope.size;
                    scope.pagesCount = Math.ceil(scope.total / scope.size);
                    console.log("start = " + scope.start);
                });
            }
        }

    }
});




app.directive("lizt", function(BasicData){
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'templates/components/table.html',
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
});


