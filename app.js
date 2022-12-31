let play_icon = document.querySelector('.fa-play');
let music_image = document.querySelector('.music_image');
let music_title = document.querySelector('.music_title');
let music_audio = document.querySelector('.music_audio');
let next_btn = document.querySelector('.next_btn');
let previous_btn = document.querySelector('.previous_btn');
let sound_waves = document.querySelector('.waves');
let track_music = 0;


/* Load images and titles music from songs.js (file) */
let LoadSongs = (music) => {
    music_image.src = `./img/${music}.jpg`;
    music_title.innerHTML = music;
    music_audio.src = `./music/${music}.mp3`;
}

LoadSongs(songs[track_music].title);

/* console.log(songs.length); */

let Play = () => {
    play_icon.classList.remove('fa-play');
    play_icon.classList.add('fa-pause');
    audio.play();
    add_rotate_image_class();
    show_animate_sound_waves();
}

let Pause = () => {
    play_icon.classList.add('fa-play');
    play_icon.classList.remove('fa-pause');
    audio.pause();
    remove_rotate_image_class();
    hide_animate_sound_waves();
}

let Next = () => {
    track_music++;
    if (track_music === songs.length) {
        track_music = 0;
    }
    LoadSongs(songs[track_music].title);
    /* When clicking Next button the current music audio should stop from playing */
    Pause();
    /* Also stop image from rotate */
    remove_rotate_image_class();
}

let Previous = () => {
    if (track_music === 0) {
        track_music = songs.length;
    }
    track_music--;
    LoadSongs(songs[track_music].title);
    /* When clicking Previous button the current music audio should stop from playing */
    Pause();
    /* Also stop image from rotate */
    remove_rotate_image_class();
}


/* Rotate Image */
let add_rotate_image_class = () => {
    music_image.classList.add('rotate');
}

let remove_rotate_image_class = () => {
    music_image.classList.remove('rotate');
}


/* Show/hide music waves module */
let hide_animate_sound_waves = () => {
    sound_waves.style.visibility = "hidden";
}

let show_animate_sound_waves = () => {
    sound_waves.style.visibility = "visible";
}





/* Call Functions On Click */

document.querySelector('.play_btn').addEventListener('click', () => {
    let is_playing = play_icon.classList.contains('fa-play');
    if (is_playing) {
        Play();
    }
    else {
        Pause();
    }
});


next_btn.addEventListener('click', Next);
previous_btn.addEventListener('click', Previous);