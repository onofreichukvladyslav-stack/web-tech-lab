const audioPlayContainer = document.getElementById('audio-player-container');
const playIconContainer = document.getElementById('btnPlay');
const muteIconContainer = document.getElementById('btnMute');
const seekSlider = document.getElementById('seek-slider');
const volumeSlider = document.getElementById('volume-slider');
const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
const outputContainer = document.getElementById('volume-output');
const audio = document.querySelector('audio');
let playState = 'play';
let muteState = 'unmute';

const playIcon = `<svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#000000" stroke-width="2"
                    d="M3,22.0000002 L21,12 L3,2 L3,22.0000002 Z M5,19 L17.5999998,11.9999999 L5,5 L5,19 Z M7,16 L14.1999999,12 L7,8 L7,16 Z M9,13 L10.8,12 L9,11 L9,13 Z" />
            </svg>`;

const pauseIcon = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`;

const unmuteIcon = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1H8V15H6L2 11H0V5H2L6 1Z" fill="#000000" />
                <path
                    d="M14 8C14 5.79086 12.2091 4 10 4V2C13.3137 2 16 4.68629 16 8C16 11.3137 13.3137 14 10 14V12C12.2091 12 14 10.2091 14 8Z"
                    fill="#000000" />
                <path d="M12 8C12 9.10457 11.1046 10 10 10V6C11.1046 6 12 6.89543 12 8Z" fill="#000000" />
            </svg>`;

const muteIcon = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 1H6L2 5H0V11H2L6 15H8V1Z" fill="#000000"/>
<path d="M9.29289 6.20711L11.0858 8L9.29289 9.79289L10.7071 11.2071L12.5 9.41421L14.2929 11.2071L15.7071 9.79289L13.9142 8L15.7071 6.20711L14.2929 4.79289L12.5 6.58579L10.7071 4.79289L9.29289 6.20711Z" fill="#000000"/>
</svg>`;

playIconContainer.addEventListener('click', () => {
    if (playState === 'play') {
        audio.play();
        playIconContainer.innerHTML = pauseIcon;
        playState = 'pause';
    }
    else {
        audio.pause();
        playIconContainer.innerHTML = playIcon;
        playState = 'play';
    }
});

muteIconContainer.addEventListener('click', () => {
    if (muteState === 'unmute'){
        audio.muted = true;
        muteIconContainer.innerHTML = muteIcon;
        muteState = 'mute';
    }
    else {
        audio.muted = false;
        muteIconContainer.innerHTML = unmuteIcon;
        muteState = 'unmute';
    }
});

const showRangeProgress = (rangeInput) => {
    if (rangeInput === seekSlider) audioPlayContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else audioPlayContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});
volumeSlider.addEventListener('input', (e) => {
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
audio.addEventListener('timeupdate', whilePlaying);

seekSlider.addEventListener('input', () => {
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
});

seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
});

volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;

    outputContainer.textContent = value;
    audio.volume = value / 100;
});