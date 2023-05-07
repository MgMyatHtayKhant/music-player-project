const musics = [
  "track1.mp3",
  "track2.mp3",
  "track3.mp3",
  "track4.mp3",
  "track5.mp3",
  "track6.mp3",
];

const musicListTag = document.querySelector(".music-list");

for (let i = 0; i < musics.length; i++) {
  const div = document.createElement("div");
  div.append(`${i + 1}.${musics[i]}`);
  musicListTag.append(div);
}
