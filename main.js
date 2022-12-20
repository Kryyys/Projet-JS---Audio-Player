// CONSTANTES
// Boutons
const playPauseButton = document.querySelector(".playPause");
const shuffle = document.querySelector(".shuffle");
const loop = document.querySelector(".loop");
const rewind = document.querySelector(".rewind");
const fastForward = document.querySelector(".fast");
const stop = document.querySelector(".stop");

// Barre de Temps
const currentTime = document.querySelector("#current_time");
let songTime = document.querySelector(".song_duration");

let audio = document.querySelector("audio");




// Liste des musiques et leurs instances
class Song {
    constructor(number, title, artist, cover, url, songDuration) {
        this.number = number,
        this.title = title,
        this.artist = artist,
        this.cover = cover,
        this.url = url,
        this.songDuration = songDuration
    }
};

let death = new Song ("1", "Death by Glamour", "Toby Fox", "Photos/death.webp", "Tracks/death.mp3", "2:14");
let ezio = new Song("2","Ezio's Familly", "Jesper Kyd", "Photos/ezio.jpg", "Tracks/ezio.mp3", "3:59");
let colossus = new Song("3","Dark Colossus", "Rozen", "Photos/colossus.jpg", "Tracks/colossus.mp3", "5:02");
let vordt = new Song("4","Vordt of the Boreal Valley", "Motoi Sakuraba", "Photos/DS.jpg", "Tracks/Vordt.mp3", "6:14");

let songArray = [death, ezio, colossus, vordt]


// Mise en place de la liste de chansons

// Numéro de la chanson
let numberCells = document.querySelectorAll(".number");
numberCells.forEach(element => {
    for(i = 0 ; i < songArray.length ; i++) {
        numberCells[i].textContent = songArray[i].number;
    };
})

// Titre
let titleCells = document.querySelectorAll(".title_track");
titleCells.forEach(element => {
    for(i = 0 ; i < songArray.length ; i++) {
        titleCells[i].textContent = songArray[i].title;
    };
});

// Artiste
let artistCells = document.querySelectorAll(".artist");
artistCells.forEach(element => {
    for(i = 0 ; i<songArray.length ;i++) {
        artistCells[i].textContent = songArray[i].artist;
    };
});


// Fonction pour le bouton PLAY/PAUSE

playPauseButton.addEventListener("click", (e) => {
    if (playPauseButton.classList.contains("play")) {
        playPauseButton.classList.replace("play", "pause");
        audio.play();
    } else if (playPauseButton.classList.contains("pause")) {
        playPauseButton.classList.replace("pause", "play");
        audio.pause();
    };
});


// Faire jouer la musique
let music = document.querySelectorAll(".music");

music.forEach(element => {
    element.addEventListener("click", (e) =>  {
        let indexMusic = element.firstElementChild.innerHTML;
        let albumCover = document.querySelector(".album_cover");
        let albumCoverSecond = document.querySelector(".album_cover2")

        playPauseButton.classList.replace("play", "pause");
        audio.src = songArray[indexMusic-1].url;
        audio.play();

        songTime.textContent = songArray[indexMusic-1].songDuration;
        albumCover.src = songArray[indexMusic-1].cover;
        albumCoverSecond.src = songArray[indexMusic-1].cover;
    })
});

