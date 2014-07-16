var EditableItem = function(){

    /* Конструктор объекта на основе другого объекта */
    EditableItem.prototype.fromAnother = function(another){
        if(another && typeof another == "object"){
            var properties = Object.keys(this);
            for(var property in another){
                if(properties.indexOf(property) != -1){
                    if(typeof another[property] != 'object'){
                        var current_property = Object.getOwnPropertyDescriptor(another, property);
                        Object.defineProperty(this, property, { value: current_property.value});
                    } else if(typeof another[property] == "object"){
                        for(var field in another[property]){
                            var current_property = Object.getOwnPropertyDescriptor(another[property], field);
                            Object.defineProperty(this[property], field, { value: current_property.value});
                        }
                    }
                }
            }
        }
    };

    /* Обновляет объект после изменения */
    EditableItem.prototype.update = function(){
        var properties = Object.keys(this);
        for(var property in this.backup){
            if(properties.indexOf(property) != -1){
                if(typeof this.backup[property] != 'object'){
                    var current_property = Object.getOwnPropertyDescriptor(this, property);
                    Object.defineProperty(this.backup, property, { value: current_property.value});
                } else if(typeof this.backup[property] == "object"){
                    for(var field in this[property]){
                        var current_property = Object.getOwnPropertyDescriptor(this[property], field);
                        Object.defineProperty(this.backup[property], field, { value: current_property.value});
                    }
                }
            }
        }
    };

    /* Восстанавливает объект из бэкапа */
    EditableItem.prototype.restoreBackup = function(){
        var obj = this;
        var properties = Object.keys(this);
        //console.log(properties);
        for(var property in this.backup){
            if(typeof this.backup[property] == "object"){
                for(var field in this.backup[property]){
                    var object_property = Object.getOwnPropertyDescriptor(obj.backup[property], field);
                    Object.defineProperty(obj[property], field, { value: object_property.value});
                }
            } else {
                if(properties.indexOf(property) != -1 && typeof this.backup[property] != "object"){
                    var current_property = Object.getOwnPropertyDescriptor(this.backup, property);
                    Object.defineProperty(this, property, { value: current_property.value});
                }
            }
        }
        console.log(this);
    };

    /* Переводит элемент в режим редактирования */
    EditableItem.prototype.setToEditMode = function(){
        this.inEditMode = true;
    };

    /* Выводит элемент из режима редактироваия */
    EditableItem.prototype.cancelEditMode = function(){
        this.restoreBackup();
        this.inEditMode = false;
        this.isChanged = false;
    };

    /* Переводит элемент в режим удаления */
    EditableItem.prototype.setToDeleteMode = function(){
        this.inDeleteMode = true;
    };

    /* Выводит элемент из режима удаления */
    EditableItem.prototype.cancelDeleteMode = function(){
        this.inDeleteMode = false;
    };

    /* Отмечает элемент, как измененный */
    EditableItem.prototype.setToChanged = function(){
        this.isChanged = true;
    };


};



var Collection = function(){

    this.items = []; // Массив элементов коллекции

    /* Добавляет элемент в коллекцию */
    Collection.prototype.addItem = function(item){
        if(item && item != null){
            this.items.push(item);
        }
    };

    /* Удаляет элемент из коллекции */
    Collection.prototype.deleteItem = function(id){
        if(id){
            for(var i = 0; i < this.items.length; i++){
                if(this.items[i].id == id)
                    this.items.splice(i, 1);
            }
        }
    };

    /* Находит элемент в коллекции по идентификатору */
    Collection.prototype.findItemById = function(id){
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].id == id)
                return this.items[i];
        }
    };

    /* Находит элемент в коллекции по наименованию */
    Collection.prototype.findItemByTitle = function(title){
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].title == title)
                return this.items[i];
        }
    };

    /* Возвращает количество элементов в коллекции */
    Collection.prototype.length = function(){
        return this.items.length;
    };

    /* Удаляет все элементы из коллекции */
    Collection.prototype.clear = function(){
        this.items.splice(0, this.items.length);
    };

};