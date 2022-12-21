// CONSTANTES
    // Boutons
const hide = document.querySelector("#hide");
const playPauseButton = document.querySelector(".playPause");
const shuffle = document.querySelector(".shuffle");
const loop = document.querySelector(".loop");
const rewind = document.querySelector(".rewind");
const fastForward = document.querySelector(".fast");
const stop = document.querySelector(".stop");

    // Barre de Temps
const currentTime = document.querySelector("#current_time");
let songTime = document.querySelector(".song_duration");

    // Audio
let audio = document.querySelector("audio");
let music = document.querySelectorAll(".music");

    // Display les Titres, Artistes et Cover
let albumCover = document.querySelector(".album_cover");
let albumCoverSecond = document.querySelector(".album_cover2");
let titleLeft = document.querySelector("#song_title");
let artistLeft = document.querySelector("#artist_name");
let titleBottom = document.querySelector("#song_title_bottom");
let artistBottom = document.querySelector("#artist_name_bottom");
let titleRight = document.querySelector("#title_right");
let enLecture = document.querySelector("#lecture");

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
let ezio = new Song("2","Ezio's Family", "Jesper Kyd", "Photos/ezio.jpg", "Tracks/ezio.mp3", "3:59");
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

// Fonction pour le bouton HIDE

hide.addEventListener("click", (e) => {
    if (document.getElementById("cover").style.display = "flex") {
        document.getElementById("cover").style.display = "none";
        document.getElementById("list").style.width = "96%";
    } else {
        document.getElementById("cover").style.display = "flex";
        document.getElementById("list").style.width = "50%";
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

// Fonction pour le bouton STOP
stop.addEventListener("click", (e) => {
    music.reset();
})

// Fonction pour les bouton REWIND ET NEXT

// Fonction pour le bouton SHUFFLE

// Fonction pour le bouton LOOP


// Démarrage de la musique, mise en place des titres, artistes et covers

music.forEach(element => {
    element.addEventListener("click", (e) =>  {
        let indexMusic = element.firstElementChild.innerHTML;

        playPauseButton.classList.replace("play", "pause");
        audio.src = songArray[indexMusic-1].url;
        audio.play();

        albumCover.src = songArray[indexMusic-1].cover;
        titleLeft.textContent = songArray[indexMusic-1].title;
        artistLeft.textContent = songArray[indexMusic-1].artist;

        titleRight.textContent = songArray[indexMusic-1].title + "   -   " + songArray[indexMusic-1].artist;

        albumCoverSecond.src = songArray[indexMusic-1].cover;
        enLecture.textContent = "EN LECTURE";
        titleBottom.textContent = songArray[indexMusic-1].title;
        artistBottom.textContent = songArray[indexMusic-1].artist;

        songTime.textContent = songArray[indexMusic-1].songDuration;

    })
});

