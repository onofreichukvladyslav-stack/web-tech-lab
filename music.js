const audioPlayContainer = document.getElementById('audio-player-container');
const playIconContainer = document.getElementById('btnPlay');
const seekSlider = document.getElementById('seek-slider');
const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
const audio = document.querySelector('audio');
let playState = 'play';

playIconContainer.addEventListener('click', () => {
    if (playState === 'play') {
        audio.play();
        playState = 'pause';

        let interval = setInterval(() => {
            if(playState === 'play') {
                whilePlaying();
            } else{
                clearInterval(interval);
            }
        }, 1000);
    }
    else {
        audio.pause();
        playState = 'play';
    }
});

const showRangeProgress = (rangeInput) => {
    if (rangeInput === seekSlider) audioPlayContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else audioPlayContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`
}

const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
}

const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
}

const displayBufferedAmount = () => {
    const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));

    audioPlayContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
}

const whilePlaying = () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    audioPlayContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
}

if (audio.readyState === 4) {
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    });
}

audio.addEventListener('progress', displayBufferedAmount);

seekSlider.addEventListener('input', () => {
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
});

seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
});

