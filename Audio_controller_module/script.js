var audioWrap = $(".radio"),
  audioEl = audioWrap.find("audio"),
  audio = audioEl.get(0);

setupAudio();

function setupAudio() {
  if (audio.buffered === undefined) return;

  audioEl.addClass("inactive");
  audioWrap.append(
      '<span class="time" style="color: #000;">0:00</span>' +
      '<input type="range" class="progress" value="0" max=""/>' +
      '<button type="button" class="mute hidden"></button>' +
      '<input type="range" class="volume" value="100" max="100"/>'
  );

  audioWrap.find(".mute").on("click", $.proxy(muteSound, this));
  audioWrap.find(".progress").on("input change", $.proxy(updateProgress, this));
  audioWrap.find(".volume").on("input change", $.proxy(updateVolume, this));

  audioEl.on("timeupdate", $.proxy(updateTime, this));
}

function formatTime(time) {
  var hours = parseInt(time / (60 * 60) % 24);

  hours = hours > 0 ? padZero(hours) + ":" : "";

  return (
    hours +
    padZero(parseInt(time / 60 % 60)) +
    ":" +
    padZero(parseInt(time % 60))
  );
}

function muteSound() {
  audio.muted = true;

  audioWrap.find(".mute").addClass("muted");
  audioWrap.find(".volume").val(0);
}

function padZero(value) {
  return value < 10 ? "0" + value : value;
}

function unmuteSound() {
  audioWrap.find(".mute").removeClass("muted");
  audio.muted = false;
}

function updateProgress(e) {
  audio.currentTime = $(e.target).val();
}

function updateTime() {
  var total = formatTime(audio.duration),
      current = formatTime(audio.currentTime);

    audioWrap.find(".time").text(current);
  /* audioWrap.find(".time").text(current + '/' + total); */
  audioWrap
    .find(".progress")
    .val(audio.currentTime)
    .attr("max", audio.duration);

  if (audio.ended) {
    /* Pause audio music */
    Pause();
    /* Also stop image from rotate */
    remove_rotate_image_class();
  }
}

function updateVolume(e) {
  audio.volume = $(e.target).val() / 100;

  audio.volume === 0 ? muteSound() : unmuteSound();
}