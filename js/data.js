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

    /* Возвращает количество элементов в коллекции */
    Collection.prototype.length = function(){
        return this.items.length;
    };

    /* Удаляет все элементы из коллекции */
    Collection.prototype.clear = function(){
        this.items.splice(0, this.items.length);
    };

};


function Field(title, type){
    this.id = new Number(0);
    this.title = new String();
    this.type;
    this.componentId = new Number(0);
    this.defaultValue = new String();

    if(title)
        this.title = title;

    if(type){
        this.type = eval("new" + type + "();");
    }
};





function User(){

    this.id = new Number(0);
    this.groupId = new Number(0);
    this.login = new String();
    this.password = new String();
    this.surname = new String();
    this.name = new String();
    this.fname = new String();
    this.email = new String();
    this.isAdministrator = new Boolean(false);
    this.permissions = {
        add: new Boolean(false),
        edit: new Boolean(false),
        delete: new Boolean(false)
    };
    this.inEditMode = new Boolean(false);
    this.inDeleteMode = new Boolean(false);
    this.isChanged = new Boolean(false);

    this.backup = {
        id: new Number(0),
        groupId: new Number(0),
        login: new String(),
        password: new String(),
        surname: new String(),
        name: new String(),
        fname: new String(),
        email: new String(),
        permissions: {
            add: new Boolean(false),
            edit: new Boolean(false),
            delete: new Boolean(false)
        }
    };

    this.fromJSON = function(JSONdata){
        if(JSONdata && JSONdata != null){
            if(JSONdata["users_id"] != null){
                this.id = JSONdata["users_id"];
                this.backup.id = JSONdata["users_id"];
            }

            if(JSONdata["users_group_id"] != null){
                this.groupId = JSONdata["users_group_id"];
                this.backup.groupId = JSONdata["users_group_id"];
            }

            if(JSONdata["users_is_administrator"] == 1){
                this.isAdministrator = true;
                this.backup.isAdministrator = true;
            }
            else {
                this.isAdministrator = false;
                this.backup.isAdministrator = false;
            }

            if(JSONdata["users_allow_add"] == 1){
                this.permissions.add = true;
                this.backup.permissions.add = true;
            }
            else {
                this.permissions.add = false;
                this.backup.permissions.add = false;
            }

            if(JSONdata["users_allow_edit"] == 1){
                this.permissions.edit = true;
                this.backup.permissions.edit = true;
            }
            else {
                this.permissions.edit = false;
                this.backup.permissions.edit = false;
            }

            if(JSONdata["users_allow_delete"] == 1){
                this.permissions.delete = true;
                this.backup.permissions.delete = true;
            }
            else {
                this.permissions.delete = false;
                this.backup.permissions.delete = true;
            }

            this.login = JSONdata["users_login"];
            this.backup.login = JSONdata["users_login"];
            this.password = JSONdata["users_password"];
            this.backup.password = JSONdata["users_password"];
            this.surname = JSONdata["users_surname"];
            this.backup.surname = JSONdata["users_surname"];
            this.name = JSONdata["users_name"];
            this.backup.name = JSONdata["users_name"];
            this.fname = JSONdata["users_fname"];
            this.backup.fname = JSONdata["users_fname"];
            this.email = JSONdata["users_email"];
            this.backup.email = JSONdata["users_email"];
        }
    }

    this.fromAnother = function(user){
        if(user && typeof user == "object"){
            this.id = user.id;
            this.isAdministartor = user.isAdministartor;
            this.surname = user.surname;
            this.name = user.name;
            this.fname = user.fname;
            this.permissions.add = user.permissions.add;
            this.permissions.edit = user.permissions.edit;
            this.permissions.delete = user.permissions.delete;
        }
    }

    this.fromCookie = function(){
        if(document.cookie != null && document.cookie != ""){
            var cookie = getCookie();
            if(cookie[user_id]){
                var request = new XMLHttpRequest();
                request.open("POST", "/php/login.php");
                request.onreadystatechange = function(){
                    if(request.readyState === 4 && request.status === 200){
                        var type = request.getResponseHeader("Content-type");
                        if(type == "application/json"){
                            this.fromJSON(JSON.parse(request.responseText));
                        }
                    }
                };
            } else
                console.log("No user_id found");
        }
    };

};
User.prototype = new EditableItem();


/*** Класс, описывающий группу пользователей  ***/
function UserGroup(){
    this.id = new Number(0);
    this.title = new String();

    this.backup ={
        id: new Number(0),
        title: new String()
    };

    this.fromJSON = function(JSONdata){
        if(JSONdata && JSONdata != null){
            if(JSONdata["user_groups_id"] != null){
                this.id = JSONdata["user_groups_id"];
                this.backup.id = JSONdata["user_groups_id"];
            }
            this.title = JSONdata["user_groups_title"];
            this.backup.title = JSONdata["user_groups_title"];

        }
    };

};
UserGroup.prototype = new EditableItem();


