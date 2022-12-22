// CONSTANTES ET VARIABLES
    // Boutons
const hide = document.querySelector("#hide");
const heart = document.querySelector(".heart");
const playPauseButton = document.querySelector(".playPause");
const shuffle = document.querySelector("#shuffle");
const loop = document.querySelector("#loop");
const rewind = document.querySelector("#rewind");
const fastForward = document.querySelector("#fast");
const stop = document.querySelector("#stop");

    // Barre de Temps
let aNow = document.querySelector(".current_time");
let songTime = document.querySelector(".song_duration");
let seekBar = document.querySelector(".seek_bar");

    // Audio
let audio = document.querySelector("audio");
let music = document.querySelectorAll(".music");
let sound = document.querySelector("#volume");

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
let hyrule = new Song("5", "Hyrule Castle", "Rozen", "Photos/Hyrule.jpg", "Tracks/Hyrule.mp3", "4:41");
let advent = new Song ("6", "One-Winged Angel", "Nobuo Uematsu", "Photos/advent.jpg", "Tracks/advent.mp3", "6:07");
let crypt = new Song ("7", "Mausoleum Mash Shopkeeper", "Danny Baranowski", "Photos/crypt.jpg", "Tracks/crypt.mp3", "2:55");
let lullaby = new Song("8", "Lullaby of Woe", "Marcin Przybyłowicz", "Photos/lullaby.webp", "Tracks/lullaby.mp3", "2:30");
let symphony = new Song ("9", "Symphony of the Boreal Wind", "Yu-peng Chen", "Photos/symphony.jpg", "Tracks/symphony.mp3", "4:51");
let grimm = new Song("10", "The Grimm Troup", "Christopher Larkin", "Photos/grimm.jpg", "Tracks/grimm.mp3", "2:18");
let arthas = new Song("11", "Arthas my Son", "WoW : Wrath of the Lich King OST", "Photos/arthas.jpg", "Tracks/arthas.mp3", "3:12");
let garde = new Song("12", "Sovngarde", "The Elder Scrolls V : Skyrim OST", "Photos/sovngarde.jpg", "Tracks/Sovngarde.mp3", "3:36")

let songArray = [death, ezio, colossus, vordt, hyrule, advent, crypt, lullaby, symphony, grimm, arthas, garde]


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


// Démarrage de la musique, mise en place des titres, artistes et covers

// Au click sur une cellule de la liste
music.forEach(element => {
    let indexMusic = element.firstElementChild.innerHTML;
    element.setAttribute("data-id", indexMusic);
    element.addEventListener("click", (e) =>  {
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

        
    });
});

// Quand la musique finit
audio.addEventListener("ended", (e) => {
    let indexTrack = songArray.findIndex(e => e.url == audio.src.substring(audio.src.indexOf("Tracks")))+1;

    if (indexTrack < songArray.length) {
        audio.src = songArray[indexTrack++].url;
        audio.play();
    } else if(indexTrack > songArray.length-1 && loop.classList.contains("inactive")) {
        playPauseButton.classList.replace("pause", "play");
        audio.pause();
    } else if (indexTrack > songArray.length-1 && loop.classList.contains("active")) {
        songArray=[0];
        audio.play();
    };

    albumCover.src = songArray[indexTrack-1].cover;
    titleLeft.textContent = songArray[indexTrack-1].title;
    artistLeft.textContent = songArray[indexTrack-1].artist;

    titleRight.textContent = songArray[indexTrack-1].title + "   -   " + songArray[indexTrack-1].artist;

    albumCoverSecond.src = songArray[indexTrack-1].cover;
    titleBottom.textContent = songArray[indexTrack-1].title;
    artistBottom.textContent = songArray[indexTrack-1].artist;
    songTime.textContent = songArray[indexTrack-1].songDuration;
});


// Fonction pour le SON 

sound.addEventListener("change", (e) => {
    audio.volume = sound.value;
});


// Fonction pour la barre de TEMPS

