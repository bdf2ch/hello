/*** Контроллер справочника рубрик ***/
function ChaptersCtrl($scope, $http, BasicData, SpecificData){

    $scope.basic = BasicData;
    $scope.specific = SpecificData;
    //if(data.menu.findItemByTitle($location.hash()) != false)
    //    Scope.data.currentMenuItem = data.menu.findItemByTitle($location.hash())
    //$scope.data.currentMenuItem = 5;
    //angular.forEach($scope.data.manu.items, function(value, key){
    //    if(value.link = $location.hash())
    //});
    $scope.inChapterAddMode = false;
    $scope.searchText = "";
    $scope.newChapter = {
        title: ""
    };

    //$scope.data.currentMenuItem = 1;

    $scope.addChapter = function(){
        var params = {
            "title" : $scope.newChapter.title
        };
        $http.post('specific/php/addChapter.php', params).success(function(data) {
            if(data != "fail"){
                var chapter = new Chapter();
                chapter.fromJSON(data);
                $scope.specific.chapters.addItem(chapter);
                $scope.newChapter.title = "";
                return "done";
            }
        });
    };

    $scope.editChapter = function(id){
        var chapter = $scope.data.chapters.findItemById(id);
        console.log(chapter);//
        var params = {
            "id" : chapter.id,
            "title" : chapter.title
        };
        $http.post('specific/php/editChapter.php', params).success(function(data) {
            console.log(data);
            if(data == "success"){
                console.log(data);
                $scope.specific.chapters.findItemById(id).update();
                $scope.specific.chapters.findItemById(id).cancelEditMode();
                //console.log(temp);
                //temp.cancelEditMode();
                console.log($scope.specific.chapters.findItemById(id));
            }
        });
    };

    $scope.deleteChapter = function(id){
        var params = {
            "id" : id
        };
        $http.post('specific/php/deleteChapter.php', params).success(function(data) {
            if(data != "fail"){
                $scope.specific.chapters.deleteItem(id);
            }
        });
    };

    $scope.setToAddChapterMode = function(){
        $("#add-chapter").animate({"bottom": "50px"}, 500);
        $scope.inAddChapterMode = true;
    };

    $scope.cancelAddChapterMode = function(){
        $("#add-chapter").animate({"bottom": "-700px"}, 500);
        $scope.inChapterAddMode = false;
        $scope.newChapter.title = "";
    };
};