function Organization(){

    this.id = new Number(0);
    this.title = new String();
    this.chapterId = new Number(0);
    this.addresses = [];
    this.web = new String();
    this.email = new String();

    this.inEditMode = new Boolean(false);
    this.inDeleteMode = new Boolean(false);
    this.isChanged = new Boolean(false);

    this.backup = {
        title: new Number(0),
        chapterId: new Number(0),
        web: new String(),
        email: new String(),
        addresses: []
    };

    var obj = this;
    // Конструктор объекта на основе JSON-данных
    this.fromJSON = function(JSONdata){
        if(JSONdata && JSONdata != null){
            this.id = JSONdata["companies_id"];
            this.title = JSONdata["companies_title"];
            this.backup.title = JSONdata["companies_title"];
            this.chapterId = JSONdata["companies_chapter_id"];
            this.backup.chapterId = JSONdata["companies_chapter_id"];
            this.email = JSONdata["companies_email"];
            this.backup.email = JSONdata["companies_email"];
            this.web = JSONdata["companies_web"];
            this.backup.web = JSONdata["companies_web"];

            if(JSONdata["addresses"] != undefined){
                JSONdata["addresses"].forEach(function(value){
                    var address = new Address();
                    address.fromJSON(value);
                    obj.addresses.push(address);
                    obj.backup.addresses.push(address);
                });
            }
        }
    };

};
Organization.prototype = new EditableItem();


function Contact(){
    this.id = new Number(0);
    this.addressId = new Number(0);
    this.phone = new String();
    this.subject = new String();
    this.backup = {
        phone: new String(),
        subject: new String()
    };
    this.inEditMode = new Boolean(false);
    this.inDeleteMode = new Boolean(false);
    this.isChanged = new Boolean(false);

    this.fromJSON = function(JSONdata){
        if(JSONdata && JSONdata != null){
            this.id = JSONdata["contacts_id"];
            this.addressId = JSONdata["contacts_address_id"];
            this.phone = JSONdata["contacts_phone"];
            this.backup.phone = JSONdata["contacts_phone"];
            this.subject = JSONdata["contacts_subject"];
            this.backup.subject = JSONdata["contacts_subject"];
        }
    };
};
Contact.prototype = new EditableItem();


function Address(){
    this.id = new Number(0);
    this.address = new String();
    this.contacts = [];
    this.backup = {
        address: new String(),
        contacts: []
    };
    this.inEditMode = new Boolean(false);
    this.inDeleteMode = new Boolean(false);
    this.isChanged = new Boolean(false);

    var obj = this;
    this.fromJSON = function(JSONdata){
        if(JSONdata && JSONdata != null){
            this.id = JSONdata["addresses_id"];
            this.address = JSONdata["addresses_address"];
            this.backup.address = JSONdata["addresses_address"];

            if(JSONdata["contacts"] != undefined){
                JSONdata["contacts"].forEach(function(value){
                    var contact = new Contact();
                    contact.fromJSON(value);
                    obj.contacts.push(contact);
                    obj.backup.contacts.push(contact);
                });
            }
        }
    };
};
Address.prototype = new EditableItem();








/**
 * Класс, описывающий рубрику
 */
var Chapter = function(){

    this.id = new Number(0);
    this.title = new String();
    this.total = new Number();
    this.inEditMode = new Boolean(false);
    this.isChanged = new Boolean(false);
    this.inDeleteMode = new Boolean(false);

    this.backup = {
        id: new Number(0),
        title: new String()
    };

    // Конструктор объекта на основе JSON-данных
    this.fromJSON = function(JSONdata){
        if(JSONdata && JSONdata != null){
            if(JSONdata["chapter_id"] != null){
                this.id = JSONdata["chapter_id"];
                this.backup.id = JSONdata["chapter_id"];
                this.total = JSONdata["total"];
            }
            this.title = JSONdata["chapter_title"];
            this.backup.title = JSONdata["chapter_title"];
        }
    };

    // Конструктор объекта на основе другого объекта
    this.fromAnother = function(chapter){
        if(chapter && typeof chapter == "object"){
            this.id = chapter.id;
            this.title = chapter.title;
        }
    };

};
Chapter.prototype = new EditableItem();


/********** Служебные функции **********/

/*** Записывает cookie ***/
function setCookie(name, value, daysToLive){
    var cookie = name + "=" + encodeURIComponent(value);
    if(typeof daysToLive === "number")
        cookie += "max-age" + " ;" + (daysToLive*60*24*24);
    document.cookie = cookie;
};

/***  Считывает cookie ***/
function getCookie(){
    var cookies = {};
    var all = document.cookie;

    if(all === "")
        return cookies;
    var list = all.split("; ");
    for(var i = 0; i < list.length; i++){
        var cookie = list[i];
        var p = cookie.indexOf("=");
        var name = cookie.substr(0, p);
        var value = cookie.substr(p+1);
        value = decodeURIComponent(value);
        cookies[name] = value;
    }

    return cookies;
};
