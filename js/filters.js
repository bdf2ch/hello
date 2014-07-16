'use strict';

/* Filters */
angular.module('filters', [])
    .filter('hdate', function() {
        return function(input, type) {
            switch(type){
                case "dateTime": return moment.unix(input).format("DD MMM HH:mm");
                    break;
                case "date": return moment.unix(input).format("DD MMM");
                    break;
                case "time": return moment.unix(input).format("HH:mm");
                    break;
                case "fullDate" : return moment.unix(input).format("DD.MM.YY");
                    break;
                case "dayWeek" : return moment(input).format("DD MMM, ddd");
                    break;
                case "dayTitle" : return moment(input).format("dddd");
                    break;
                case "fullDay" : return moment(input).format("DD MMMM");
                    break;
            };
        };
    })
    .filter('transport', function(){
        return function(input, id){
            var requests = [];
            angular.forEach(input, function(request, index){
                if(request.transportItem.id == id){
                    requests.push(request);
                }
            });
            return requests;
        };
    })
    .filter('unsorted', function(){
        return function(input, date){
            var requests = [];
            angular.forEach(input, function(request, index){
                if(request.transportItem.id == 0 && moment(request.start).dayOfYear() == moment(date).dayOfYear()){
                    //console.log("matched");
                    requests.push(request);
                }
            });
            return requests;
        };
    })
    .filter('sorted', function(){
        return function(input, transportId, day){
            var requests = [];
            angular.forEach(input, function(value, index){
                if(value.transportItem.id == transportId){


                    var startOfTheDay = moment(day).hours(0).minutes(0);
                    var endOfTheDay = moment(day).hours(23).minutes(59);
                    //moment(endOfTheDay).hours(23);
                    //console.log("startoftheday = " + moment(startOfTheDay).format("DD.MM.YYYY HH:mm"));
                    //console.log("endoftheday = " + moment(endOfTheDay).format("DD.MM.YYYY HH:mm"));

                    // Начинается ранее, чем сегодня, заканчивается в течение дня
                    if(moment(value.start).unix() < moment(startOfTheDay).unix() &&
                        moment(value.end).unix() >= moment(startOfTheDay).unix() &&
                        moment(value.end).unix() <= moment(endOfTheDay).unix()){
                        //$scope.activeRequests.push(value);
                        //console.log("added 1," + value.id);
                        //temp_transport.fromAnother(value.transportItem);
                        requests.push(value);
                    }

                    // Начинается в течении дня, заканчивается в течение дня
                    if(moment(value.start).unix() >= moment(startOfTheDay).unix() &&
                        moment(value.end).unix() <= moment(endOfTheDay).unix()){
                        //$scope.activeRequests.push(value);
                        //console.log("added 2, " + value.id);
                        //temp_transport.fromAnother(value.transportItem);
                        requests.push(value);
                    }

                    // Начинается сегодня, заканчивается позднее, чем сегодня
                    if(moment(value.start).unix() >= moment(startOfTheDay).unix() &&
                        moment(value.start).unix() < moment(endOfTheDay).unix() &&
                        moment(value.end).unix() > moment(endOfTheDay).unix()){
                        //$scope.activeRequests.push(value);
                        //console.log("added 3, " + value.id);
                        //temp_transport.fromAnother(value.transportItem);
                        requests.push(value);
                    }


                    // Начинается ранее, чем сегодня, заканчивается позднее, чем сегодня
                    if(moment(value.start).unix() < moment(startOfTheDay).unix() &&
                        moment(value.end).unix() > moment(endOfTheDay).unix()){
                        //$scope.activeRequests.push(value);
                        //console.log("added 3, " + value.id);
                        //temp_transport.fromAnother(value.transportItem);
                        requests.push(value);
                    }



                    //console.log("matched");
                    //requests.push(request);
                }
            });
            return requests;
        };
    });


app.filter("portion", function(){
    return function(input, start, size){
        var items = input.slice(start + 1, (start + 1) + size);
        return items;
    };
})