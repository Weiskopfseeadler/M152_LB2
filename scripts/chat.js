
    // var chatSocket = new WebSocket("ws://localhost:8999");



        var chatSocket = new WebSocket(" wss://m152-lb2.herokuapp.com");


var inputName = document.querySelector("#name");
var inputMessage = document.querySelector("#input");
var error = document.querySelector("#error");
inputName="";
inputMessage="";
    var geo;
    var geo =  $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
        console.log(JSON.parse(data, null, 2));
        geo =(JSON.parse(data, null, 2));
    });


chatSocket.onopen = function (event) {

    var inputName = document.querySelector("#name");
    var inputMessage = document.querySelector("#input");
    var message = {user: "NoName", msg: "Hello I'm new her. I 'm comming from "+geo.geobytescountry}
    chatSocket.send(JSON.stringify(message));
    var message = {user: "identifyer=?989()" , msg: "conected with  IP:"+geo.geobytesipaddress}

};

chatSocket.onclose = function (event) {
    var inputName = document.querySelector("#name");
    var inputMessage = document.querySelector("#input");
    var message = {user: inputName.value, msg: "See you later aligater"}
    chatSocket.send(JSON.stringify(message));
};



document.querySelector("#submit").addEventListener('click', function () {
    var inputName = document.querySelector("#name");
    var inputMessage = document.querySelector("#input");
    var error = document.querySelector("#error");
    console.log(inputName.value+inputMessage)
    if (inputName.value !== ""||inputMessage.value !==""){
        error.style.display = "none";
        var message = {user: inputName.value, msg: inputMessage.value}
        chatSocket.send(JSON.stringify(message));
    }else{
        error.style.display = "block";
    }

});


chatSocket.onmessage = function (event) {
    text = document.getElementById("text");
    console.log(event.data);
    input = JSON.parse(event.data);

    message = "<p>" + input.user + "say:</p> " + input.msg;

    text.innerHTML += `${message}`;
}
