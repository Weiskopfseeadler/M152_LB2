

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






/////////////////////////////////////////////////////////////////////////////////////////////////



    const player = document.querySelector('.player');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress__filled');
    const ranges = player.querySelectorAll('.player__slider');



    function spaceBarTogglePlay(e) {
        if (e.keyCode == 32) {
            togglePlay();
        }
    }





    function handleRangeUpdate() {
        const sliderValue = this.value;
        this.setAttribute('title', sliderValue);
        video[this.name] = sliderValue;
        console.log(this.event);
    }

    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }



// event listeners

    video.addEventListener('timeupdate', handleProgress);




    document.addEventListener('keypress', spaceBarTogglePlay);

    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);}