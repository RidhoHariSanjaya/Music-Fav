const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'bahan/Bertumbuh Bersama.mp3',
        displayName: 'Bertumbuh Bersama',
        cover: 'bahan/bertumbuh.jpg',
        artist: 'Nosstress',
    },
    {
        path: 'bahan/Terima Kasih.mp3',
        displayName: 'Terima Kasih',
        cover: 'bahan/terima-kasih-nosstress.jpg',
        artist: 'Nosstress',
    },
    {
        path: 'bahan/Tunjukkan-Cintamu.mp3',
        displayName: 'Tunjukkan Cintamu',
        cover: 'bahan/nosstress.jpg',
        artist: 'Nosstress',
    },
    {
        path: 'bahan/Lagu Ini Aku (feat. Sony Bono, Windu Estianto).mp3',
        displayName: 'Lagu Ini Aku',
        cover: 'bahan/nosstress-.jpg',
        artist: 'Nosstress',
    },
    {
        path: 'bahan/Bantu Dirimu Lagi.mp3',
        displayName: 'Bantu Dirimu Lagi',
        cover: 'bahan/nosstress-3.jpg',
        artist: 'Nosstress',
    },
    {
        path: 'bahan/Laguku Untukmu.mp3',
        displayName: 'Laguku untukmu',
        cover: 'bahan/perspektif-bodoh.jpg',
        artist: 'Nosstress',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Berhenti');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);