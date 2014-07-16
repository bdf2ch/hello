function MenuItem(id, title, link, icon, isSystem){
    this.id = new Number();
    this.title = new String();
    this.link = new String();
    this.icon = new String();
    this.isSystem = new Boolean(true);

    if(id && id != null && id != undefined && id >= 0)
        this.id = id;
    if(title && title != "" && title != undefined)
        this.title = title;
    if(link && link != "" && link != undefined)
        this.link = link;
    if(icon && icon != "" && icon != undefined)
        this.icon = icon;
    if(isSystem && isSystem != null && isSystem != undefined)
        this.isSystem = isSystem;
};





function User(){

    this.id = new Number();
    this.groupId = new Number();
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
        id: new Number(),
        groupId: new Number(),
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



/**
 * Класс, описывающий сообщение
 */
var Message = function(){

    this.id = new Number();
    this.userId = new Number();
    this.name = new String();
    this.email = new String();
    this.content = new String();
    this.ip = new String();
    this.browser = new String();
    this.date = new Date();
    this.isReaded = new Boolean(false);

    this.inEditMode = new Boolean(false);
    this.isChanged = new Boolean(false);
    this.inDeleteMode = new Boolean(false);


    // Конструктор объекта на основе JSON-данных
    this.fromJSON = function(JSONdata){
        if(JSONdata && JSONdata != null){
            if(JSONdata["feedback_id"] != null)
                this.id = JSONdata["feedback_id"];
            if(JSONdata["feedback_user_id"] != null)
                this.userId = JSONdata["feedback_user_id"];
            if(JSONdata["feedback_name"] != null)
                this.name = JSONdata["feedback_name"];
            if(JSONdata["feedback_email"] != null)
                this.email = JSONdata["feedback_email"];
            if(JSONdata["feedback_content"] != null)
                this.content = JSONdata["feedback_content"];
            if(JSONdata["feedback_ip"] != null)
                this.ip = JSONdata["feedback_ip"];
            if(JSONdata["feedback_browser"] != null)
                this.browser = JSONdata["feedback_browser"];
            if(JSONdata["feedback_date"] != null)
                this.date = new Date(JSONdata["feedback_date"]);
            if(JSONdata["feedback_is_readed"] != null){
                if(JSONdata["feedback_is_readed"] == 1)
                    this.isReaded = true;
                if(JSONdata["feedback_is_readed"] == 0)
                    this.isReaded = false;
            }
        }
    };

    // Конструктор объекта на основе другого объекта
    this.fromAnother = function(message){
        if(message && typeof message == "object"){
            this.id = message.id;
        }
    };

};
Message.prototype = new EditableItem();


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
