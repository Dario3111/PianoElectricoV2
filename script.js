const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Crear el nodo de ganancia
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5; // Valor inicial del volumen

// Conectar el nodo de ganancia al destino de audio
gainNode.connect(audioContext.destination);

const noteFrequencies = {
  C: 261.63,
  "C#": 277.18,
  D: 293.66,
  "D#": 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  G: 392.0,
  "G#": 415.3,
  A: 440.0,
  "A#": 466.16,
  B: 493.88,
  C2: 523.25,
  "C#2": 554.37,
  D2: 587.33,
  "D#2": 622.25,
  E2: 659.25,
};

const keyToNote = {
  KeyA: "C",
  KeyW: "C#",
  KeyS: "D",
  KeyE: "D#",
  KeyD: "E",
  KeyF: "F",
  KeyT: "F#",
  KeyG: "G",
  KeyY: "G#",
  KeyH: "A",
  KeyU: "A#",
  KeyJ: "B",
  KeyK: "C2",
  KeyO: "C#2",
  KeyL: "D2",
  KeyP: "D#2",
  Semicolon: "E2",
};

function playSound(note) {
  const frequency = noteFrequencies[note];
  if (!frequency) return;

  const oscillator = audioContext.createOscillator();
  oscillator.type = "square"; // Puedes cambiar el tipo de onda aquí
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  // Conectar el oscilador al nodo de ganancia
  oscillator.connect(gainNode);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2); // Duración del sonido
}

document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("mousedown", () => {
    playSound(key.dataset.key);
    key.style.backgroundColor = "red"; // Cambia el color al presionar la tecla
  });
  key.addEventListener("mouseup", () => {
    key.style.backgroundColor = key.classList.contains("white-key")
      ? "white"
      : "black";
  });
  key.addEventListener("mouseleave", () => {
    key.style.backgroundColor = key.classList.contains("white-key")
      ? "white"
      : "black";
  });
});

document.addEventListener("keydown", (event) => {
  const note = keyToNote[event.code];
  if (note) {
    playSound(note);
    const keyElement = document.querySelector(`[data-key="${note}"]`);
    if (keyElement) keyElement.style.backgroundColor = "blue";
  }
});

document.addEventListener("keyup", (event) => {
  const note = keyToNote[event.code];
  if (note) {
    const keyElement = document.querySelector(`[data-key="${note}"]`);
    if (keyElement)
      keyElement.style.backgroundColor = keyElement.classList.contains(
        "white-key"
      )
        ? "white"
        : "black";
  }
});

// Actualizar el volumen cuando cambia el slider
const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.addEventListener("input", (event) => {
  gainNode.gain.value = event.target.value;
});
