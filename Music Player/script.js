const songs = [
    { title: "Chery Lady", artist: "Modern Talking", duration: 346, file: "songs/chery.mp3" },
    { title: "La Isla Bonita", artist: "Madonna", duration: 403, file: "songs/la-isla-bonita.mp3" },
    { title: "Ilomilo", artist: "Billie Eilish", duration: 236, file: "songs/ilomilo.mp3" },
    { title: "Diet Mountain Dew - Remix", artist: "Lana Del Rey", duration: 358, file: "songs/diet-mountain-dew.mp3" }
];

let currentSongIndex = 0;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const volumeSlider = document.getElementById('volumeSlider');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songDuration = document.getElementById('songDuration');
const playlistEl = document.getElementById('playlist');
const autoplayToggle = document.getElementById('autoplayToggle');

let autoplay = false;

function formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updatePlaylist() {
    playlistEl.innerHTML = songs.map((song, index) => `
        <div class="playlist-item ${index === currentSongIndex ? 'active' : ''}" data-index="${index}">
            <div class="playlist-item-info">
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            </div>
            <div class="playlist-item-duration">${formatTime(song.duration)}</div>
        </div>
    `).join('');
}

function loadSong(index, playAfterLoad = false) {
    currentSongIndex = index;
    const song = songs[index];
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songDuration.textContent = formatTime(song.duration);
    audio.src = song.file;
    updatePlaylist();

    if (playAfterLoad) {
        const p = audio.play();
        if (p && p.catch) p.catch(() => { /* autoplay blocked */ });
    }
}

function updateProgressUI() {
    const dur = audio.duration || songs[currentSongIndex].duration || 0;
    const cur = audio.currentTime || 0;
    const percent = dur ? (cur / dur) * 100 : 0;
    progress.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(cur);
    totalTimeEl.textContent = formatTime(dur);
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function prevSong() {
    const wasPlaying = !audio.paused;
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex, wasPlaying);
}

function nextSong() {
    const wasPlaying = !audio.paused;
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex, wasPlaying);
}

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const dur = audio.duration || songs[currentSongIndex].duration || 0;
    audio.currentTime = percent * dur;
    updateProgressUI();
});

volumeSlider.addEventListener('input', (e) => {
    const v = Number(e.target.value);
    audio.volume = Math.max(0, Math.min(1, v / 100));
});

playlistEl.addEventListener('click', (e) => {
    const item = e.target.closest('.playlist-item');
    if (!item) return;
    const index = parseInt(item.dataset.index, 10);
    const playAfter = true;
    loadSong(index, playAfter);
});

autoplayToggle.addEventListener('click', () => {
    autoplay = !autoplay;
    autoplayToggle.classList.toggle('active', autoplay);
});

audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
    songDuration.textContent = formatTime(audio.duration);
    updateProgressUI();
});

audio.addEventListener('timeupdate', updateProgressUI);

audio.addEventListener('play', () => {
    playBtn.innerHTML = '⏸';
});

audio.addEventListener('pause', () => {
    playBtn.innerHTML = '▶';
});

audio.addEventListener('ended', () => {
    if (autoplay) {
        nextSong();
    } else {
        playBtn.innerHTML = '▶';
    }
});


playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function init() {
    const initialVol = Number(volumeSlider.value || 70);
    audio.volume = Math.max(0, Math.min(1, initialVol / 100));

    updatePlaylist();
    loadSong(0, false);

    playBtn.innerHTML = '▶';
}

init();
