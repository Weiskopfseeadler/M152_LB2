var chatSocket = new WebSocket("ws://localhost:8999");


chatSocket.onopen = function (event) {
    chatSocket.send("Here's some text that the server is urgently awaiting!");
};
var inputName = document.querySelector("#name");
var inputMessage = document.querySelector("#input");

document.querySelector("#submit").addEventListener('click', function () {
    var message = {user: inputName.value, msg: inputMessage.value}
    chatSocket.send(JSON.stringify(message));
});


chatSocket.onmessage = function (event) {
    text = document.getElementById("text");
    console.log(event.data);
    input = JSON.parse(event.data);

    message = "<p>" + input.user + "say:</p> " + input.msg;

    text.innerHTML += `${message}`;
}
