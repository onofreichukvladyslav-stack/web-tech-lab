const audioPlayContainer = document.getElementById('audio-player-container');
const playIconContainer = document.getElementById('btnPlay');
const seekSlider = document.getElementById('seek-slider');
const audio = document.querySelector('audio');
let playState = 'play';

playIconContainer.addEventListener('click', () => {
    if (playState === 'play'){
        audio.play();
        playState = 'pause';
    }
    else {
        audio.pause();
        playState = 'play';
    }
});