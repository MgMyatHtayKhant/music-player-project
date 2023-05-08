const musics = [
  "track1.mp3",
  "track2.mp3",
  "track3.mp3",
  "track4.mp3",
  "track5.mp3",
  "track6.mp3",
];

const musicListTag = document.querySelector(".music-list");
const audioTag = document.querySelector("audio");
const prevBtnTag = document.querySelector(".prev");
const playBtnTag = document.querySelector(".play");
const nextBtnTag = document.querySelector(".next");
const pauseBtnTag = document.querySelector(".pause");
const musicTimeTag = document.querySelector(".music-time");
const progressBarTag = document.querySelector(".music-progress-bar");
const currentBarTag = document.querySelector(".current");

let activeMusic = "";

for (let i = 0; i < musics.length; i++) {
  const div = document.createElement("div");
  div.append(`${i + 1}. ${musics[i]}`);
  div.addEventListener("click", (e) => {
    activeMusic = musicListTag.querySelector(".active");
    if (activeMusic) {
      activeMusic.classList.remove("active");
    }
    audioTag.src = "music/" + musics[i];
    audioTag.play();
    updatePlayButton(true);
    div.classList.add("active");
    activeMusic = musicListTag.querySelector(".active");
  });
  musicListTag.append(div);
}

let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata", (e) => {
  duration = Math.floor(audioTag.duration);
  durationText = convertTimeFormat(duration);
});

audioTag.addEventListener("timeupdate", (e) => {
  const current = Math.floor(audioTag.currentTime);
  const currentText = convertTimeFormat(current);
  musicTimeTag.innerText = currentText + " / " + durationText;
  updateCurrentProgress(current);
});

audioTag.addEventListener("ended", (e) => {
  updatePlayButton(false);
});

playBtnTag.addEventListener("click", (e) => {
  if (activeMusic) {
    audioTag.play();
    updatePlayButton(true);
  }
});

pauseBtnTag.addEventListener("click", (e) => {
  audioTag.pause();
  updatePlayButton(false);
});

prevBtnTag.addEventListener("click", (e) => {
  if (activeMusic) {
    activeMusic = activeMusic.previousElementSibling
      ? activeMusic.previousElementSibling
      : musicListTag.lastElementChild;
    activeMusic.click();
    activeMusic.scrollIntoView();
  }
});

nextBtnTag.addEventListener("click", (e) => {
  if (activeMusic) {
    activeMusic = activeMusic.nextElementSibling
      ? activeMusic.nextElementSibling
      : musicListTag.firstElementChild;
    activeMusic.click();
    activeMusic.scrollIntoView();
  }
});

progressBarTag.addEventListener("click", (e) => {
  if (activeMusic) {
    const positionCursor = e.pageX - progressBarTag.offsetLeft;
    const percentage = positionCursor / progressBarTag.offsetWidth;
    currentBarTag.style.width = `${percentage * 100}%`;
    audioTag.currentTime = percentage * duration;
  }
});

function convertTimeFormat(total) {
  const minutes = Math.floor(total / 60);
  const seconds = Math.floor(total % 60);
  const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
  const secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
  return minutesText + ":" + secondsText;
}

function updateCurrentProgress(currentTime) {
  const percentage = (currentTime / duration) * 100;
  currentBarTag.style.width = `${percentage}%`;
}

function updatePlayButton(isPlaying) {
  if (isPlaying) {
    playBtnTag.style.display = "none";
    pauseBtnTag.style.display = "inline";
  } else {
    playBtnTag.style.display = "inline";
    pauseBtnTag.style.display = "none";
  }
}
