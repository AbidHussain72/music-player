let playList = document.querySelector(".playList")

let totalSong = playList.children.length

let interval
let audioSource = document.querySelector(".audioSource")

let defaultVolume = 0.3
let volumeControl = document.querySelector(".volume-control")
volumeControl.value = defaultVolume

let songBar = document.querySelector(".songBar")

songBar.value = 0

let currentSong = 0

let playSong = document.querySelector(".play")
let stopSong = document.querySelector(".stop")
let pauseSong = document.querySelector(".pause")
let songTime = document.querySelector("#time")
let secTime = document.querySelector("#secTime")
let minTime = document.querySelector("#minTime")
let title = document.querySelector(".musicTitle")
let volValue = document.querySelector(".volumeValue")
let volumeUp = document.querySelector(".fa-volume-up")

init()
playList.addEventListener("click", function (e) {
  let path = e.target.getAttribute("path")
  song(path)
  play()
})

playList.addEventListener("click", (en) => {
  let name = en.target.textContent
  title.textContent = name
})
function song(path) {
  audioSource.src = path
}

function songTitle(name) {
  title.innerHTML = name
}
function init() {
  audioSource.src = playList.children[currentSong].getAttribute("path")
}

function play() {
  audioSource.play()
  playSong.style.color = "#0466c8"
  stopSong.style.color = "#000"
  pauseSong.style.color = "#000"
  title.textContent = playList.children[currentSong].textContent
  interval = setInterval(update_seeker, 20)
}
function pause() {
  audioSource.pause()
  pauseSong.style.color = "#0466c8"
  playSong.style.color = "#000"
  stopSong.style.color = "#000"
  clearInterval(interval)
}

function stop() {
  audioSource.pause()
  playSong.style.color = "#000"
  stopSong.style.color = "#0466c8"
  pauseSong.style.color = "#000"
  audioSource.currentTime = 0
  songBar.value = 0
  clearInterval(interval)
}
let mute = (e) => {
  volumeUp.classList.toggle("fa-volume-mute")
  volumeUp.classList.toggle("fa-volume-up")
  if (volumeUp.classList.contains("fa-volume-mute")) {
    audioSource.volume = 0
  } else {
    audioSource.volume = 0.4
  }
}
let next = () => {
  currentSong += 1

  if (currentSong > totalSong - 1) {
    currentSong = 0
  }
  init()
  play()
}

let prev = () => {
  currentSong -= 1
  if (currentSong < 0) {
    currentSong = totalSong - 1
  }
  init()
  play()
}

function volume(e) {
  let newVolume = e.target.value
  audioSource.volume = newVolume
  volValue.textContent = Math.floor(audioSource.volume * 100)
}

function seek(e) {
  audioSource.currentTime = (e.target.value / 100) * audioSource.duration
}

function update_seeker() {
  songBar.value = (audioSource.currentTime / audioSource.duration) * 100
}

audioSource.addEventListener("timeupdate", (event) => {
  // console.log(event)
  const { currentTime, duration } = event.srcElement

  const nin_duration = Math.floor(duration / 60)
  let sec_duration = Math.floor(duration % 60)

  let totalDuration = `${nin_duration}:${sec_duration}`
  if (duration) {
    minTime.textContent = totalDuration
  }
  let minCurrentDuration = Math.floor(currentTime / 60)
  let secCurrentDuration = Math.floor(currentTime % 60)
  // console.log(minCurrentDuration)
  // console.log(secCurrentDuration)
  // console.log(sec_duration)

  let totalCurrentTime = `${minCurrentDuration}:${secCurrentDuration}`
  secTime.textContent = totalCurrentTime
})