// Mise en place du temps en hh:mm:ss
let timeString = (secs) => {
    let ss = Math.floor(secs),
    hh = Math.floor(ss / 3600),
    mm = Math.floor((ss - (hh * 3600)) / 60);
    ss = ss - (hh * 3600) - (mm * 60);

    // Retourner le temps
    if (hh>0) { 
        mm = mm<10 ? "0"+mm : mm; 
    };

    ss = ss<10 ? "0"+ss : ss;
    return hh>0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}` ;
};

// Initialiser le temps
audio.addEventListener("loadedmetadata", (e) => {
    aNow.innerHTML = timeString(0);
    songTime.innerHTML = timeString(audio.duration);
});

// Update le temps
audio.addEventListener("timeupdate", (e) => {
    aNow.innerHTML = timeString(audio.currentTime);
});

audio.addEventListener("loadedmetadata", (e) => {
    // Plafond de temps pour la seekbar
    seekBar.max = Math.floor(audio.duration);

    // Changer le temps de la seek bar
    let aSeeking = false; 
    seekBar.addEventListener("input", (e) => {
        aSeeking = true; 
    });

    seekBar.addEventListener("change", (e) => {
        audio.currentTime = seekBar.value;
        if (!audio.paused) { 
            audio.play(); 
        };
        aSeeking = false;
    });

    // Changer le temps de la seekbar durant la lecture
    audio.addEventListener("timeupdate", () => {
        if (!aSeeking) { 
            seekBar.value = Math.floor(audio.currentTime); 
        }
    });
});

// Fonction pour le bouton LIKE
// Ca me marche que pour le premier, à voir +tard
    heart.addEventListener("click", (e) => {
        if (heart.classList.contains("unlike")) {
            heart.classList.replace("unlike", "like");
        } else if (heart.classList.contains("like")) {
            heart.classList.replace("like", "unlike");
        };
    });


// Fonction pour le bouton HIDE

hide.addEventListener("click", (e) => {
    document.getElementById("cover").classList.toggle("visible");
    document.getElementById("cover").classList.toggle("invisible");
    document.getElementById("list").classList.toggle("taille");
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
    audio.pause();
    audio.currentTime = 0;

    if (playPauseButton.classList.contains("pause")) {
        playPauseButton.classList.replace("pause", "play");
        audio.pause();
    };
    
});


// Fonction pour les bouton PREVIOUS ET NEXT

// NEXT
fastForward.addEventListener("click", (e) => {
    let indexTrack = songArray.findIndex(e => e.url == audio.src.substring(audio.src.indexOf("Tracks")))+1;

        // LOOP ALL
    if(indexTrack > songArray.length-1 && loop.classList.contains("inactive")) {
        playPauseButton.classList.replace("pause", "play");
        audio.pause();
    } else if (playPauseButton.classList.contains("play")) {
        playPauseButton.classList.replace("play", "pause");
    } else if (indexTrack > songArray.length-1 && loop.classList.contains("active")) {
        indexTrack=0;
        audio.play()
    } if (shuffle.classList.contains("on")) {
        const j = Math.floor(Math.random() * (i + 1));

        audio.src = songArray[j].url;
        audio.play();

        albumCover.src = songArray[j].cover;
        titleLeft.textContent = songArray[j].title;
        artistLeft.textContent = songArray[j].artist;
        titleRight.textContent = songArray[j].title + "   -   " + songArray[j].artist;
        albumCoverSecond.src = songArray[j].cover;
        titleBottom.textContent = songArray[j].title;
        artistBottom.textContent = songArray[j].artist;
        songTime.textContent = songArray[j].songDuration;
    } else {
        audio.src = songArray[indexTrack].url;
        audio.play();
    
        albumCover.src = songArray[indexTrack].cover;
        titleLeft.textContent = songArray[indexTrack].title;
        artistLeft.textContent = songArray[indexTrack].artist;
        titleRight.textContent = songArray[indexTrack].title + "   -   " + songArray[indexTrack].artist;
        albumCoverSecond.src = songArray[indexTrack].cover;
        titleBottom.textContent = songArray[indexTrack].title;
        artistBottom.textContent = songArray[indexTrack].artist;
        songTime.textContent = songArray[indexTrack].songDuration;
    };
});

// PREVIOUS
rewind.addEventListener("click", (e) => {
    let indexTrack = songArray.findIndex(e => e.url == audio.src.substring(audio.src.indexOf("Tracks")))-1;

    if(indexTrack > songArray.length-1 && loop.classList.contains("inactive")) {
        playPauseButton.classList.replace("pause", "play");
        audio.pause();
    } else if (playPauseButton.classList.contains("play")) {
        playPauseButton.classList.replace("play", "pause");
    } else {
        audio.src = songArray[indexTrack].url;
        audio.play();
    
        albumCover.src = songArray[indexTrack].cover;
        titleLeft.textContent = songArray[indexTrack].title;
        artistLeft.textContent = songArray[indexTrack].artist;
        titleRight.textContent = songArray[indexTrack].title + "   -   " + songArray[indexTrack].artist;
        albumCoverSecond.src = songArray[indexTrack].cover;
        titleBottom.textContent = songArray[indexTrack].title;
        artistBottom.textContent = songArray[indexTrack].artist;
        songTime.textContent = songArray[indexTrack].songDuration;
    };
});


shuffle.addEventListener("click", (e) => {
    // let indexTrack = songArray.findIndex(e => e.url == audio.src.substring(audio.src.indexOf("Tracks")))-1;

    if (shuffle.classList.contains("off")) {
        shuffle.classList.replace("off", "on");

    } else if (shuffle.classList.contains("on")) {
        shuffle.classList.replace("on", "off");
    };
}
);


// Fonction pour le bouton LOOP

loop.addEventListener("click", (e) => {
    if (loop.classList.contains("inactive")) {
        loop.classList.replace("inactive", "active");
        audio.loop = false;
    } else if (loop.classList.contains("active")) {
        loop.classList.replace("active", "active_one");
        audio.loop = true;
    } else if (loop.classList.contains("active_one")) {
        loop.classList.replace("active_one", "inactive");
        audio.loop = false;
    };
});


