let playpause_btn = document.getElementsByClassName("playpause-track")[0];
let current_track = document.getElementById("myAudio")

// FIX: Renamed track_name to track_art to be consistent with usage in loadTrack
// FIX: Initialized track_author element
let track_art = document.getElementsByClassName("track-art")[0];
let track_name = document.getElementsByClassName("track-name")[0]; // FIX: Selected the track-name element
let track_author = document.getElementsByClassName("track-author")[0]; // FIX: Initialized track_author element
let now_playing = document.getElementsByClassName("now-playing")[0];



let current_time = document.getElementsByClassName("current-time")[0];
let total_duration = document.getElementsByClassName("total-duration")[0];
let no_Volume = document.getElementsByClassName("no-volume")[0];
let max_Volume = document.getElementsByClassName("max-volume")[0];
let seek_slider = document.getElementsByClassName("seek-slider")[0];
let volume_slider = document.getElementsByClassName("volume-slider")[0];
let track_list = [
    {
        name: "PENGUIN",
        author: "Author",
        image: "images/AWSO.jpg",
        path: "songs/future-design-344320.mp3",
        file: "future-design-344320.mp3"
    },
    {
        name: "NAGUINANG",
        author: "Author",
        image: "images/Desktop-hd-3d-nature-images-download.jpg",
        path: "songs/stylish-gunna-type-beat-310933.mp3",
        file: "stylish-gunna-type-beat-310933.mp3"
    },
    {
        name: "arfguinang",
        author: "Author",
        image: "images/light-dawn-landscape-1533483.jpg",
        path: "songs/the-forest-song-3d-sound-324462.mp3",
        file: "the-forest-song-3d-sound-324462.mp3"
    },
    {
        name: "arsenlla",
        author: "Author",
        image: "images/sparrow.jpg",
        path: "songs/forsaken-124041.mp3",
        file: "forsaken-124041.mp3"
    }
]

let track_index = 0;
// This is a function that (to be continued)

function loadTrack(index) {
    current_track.src = track_list[index].path;

    // FIX: Corrected variable names and access syntax
    track_art.src = track_list[index].image;
    track_author.textContent = track_list[index].author;
    track_name.textContent = track_list[index].name;

    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    current_track.load();
    resetTimer(); // FIX: Reset timer on new track load
}

loadTrack(track_index);

let isPlaying = false;

function playTrack() {
    current_track.play();
    isPlaying = true;
    playpause_btn.src = "pause.png";
    timer(); // Start timer on play
}

function pauseTrack() {
    current_track.pause();
    isPlaying = false;
    playpause_btn.src = "play.png";
    clearInterval(updateTimer); // Stop timer on pause
}

function playandpause() {
    if (!isPlaying) {
        playTrack();
    } else {
        pauseTrack();
    }
}


playpause_btn.addEventListener("click", playandpause);


function durationUpdate() {
    // FIX: Moved the time formatting logic INSIDE the function
    let currentMinutes = Math.floor(current_track.currentTime / 60);
    let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(current_track.duration / 60);
    let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);

    // Ensure values are numbers before comparison (for duration, in case track hasn't loaded metadata)
    if (isNaN(currentSeconds) || isNaN(durationSeconds)) {
        current_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        return;
    }

    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }

    if (currentMinutes < 10) { 
        currentMinutes = "0" + currentMinutes;
    }

    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }

    if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
    }

    // FIX: Corrected variable name from currentSecond to currentSeconds
    current_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
}

function updateslider() {
    let sliderPosition = 0;
    // Check if duration is a valid number to prevent division by zero/NaN
    if (!isNaN(current_track.duration)) {
        sliderPosition = current_track.currentTime * (100 / current_track.duration);
        seek_slider.value = sliderPosition;
    }
    durationUpdate();
}

function resetTimer() {
    current_time.textContent = "00:00";
    // slider = 0; // Removed uninitialized 'slider' variable
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

let updateTimer;

function timer() {
    clearInterval(updateTimer);
    resetTimer();
    // FIX: Corrected function name from updateSlider to updateslider
    updateTimer = setInterval(updateslider, 1000);
}

function changeTime() {
    current_track.currentTime = current_track.duration * (seek_slider.value / 100);
}

function changeVolume() {
    current_track.volume = volume_slider.value / 100;
}

function mute() {
    volume_slider.value = 0;
    changeVolume();
}
no_Volume.addEventListener("click", mute)

function loud() {
    volume_slider.value = 100;
    // FIX: Added parentheses for function call
    changeVolume();
}
max_Volume.addEventListener("click", loud)

// FIX: Corrected method name from getElementByClassName to getElementsByClassName
let download_btn = document.getElementsByClassName("download")[0];

function downloadTrack(track_index) {
    // FIX: Changed download_btn to be the anchor tag parent to set the href correctly for download
    let download_link = download_btn.parentElement; 
    download_link.setAttribute("href", track_list[track_index].path); // Set the path as the href
    download_link.setAttribute("download", track_list[track_index].file);
}


downloadTrack(track_index);


function nextTrack() {
    // FIX: Corrected typo in length
    if (track_index < track_list.length - 1) track_index += 1;
    else track_index = 0;

    // FIX: Corrected typo in capitalization of track_index
    loadTrack(track_index);
    downloadTrack(track_index);
    timer();
    playTrack();
}

// FIX: Corrected capitalization and method name
let next_btn = document.getElementsByClassName("next-track")[0];
next_btn.addEventListener("click", nextTrack);

// FIX: Corrected function name from nextTrack to prevTrack
function prevTrack() {
    if (track_index > 0) track_index -= 1;
    // FIX: Corrected typo in length
    else track_index = track_list.length - 1;

    // FIX: Corrected typo in capitalization of track_index
    loadTrack(track_index);
    downloadTrack(track_index);
    timer();
    playTrack();
}

// FIX: Corrected capitalization and method nam   
let prev_btn = document.getElementsByClassName("prev-track")[0];
prev_btn.addEventListener("click", prevTrack);

current_track.addEventListener("ended", nextTrack);