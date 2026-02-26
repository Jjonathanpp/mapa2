const audio = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('toggleMusic');
const statusLabel = document.getElementById('musicStatus');
const openPlayerBtn = document.getElementById('openPlayer');

let isPlaying = false;

function setStatus(message) {
  if (!statusLabel) return;
  statusLabel.textContent = message;
}

function decodeAudioError() {
  if (!audio?.error) return 'No se pudo reproducir el audio.';

  switch (audio.error.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      return 'La reproducción se canceló antes de empezar.';
    case MediaError.MEDIA_ERR_NETWORK:
      return 'Hubo un problema de red al cargar la canción.';
    case MediaError.MEDIA_ERR_DECODE:
      return 'El archivo existe, pero el navegador no pudo decodificarlo.';
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return 'Formato no compatible o ruta incorrecta (revisá assets/song.mp3).';
    default:
      return 'No se pudo reproducir el audio.';
  }
}

async function startMusic() {
  if (!audio) return;

  try {
    await audio.play();
    isPlaying = true;
    toggleBtn.textContent = '⏸️ Pausar canción';
    setStatus('Reproduciendo 🎵');
  } catch {
    setStatus('Tu celular bloqueó el audio. Tocá otra vez el botón para habilitarlo.');
  }
}

function pauseMusic() {
  if (!audio) return;

  audio.pause();
  isPlaying = false;
  toggleBtn.textContent = '▶️ Reanudar canción';
  setStatus('Música en pausa.');
}

async function toggleMusic() {
  if (!audio) return;

  if (isPlaying) {
    pauseMusic();
    return;
  }

  await startMusic();
}

toggleBtn?.addEventListener('click', toggleMusic);

openPlayerBtn?.addEventListener('click', () => {
  audio?.setAttribute('controls', '');
  openPlayerBtn.hidden = true;
  setStatus('Activé los controles manuales. Probá reproducir desde el reproductor.');
});

audio?.addEventListener('play', () => {
  isPlaying = true;
  toggleBtn.textContent = '⏸️ Pausar canción';
});

audio?.addEventListener('pause', () => {
  isPlaying = false;
  toggleBtn.textContent = '▶️ Reanudar canción';
});

audio?.addEventListener('loadeddata', () => {
  setStatus('Canción cargada. Tocá “Empezar canción”.');
});

audio?.addEventListener('error', () => {
  setStatus(`Error: ${decodeAudioError()}`);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