function OrganizationsCtrl($scope, $http, BasicData){
    $scope.data = BasicData;
    $scope.organizations = new Collection();
    $scope.inAddOrganizationMode = false;
    $scope.inAddAddressMode = false;
    $scope.inAddContactMode = false;
    $scope.searchText = "";
    $scope.size = 50;
    $scope.start = 0;
    $scope.total = 0;
    $scope.pages = 0;
    $scope.currentPage = 1;
    $scope.newOrganization = {
        title: new String(),
        chapterId: new Number(0),
        email: new String(),
        web: new String()
    };
    $scope.currentOrganization = new Organization();
    $scope.currentOrgId = 0;
    $scope.currentAddrId = 0;
    $scope.currentChapterId = 0;
    $scope.currentAddress = new Address();
    $scope.currentAddresses = [];
    $scope.currentContacts = [];
    $scope.currentContact = new Contact();
    $scope.newAddress = {
        title: new String(),
        companyId: new Number()
    };
    $scope.newContact = {
        companyId: new Number(),
        addressId: new Number(),
        subject: new String(),
        phone: new String()
    };

    $scope.setCurrentOrg = function(id){
        $scope.currentOrgId = id;
        $scope.currentContacts = [];;
        $("#companies table tbody tr").each(function(index, el){
            $(el).removeClass("warning");
        });
        $("#org" + id).addClass("warning");
    };

    $scope.setCurrentAddr = function(id){
        $scope.currentAddrId = id;
        angular.forEach($scope.organizations.findItemById($scope.currentOrgId).addresses, function(value, key){
            if(value.id == $scope.currentAddrId){
                $scope.currentContacts = value.contacts;
            }
        });
        console.log($scope.currentContacts);


        $("#addresses table tbody tr").each(function(index, el){
            $(el).removeClass("warning");
        });
        $("#addr" + id).addClass("warning");
    };


    $scope.addOrganization = function(){
        var params = {
            "chapterId": $scope.newOrganization.chapterId,
            "title": $scope.newOrganization.title,
            "email": $scope.newOrganization.email,
            "web": $scope.newOrganization.web
        };
        $http.post('specific/php/addOrganization.php', params).success(function(data) {
            if(data != "fail"){
                $scope.newOrganization.title = "";
                $scope.newOrganization.chapterId = 0;
                $scope.newOrganization.email = "";
                $scope.newOrganization.web = "";
            }
        });
    };

    $scope.addAddress = function(){
        var params = {
            "companyId": $scope.newAddress.companyId,
            "title": $scope.newAddress.title
        };
        $http.post('specific/php/addAddress.php', params).success(function(data) {
            if(data != "fail"){
                var address = new Address();
                address.fromJSON(data);
                $scope.organizations.findItemById($scope.newAddress.companyId).addresses.push(address);
                $scope.newAddress.title = "";
                //$scope.newAddress.companyId = 0;
            }
        });
    };

    $scope.addContact = function(){
        var params = {
            "addressId": $scope.newContact.addressId,
            "phone": $scope.newContact.phone,
            "subject": $scope.newContact.subject
        };
        $http.post('specific/php/addContact.php', params).success(function(data) {
            if(data != "fail"){
                var contact = new Contact();
                contact.fromJSON(data);
                console.log(contact);
                angular.forEach($scope.organizations.findItemById($scope.newContact.companyId).addresses, function(address, key1){
                    if(address.id == contact.addressId){
                        address.contacts.push(contact);
                        console.log(address.contacts);
                    }
                });
                //$scope.organizations.findItemById($scope.newContact.companyId).addresses.contacts.push(contact);
                $scope.newContact.phone = "";
                $scope.newContact.subject = "";
            }
        });
    };

    $scope.editOrganization = function(){
        var params = {
            "id" : $scope.currentOrganization.id,
            "chapterId": $scope.currentOrganization.chapterId,
            "title" : $scope.currentOrganization.title,
            "email": $scope.currentOrganization.email,
            "web": $scope.currentOrganization.web
        };
        $http.post('specific/php/editOrganization.php', params).success(function(data) {
            console.log(data);
            if(data == "success"){
                console.log(data);
                $scope.organizations.findItemById($scope.currentOrganization.id).update();
                $scope.organizations.findItemById($scope.currentOrganization.id).cancelEditMode();
                //console.log(temp);
                //temp.cancelEditMode();
                console.log($scope.organizations.findItemById($scope.currentOrganization.id));
            }
        });
    };

    $scope.editAddress = function(){
        var params = {
            "id" : $scope.currentAddress.id,
            "companyId": $scope.currentOrganization.id,
            "title" : $scope.currentAddress.address
        };
        $http.post('specific/php/editAddress.php', params).success(function(data) {
            console.log(data);
            if(data == "success"){
                console.log(data);
                $scope.currentAddress.update();
                $scope.currentAddress.cancelEditMode();
                //console.log(temp);
                //temp.cancelEditMode();
                console.log($scope.organizations.findItemById($scope.currentOrganization.id));
            }
        });
    };

    $scope.editContact = function(){
        var params = {
            "id": $scope.currentContact.id,
            "addressId": $scope.currentContact.addressId,
            "phone": $scope.currentContact.phone,
            "subject": $scope.currentContact.subject
        };
        $http.post('specific/php/editContact.php', params).success(function(data) {
            console.log(data);
            if(data == "success"){
                console.log(data);
                $scope.currentContact.update();
                $scope.currentContact.cancelEditMode();
                //console.log(temp);
                //temp.cancelEditMode();
                console.log($scope.organizations.findItemById($scope.currentOrganization.id));
            }
        });
    };

    $scope.deleteOrganization = function(id){
        var params = {
            "id" : id
        };
        $http.post('specific/php/deleteOrganization.php', params).success(function(data) {
            if(data != "fail"){
                $scope.organizations.deleteItem(id);
            }
        });
    };

    $scope.deleteAddress = function(addressId, orgId){
        var params = {
            "id" : addressId
        };
        console.log($scope.currentOrganization);
        $scope.currentOrganization = $scope.organizations.findItemById(orgId);
        $http.post('specific/php/deleteAddress.php', params).success(function(data) {
            if(data != "fail"){
                angular.forEach($scope.currentOrganization.addresses, function(value, key){
                    if(value.id == addressId)
                        $scope.currentOrganization.addresses.splice(key, 1);
                });
            }
        });
    };

    $scope.deleteContact = function(contactId, addressId, orgId){
        var params = {
            "id" : contactId
        };
        console.log($scope.currentOrganization);
        $scope.currentOrganization = $scope.organizations.findItemById(orgId);
        $scope.currentOrganization.addresses.forEach(function(value){
            if(value.id == addressId)
                $scope.currentAddress = value;
        });
        $http.post('specific/php/deleteContact.php', params).success(function(data) {
            if(data != "fail"){
                angular.forEach($scope.currentAddress.contacts, function(value, key){
                    if(value.id == contactId)
                        $scope.currentAddress.contacts.splice(key, 1);
                });
            }
        });
    };

    $scope.loadData = function(start, size){
        var params = {
            "start": start,
            "size": size,
            "chapter": $scope.currentChapterId
        };
        $scope.organizations.clear();
        $http.post('specific/php/getOrganizations.php', params).success(function(data){
            console.log(data);
            if(data != null && data != "fail"){
                if($scope.total <= 0){
                    $scope.total = data["total"];
                    $scope.pages = Math.ceil($scope.total / $scope.size);
                    delete data["total"];
                    console.log($scope.total);
                }
                angular.forEach(data, function(value, key){
                    var temp_org = new Organization();
                    temp_org.fromJSON(value);
                    $scope.organizations.addItem(temp_org);
                });

            }
        });
        console.log($scope.organizations);
    };

    $scope.next = function(){
        $scope.loadData($scope.start, $scope.size);
        $scope.start += $scope.size;
        $scope.currentPage++;
    };

    $scope.prev = function(){
        $scope.start -= $scope.size * 2;
        $scope.loadData($scope.start, $scope.size);
        $scope.currentPage--;
    };

    $scope.setPage = function(page){
        $scope.loadData((page * $scope.size) - $scope.size, $scope.size);
        $scope.currentPage = page;
    };

    $scope.setToAddOrganizationMode = function(){
        $("#add-organization").animate({"bottom": "50px"}, 500);
        $scope.inAddOrganizationMode = true;
    };

    $scope.cancelAddOrganizationMode = function(){
        $("#add-organization").animate({"bottom": "-700px"}, 500);
        $scope.inAddOrganizationMode = false;
        $scope.newStreetType = 0;
        $scope.newStreetTitle = "";
    };

    $scope.setToAddAddressMode = function(id){
        $scope.newAddress.companyId = id;
        if($("#add-organization").css("bottom") != "-700px")
            $("#add-organization").animate({"bottom": "-700px"}, 500);
        if($("#edit-organization").css("bottom") != "-700px")
            $("#edit-organization").animate({"bottom": "-700px"}, 500);
        $("#add-address").animate({"bottom": "50px"}, 500);
        $scope.inAddAddressMode = true;
    };

    $scope.cancelAddAddressMode = function(){
        $("#add-address").animate({"bottom": "-700px"}, 500);
        $scope.inAddAddressMode = false;
        $scope.newAddress.title = "";
    };

    $scope.setToAddContactMode = function(addressId, orgId){
        $scope.newContact.addressId = addressId;
        $scope.newContact.companyId = orgId;
        if($("#add-organization").css("bottom") != "-700px")
            $("#add-organization").animate({"bottom": "-700px"}, 500);
        if($("#edit-organization").css("bottom") != "-700px")
            $("#edit-organization").animate({"bottom": "-700px"}, 500);
        if($("#add-address").css("bottom") != "-700px")
            $("#add-address").animate({"bottom": "-700px"}, 500);
        if($("#edit-address").css("bottom") != "-700px")
            $("#edit-address").animate({"bottom": "-700px"}, 500);
        if($("#edit-contact").css("bottom") != "-700px")
            $("#edit-contact").animate({"bottom": "-700px"}, 500);
        $("#add-contact").animate({"bottom": "50px"}, 500);
        $scope.inAddContactMode = true;
    };

    $scope.cancelAddContactMode = function(){
        $("#add-contact").animate({"bottom": "-700px"}, 500);
        $scope.inAddContactMode = false;
        $scope.newContact.phone = "";
        $scope.newContact.subject = "";
    };

    $scope.setToEditOrganizationMode = function(id){
        $scope.currentOrganization = $scope.organizations.findItemById(id);
        $scope.organizations.findItemById(id).setToEditMode();
        if($("#add-organization").css("bottom") != "-700px"){
            $("#add-organization").animate({"bottom": "-700px"}, 500);
            $scope.inAddOrganizationMode = false;
        }
        $("#edit-organization").animate({"bottom": "50px"}, 500);
    };

    $scope.cancelEditOrganizationMode = function(id){
        $scope.organizations.findItemById(id).cancelEditMode();
        $("#edit-organization").animate({"bottom": "-700px"}, 500);
        $scope.inEditOrganizationMode = false;
    };

    $scope.setToEditAddressMode = function(addressId, orgId){
        $scope.currentOrganization = $scope.organizations.findItemById(orgId);
        $scope.currentOrganization.addresses.forEach(function(value){
            if(value.id == addressId)
                $scope.currentAddress = value;
        });
        $scope.currentAddress.setToEditMode();
        if($("#add-organization").css("bottom") != "-700px")
            $("#add-organization").animate({"bottom": "-700px"}, 500);
        if($("#edit-organization").css("bottom") != "-700px")
            $("#edit-organization").animate({"bottom": "-700px"}, 500);
        if($("#add-address").css("bottom") != "-700px")
            $("#add-address").animate({"bottom": "-700px"}, 500);
        //$scope.inEditAddressMode = false;

        $("#edit-address").animate({"bottom": "50px"}, 500);
    };

    $scope.cancelEditAddressMode = function(addressId, orgId){
        $scope.currentAddress.cancelEditMode();
        $("#edit-address").animate({"bottom": "-700px"}, 500);
        $scope.inEditAddressMode = false;
    };

    $scope.setToEditContactMode = function(contactId, addressId, orgId){
        $scope.currentOrganization = $scope.organizations.findItemById(orgId);
        $scope.currentOrganization.addresses.forEach(function(value){
            if(value.id == addressId)
                $scope.currentAddress = value;
        });
        $scope.currentAddress.contacts.forEach(function(value){
            if(value.id == contactId)
                $scope.currentContact = value;
        });
        $scope.currentContact.setToEditMode();
        if($("#add-organization").css("bottom") != "-700px")
            $("#add-organization").animate({"bottom": "-700px"}, 500);
        if($("#edit-organization").css("bottom") != "-700px")
            $("#edit-organization").animate({"bottom": "-700px"}, 500);
        if($("#add-address").css("bottom") != "-700px")
            $("#add-address").animate({"bottom": "-700px"}, 500);
        if($("#edit-address").css("bottom") != "-700px")
            $("#edit-address").animate({"bottom": "-700px"}, 500);
        if($("#add-contact").css("bottom") != "-700px")
            $("#add-contact").animate({"bottom": "-700px"}, 500);
        //$scope.inEditAddressMode = false;

        $("#edit-contact").animate({"bottom": "50px"}, 500);
    };

    $scope.cancelEditContactMode = function(){
        $scope.currentAddress.cancelEditMode();
        $("#edit-contact").animate({"bottom": "-700px"}, 500);
        $scope.inEditContactMode = false;
    };

    $scope.loadData($scope.start, $scope.size);
    $scope.start += $scope.size;
};