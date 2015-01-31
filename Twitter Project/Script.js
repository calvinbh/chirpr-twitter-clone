var app = app || {};

app.messageArray = [];

app.firebase = "https://calvinchipr.firebaseio.com/";

app.message = function (createDate, body) {
   // this.author = author;
    this.createDate = createDate;
   // this.modifyDate = modifyDate;
    this.body = body;
   // this.backgroundColor = backgroundColor;
   // this.font = font;
   // this.textColor = textColor;
   // this.key = key;
};

app.addMessage = function () {
   // var author = profile[i].key;
    var body = $('#mesInput').val();
    var createDate = app.createDate();
    // var backgroundColor
    //  var textColor 

    var message = new app.message(createDate, body);
    app.postAJAX(message, app.postCallback);

    $('#mesInput').val('');
    console.log('in app.addMessage');
};

app.getAJAX = function (callback) {
    var request = new XMLHttpRequest();
    request.open('GET', app.firebase + '.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            callback(response);
        }
        else {
            console.log('error');
        }
    };
    request.send();
};

app.getCallback = function (request) {
    for (var prop in request) {
        request[prop].key = prop;
        app.messageArray.push(request[prop]);
    }
    app.displayArray();
    console.log('in app.getCallback');
};

app.postAJAX = function (data, callback) {
    var request = new XMLHttpRequest();
    request.open('POST', app.firebase + '.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            callback(response, data);
        }
        else {
            console.log('error');
        }
    };
    request.send(JSON.stringify(data));
};

app.postCallback = function (response, data) {
    data.key = response.name;
    app.messageArray.push(data);
    app.updatePage(data);
    console.log('in app.postCallback');
};

app.createDate = function () {
    return new Date();
};

app.deleteMessage = function (index) {
    var key = app.messageArray[index].key;
    app.deleteAJAX(key, app.deleteCallback);
};

app.deleteAJAX = function (key, callback) {
    var request = new XMLHttpRequest();
    request.open('DELETE', app.firebase + key + '.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            //var response = JSON.parse(this.response);
            callback(key);
        }
        else {
            consle.log('error');
        }
    };
    request.send();
};

app.deleteCallback = function (key) {
    for (var i = 0; i < app.messageArray.length; i++) {
        if (app.messageArray[i].key === key) {
            app.messageArray.splice(i, 1);
            break;
        }
    }
    app.displayArray();
};

app.putAJAX = function (data, oldObj, callback) {
    var request = new XMLHttpRequest();
    request.open('PUT', app.firebase + oldObj.key + '.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            callback(data, oldObj);
        }
        else {
            console.log('error');
        }
    };
    request.send(JSON.stringify(data));
};

app.putCallback = function (data, oldObj) {
    for (var i = 0; i < app.messageArray.length; i++) {
        if (app.messageArray[i].key === oldObj.key) {
            app.messageArray[i].body = data.body;
            break;
        }
    }
    app.displayArray();
};

app.displayArray = function () {
    var elem = $('#showMessage'), message;
    elem.html('');
    for (var i = 0; i < app.messageArray.length; i++) {
        message = app.messageArray[i];
        elem.append('<div class="well"><span id="editIn"><h5>' + message.body + '</h5></span><div><h6>' + message.createDate + '<h6></div><span id="buttons"><div class="pull-right editBtns"><button class="btn btn-danger btn-xs" onclick="app.deleteMessage(' + i + ')">Delete</button></div></span></div>');
    }
    console.log('in app.displayArray');
};

app.updatePage = function (message) {
    var message = app.messageArray[app.messageArray.length - 1];
    i = app.messageArray.length - 1;
    $('#showMessage').append('<div class="well"><span id="editIn"><h5>' + message.body + '</h5></span><div><h6>' + message.createDate + '</h6></div><span id="buttons"><div class="pull-right editBtns">+<button class="btn btn-danger btn-xs" onclick="app.deleteMessage(' + i + ')">Delete</button></div></span></div>');
};

app.getAJAX(app.getCallback);

