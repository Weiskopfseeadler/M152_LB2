

function startOrStopp() {
    if(video.paused == true){
        video.play();
        playButtonIcon.className = "fas fa-pause"
    }else {
        video.pause();
        playButtonIcon.className = "fas fa-play"
    }
}
function test() {
    console.log("asdasdjfhujdshvj");
}

function mute() {
    if(video.muted == true){
        video.muted= false;
        muteButtonIcon.className ="fas fa-volume-up";

    }else {
        video.muted= true;
        muteButtonIcon.className ="fas fa-volume-mute";
    }
}
function fullscreen(){
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

function setSpeed(){
    video.playbackRate= Number(speedSelect.value);
}

window.onload = function () {
    console.log("asasasas")
    const video = document.getElementById("video");
    const playButton = document.getElementById("playButton");
    const muteButton = document.getElementById("muteButton");
    const fullscreenButton = document.getElementById("fullscreenButton");
    const speedSelect = document.getElementById("speedSelect");
    const   muteButtonIcon = document.getElementById(" muteButtonIcon");
    const  a= document.getElementById("a");
    const  b= document.getElementById("b");
    const  c= document.getElementById("c");

    console.log(speedSelect)
    // playButton.innerText = ">"
    // muteButton.innerText= "<))";
    // fullscreenButton.innerText= "<- ->";


}