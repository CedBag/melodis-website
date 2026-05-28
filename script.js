// =========================================
// 1. LOADER & UI INITIALIZATION
// =========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => { 
        loader.style.display = 'none'; 
    }, 500);
});

// =========================================
// 2. MENU MOBILE (HAMBURGER)
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const menuOverlay = document.getElementById('menu-overlay');

function toggleMenu() { 
    navLinks.classList.toggle('active'); 
    hamburger.classList.toggle('active'); 
    if (menuOverlay) menuOverlay.classList.toggle('active');
}

function closeMenu() { 
    navLinks.classList.remove('active'); 
    hamburger.classList.remove('active'); 
    if (menuOverlay) menuOverlay.classList.remove('active');
}

hamburger.addEventListener('click', toggleMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

// =========================================
// 3. AOS ANIMATION LIBRARY INIT
// =========================================
AOS.init({ 
    duration: 800, 
    once: true, 
    offset: 50 
});

// =========================================
// 4. FOOTER YEAR AUTO-UPDATE
// =========================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================
// 5. LECTEUR PLAYLIST PREMIUM MELODIS
// =========================================
const playlist = [
    { id: 1, title: "Mariage Romantique", style: "Piano Voix", file: "assets/demo1.mp3", icon: "fa-heart", duration: "1:30" },
    { id: 2, title: "Anniversaire Festif", style: "Afrobeat", file: "assets/Joy.mp3", icon: "fa-cake-candles", duration: "1:42" },
    { id: 3, title: "Jingle Pro", style: "Dynamique / Moderne", file: "assets/demo3.mp3", icon: "fa-briefcase", duration: "0:45" }
];

let currentTrackIndex = 0;
let isPlaying = false;

const mainAudio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const activeTrackTitle = document.getElementById('active-track-title');
const activeTrackStyle = document.getElementById('active-track-style');
const playerVinyl = document.getElementById('player-vinyl');
const musicWave = document.getElementById('music-wave');
const playlistTracksContainer = document.getElementById('playlist-tracks');

// 1. Initialiser la playlist dans le DOM
function initPlaylist() {
    if (!playlistTracksContainer) return;
    playlistTracksContainer.innerHTML = '';
    playlist.forEach((track, index) => {
        const trackItem = document.createElement('div');
        trackItem.classList.add('track-item');
        if (index === currentTrackIndex) {
            trackItem.classList.add('active');
        }
        
        trackItem.innerHTML = `
            <div class="track-left">
                <div class="track-icon">
                    <i class="fa-solid ${track.icon}"></i>
                </div>
                <div class="track-meta">
                    <h4 class="track-title">${track.title}</h4>
                    <span class="track-style">${track.style}</span>
                </div>
            </div>
            <div class="track-right">
                <span class="track-duration">${track.duration}</span>
                <i class="fa-solid fa-play playlist-play-btn"></i>
            </div>
        `;
        
        trackItem.addEventListener('click', () => {
            selectTrack(index);
        });
        
        playlistTracksContainer.appendChild(trackItem);
    });
    
    loadTrack(currentTrackIndex);
}

// 2. Charger une piste
function loadTrack(index) {
    if (!mainAudio) return;
    currentTrackIndex = index;
    const track = playlist[currentTrackIndex];
    
    mainAudio.src = track.file;
    activeTrackTitle.textContent = track.title;
    activeTrackStyle.textContent = `Style : ${track.style}`;
    
    // Mettre à jour l'état actif dans la liste
    const trackItems = document.querySelectorAll('.track-item');
    trackItems.forEach((item, idx) => {
        if (idx === currentTrackIndex) {
            item.classList.add('active');
            // Remplacer l'icône play de la track par pause
            const playIcon = item.querySelector('.playlist-play-btn');
            if (playIcon) {
                if (isPlaying) {
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                } else {
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                }
            }
        } else {
            item.classList.remove('active');
            const playIcon = item.querySelector('.playlist-play-btn');
            if (playIcon) {
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            }
        }
    });
}

// 3. Lire / Mettre en pause
function togglePlay() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function playTrack() {
    if (!mainAudio) return;
    isPlaying = true;
    mainAudio.play().then(() => {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        playerVinyl.classList.add('playing');
        musicWave.classList.add('active');
        
        // Mettre à jour l'icône dans la playlist
        updatePlaylistActiveIcon(true);
    }).catch(e => {
        console.log("Lecture en attente d'interaction utilisateur : ", e);
    });
}

function pauseTrack() {
    if (!mainAudio) return;
    isPlaying = false;
    mainAudio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    playerVinyl.classList.remove('playing');
    musicWave.classList.remove('active');
    
    // Mettre à jour l'icône dans la playlist
    updatePlaylistActiveIcon(false);
}

function updatePlaylistActiveIcon(playing) {
    const activeItem = document.querySelector('.track-item.active');
    if (activeItem) {
        const playIcon = activeItem.querySelector('.playlist-play-btn');
        if (playIcon) {
            if (playing) {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            } else {
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            }
        }
    }
}

// 4. Sélectionner une piste directement
function selectTrack(index) {
    if (currentTrackIndex === index) {
        togglePlay();
    } else {
        loadTrack(index);
        playTrack();
    }
}

// 5. Chanson précédente / suivante
function prevTrack() {
    let index = currentTrackIndex - 1;
    if (index < 0) {
        index = playlist.length - 1;
    }
    loadTrack(index);
    if (isPlaying) playTrack();
}

// 6. Passer à la suivante
function nextTrack() {
    let index = currentTrackIndex + 1;
    if (index >= playlist.length) {
        index = 0;
    }
    loadTrack(index);
    if (isPlaying) playTrack();
}

// 7. Formater le temps (secondes -> mm:ss)
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// 8. Mettre à jour la barre de progression
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (!isNaN(duration)) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    }
}

// 9. Cliquer sur la barre pour avancer/reculer
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = mainAudio.duration;
    if (!isNaN(duration)) {
        mainAudio.currentTime = (clickX / width) * duration;
    }
}

// 10. Événements
if (mainAudio) {
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    mainAudio.addEventListener('timeupdate', updateProgress);
    
    // Mettre à jour la durée totale quand les métadonnées sont chargées
    mainAudio.addEventListener('loadedmetadata', () => {
        durationTimeEl.textContent = formatTime(mainAudio.duration);
    });
    
    progressContainer.addEventListener('click', setProgress);
    
    // Enchaînement automatique
    mainAudio.addEventListener('ended', nextTrack);
    
    // Initialisation
    initPlaylist();
}