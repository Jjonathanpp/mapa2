const audio = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('toggleMusic');
const statusLabel = document.getElementById('musicStatus');

let isPlaying = false;

async function toggleMusic() {
  if (!audio) return;

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    toggleBtn.textContent = '▶️ Reanudar canción';
    statusLabel.textContent = 'Música en pausa.';
    return;
  }

  try {
    await audio.play();
    isPlaying = true;
    toggleBtn.textContent = '⏸️ Pausar canción';
    statusLabel.textContent = 'Reproduciendo 🎵';
  } catch {
    statusLabel.textContent =
      'Tu celular bloqueó el autoplay. Tocá nuevamente para habilitar la música.';
  }
}

toggleBtn?.addEventListener('click', toggleMusic);

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
