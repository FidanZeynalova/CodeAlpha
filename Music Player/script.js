// Playlist 
const songs = [
    { title: "Chery Lady", artist: "Modern Talking", duration: 346, file: "" },
    { title: "La Isla Bonita", artist: "Madonna", duration: 403, file: "" },
    { title: "Ilomilo", artist: "Billie Eilish", duration: 236, file: "" },
    { title: "Messy", artist: "Lola Young", duration: 444, file: "" }
];

let currentSongIndex = 0;
let isPlaying = false;
let autoplay = false;
let currentTime = 0;
let duration = songs[currentSongIndex].duration;
let animationId;

// Elements
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

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Load song
function loadSong(index) {
    currentSongIndex = index;
    const song = songs[index];
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    duration = song.duration;
    songDuration.textContent = formatTime(duration);
    totalTimeEl.textContent = formatTime(duration);
    currentTime = 0;
    updateProgress();
    updatePlaylist();
}

// Update progress
function updateProgress() {
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
}

// Play/Pause
function togglePlay() {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? '⏸' : '▶';

    if (isPlaying) {
        startProgress();
    } else {
        stopProgress();
    }
}

// Start progress animation
function startProgress() {
    const startTime = Date.now() - (currentTime * 1000);

    function animate() {
        const elapsed = (Date.now() - startTime) / 1000;
        currentTime = elapsed;

        if (currentTime >= duration) {
            currentTime = duration;
            updateProgress();
            stopProgress();
            isPlaying = false;
            playBtn.textContent = '▶';

            if (autoplay) {
                nextSong();
            }
        } else {
            updateProgress();
            animationId = requestAnimationFrame(animate);
        }
    }

    animationId = requestAnimationFrame(animate);
}

// Stop progress animation
function stopProgress() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

// Previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const wasPlaying = isPlaying;
    if (isPlaying) {
        stopProgress();
    }
    loadSong(currentSongIndex);
    if (wasPlaying) {
        isPlaying = true;
        playBtn.textContent = '⏸';
        startProgress();
    }
}

// Next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    const wasPlaying = isPlaying;
    if (isPlaying) {
        stopProgress();
    }
    loadSong(currentSongIndex);
    if (wasPlaying) {
        isPlaying = true;
        playBtn.textContent = '⏸';
        startProgress();
    }
}

// Update playlist display
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

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    currentTime = percent * duration;
    updateProgress();

    if (isPlaying) {
        stopProgress();
        startProgress();
    }
});

volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value;
});

playlistEl.addEventListener('click', (e) => {
    const item = e.target.closest('.playlist-item');
    if (item) {
        const index = parseInt(item.dataset.index);
        const wasPlaying = isPlaying;
        if (isPlaying) {
            stopProgress();
        }
        loadSong(index);
        if (wasPlaying || index !== currentSongIndex) {
            isPlaying = true;
            playBtn.textContent = '⏸';
            startProgress();
        }
    }
});

autoplayToggle.addEventListener('click', () => {
    autoplay = !autoplay;
    autoplayToggle.classList.toggle('active');
});

loadSong(0);