const music = document.getElementById("birthdayMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");
const openSurprise = document.getElementById("openSurprise");

const sections = ["home", "memories", "letters", "secret", "finale"];
function showSection(id) {
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    section.classList.toggle("section-hidden", sectionId !== id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateMusicButton(playing) {
  musicIcon.textContent = playing ? "Ⅱ" : "♫";
  musicLabel.textContent = playing ? "Pause music" : "Play music";
  musicToggle.setAttribute("aria-label", playing ? "Jeda musik" : "Putar musik");
}

async function startMusic() {
  musicToggle.hidden = false;
  try {
    await music.play();
    updateMusicButton(true);
  } catch (error) {
    updateMusicButton(false);
    musicLabel.textContent = "Play music";
  }
}

openSurprise.addEventListener("click", async () => {
  showSection("memories");
  await startMusic();
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      updateMusicButton(true);
    } catch (error) {
      updateMusicButton(false);
    }
  } else {
    music.pause();
    updateMusicButton(false);
  }
});

music.addEventListener("ended", () => updateMusicButton(false));
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showSection(button.dataset.go));
});

const letters = {
  lr: {
    title: "From Manusia Setengah Salmon, with respect",
    body: [
      "Happy birthday, Talitha! Semoga di umur yang baru ini, banyak hal baik yang datang ke hidup lu.",
      "Semoga lu selalu sehat, dikelilingi orang-orang yang tulus, dan pelan-pelan bisa mencapai hal-hal yang selama ini lu pengenin. Kalo lagi capek, semoga lu selalu punya waktu buat istirahat dan hal sederhana yang bisa bikin lu seneng lagi.",
      "Makasih udah jadi bagian dari cerita dan kenangan yang kita punya. Semoga tahun ini jadi tahun yang baik buat lu, dengan banyak pengalaman baru dan alasan buat tersenyum. Enjoy your special day, Talitha! 🩷"
    ],
    signature: "— Manusia"
  },
  hassa: {
    title: "A little note from Hassa",
    body: [
      "Happy birthday, Talitha! Semoga panjang umur, sehat selalu, dan semua urusan lu dipermudah.",
      "happy birthday talitt! wish you all the best, sehat selalu, be happy everytime everywhere yaa, hope your special day is filled with happiness, laughter, and lots of love.",
      "have a greatest birthday!💘"
    ],
    signature: "— Hassa ♡"
  },
  bunga: {
    title: "A little note from Bunga",
    body: [
      "Happy birthday, Talitha! Semoga hari ini penuh hal-hal baik dan bikin kamu senyum terus.",
      "Semoga selalu sehat, bahagia, dikelilingi orang-orang baik, dan dikasih kekuatan buat jalanin apa pun yang lagi kamu hadapi. Semoga satu per satu keinginan kamu bisa tercapai, ya.",
      "Enjoy your special day. Sending lots of love! 💙"
    ],
    signature: "— Bunga ♡"
  }
};

const letterButtons = [...document.querySelectorAll("[data-letter]")];
const letterContent = document.getElementById("letterContent");
const letterTitle = document.getElementById("letterTitle");
const letterBody = document.getElementById("letterBody");
const letterSignature = document.getElementById("letterSignature");
const closeLetter = document.getElementById("closeLetter");
const lettersProgress = document.getElementById("lettersProgress");
const secretButton = document.getElementById("secretButton");
secretButton.addEventListener("click", () => {
  showSection("secret");
});
const openedLetters = new Set();

letterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const letter = letters[button.dataset.letter];
    if (!letter) return;
    letterTitle.textContent = letter.title;
    letterBody.replaceChildren();
    letter.body.forEach(paragraph => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      letterBody.appendChild(p);
    });
    letterSignature.textContent = letter.signature;
    letterContent.hidden = false;
    openedLetters.add(button.dataset.letter);
    lettersProgress.textContent = `${openedLetters.size} of 3 letters opened`;
    secretButton.hidden = openedLetters.size !== 3;
    letterContent.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

closeLetter.addEventListener("click", () => {
  letterContent.hidden = true;
});

document.getElementById("backToTop").addEventListener("click", () => {
  showSection("home");
});
