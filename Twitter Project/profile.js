var pro = pro || {};

pro.profiles = [];

pro.firebase = "https://chirpr.firebaseio.com/";

pro.profile = function (firstName, lastName, displayName, imageUrl, email, status, firebaseUrl, profileKey) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = displayName;
    this.imageUrl = imageUrl;
    this.email = email;
    this.status = status;
    this.firebaseUrl = firebaseUrl;
    this.profilekey = profilekey;
};

pro.getproAJAX = function (callback) {
    var request = new XMLHttpRequest();
    request.open('GET', pro.firebase + '.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            callback(response);
        } else {

            console.log('error');
        }

    };
    request.send();
};

pro.getproCallback = function (request) {
    for (var prop in request) {
        request[prop].profilekey = prop;
        pro.profiles.push(request[prop]);
    }

    pro.displayProfile();
    pro.myPro('calvinkey');
    console.log('in getproCallback');
};

pro.myPro = function (profilekey) {
    for (var i = 0; i < pro.profiles.length; i++) {
        if (pro.profiles[i].profilekey === profilekey) {
            break;
        }

    }
    var myPro = pro.profiles[i];
    pro.displayMyPro(myPro);
    console.log(myPro);

};


pro.displayProfile = function () {
    for (var i = 0; i < pro.profiles.length; i++) {
        var profile = pro.profiles[i];
        if (profile !== pro.myPro) {
            document.getElementById('users').innerHTML += '<div><h6><img src=' + profile.imageUrl + ' /> &nbsp; ' + profile.firstName + '&nbsp;' + profile.lastName + '</h6><button class="btn btn-success btn-xs" id="flwBtn' + i + '" onclick="pro.addFlw(' + i + ');"><span class="glyphicon glyphicon-ok"></span>&nbsp;Follow</button></div>';
            var $modal = $('.modal').modal({
                show: false
            });
        }
        $("img").error(function () {
            $(this).unbind("error").attr("src", "http://i.imgur.com/bumiVrZ.png");
        });
    }
};

pro.addFlw = function (i) {
    pro.follows = [];
    var follows = pro.profiles[i];
    console.log(pro.profiles[i]);
    document.getElementById('showFollows').innerHTML += '<h6><img src=' + follows.imageUrl + ' /></h6>';
};

pro.displayMyPro = function (myPro) {
    var elem = $('#myProfile');
    elem.html('<img src=' + myPro.imageUrl + '><h4>' + myPro.firstName + '&nbsp;' + myPro.lastName + '</h4><p> @ ' + myPro.displayName + '</p><p>&quot;' + myPro.status + '&quot;</p>');
};

pro.getproAJAX(pro.getproCallback);