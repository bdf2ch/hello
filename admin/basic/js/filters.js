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
    });
