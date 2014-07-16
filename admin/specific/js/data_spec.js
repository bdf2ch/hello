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
