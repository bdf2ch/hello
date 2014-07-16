app.factory('SpecificData', ['$http', '$window', 'BasicData', function($http, $window, BasicData){
    var specific = {};
    specific.data = BasicData;

    /** Дополнительные пункты меню **/
    specific.data.menu.addItem(new MenuItem(5, "Справочник рубрик", "#/chapters", false));
    specific.data.menu.addItem(new MenuItem(6, "Справочик организаций", "#/organizations", false));

    /** Коллекции данных **/
    specific.organizations = new Collection();
    specific.chapters = new Collection();

    /** Получает список рубрик **/
    specific.getChapters = function(){
        $http.post('specific/php/getChapters.php').success(function(data) {
            angular.forEach(data, function(value, key){
                var chapter = new Chapter();
                chapter.fromJSON(value);
                specific.chapters.addItem(chapter);
            });
        });
    };

    /** Получает список организаций **/
    specific.getOrganizations = function(){
        $http.post('specific/php/getOrganizations.php').success(function(data) {
            angular.forEach(data, function(value, key){
                var organization = new Organization();
                organization.fromJSON(value);
                specific.organizations.push(organization);
            });
        });
    };

    if(specific.chapters.length() == 0)
        specific.getChapters();

    return specific;
}]);