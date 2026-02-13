<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Willst du mein Valentin sein? ❤️</title>

<style>
body {
    margin: 0;
    background: linear-gradient(135deg, #2b0000, #111);
    font-family: Arial, sans-serif;
    color: white;
    text-align: center;
    overflow: hidden;
}

.container {
    position: relative;
    top: 45%;
    transform: translateY(-50%);
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
}

img {
    width: 220px;
    transition: opacity 0.2s ease;
}

.buttons {
    margin-top: 25px;
}

button {
    font-size: 20px;
    padding: 18px 45px;
    margin: 10px;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    transition: 0.2s;
}

#yes-btn {
    background-color: crimson;
    color: white;
}

#no-btn {
    background-color: #333;
    color: white;
}

#music-toggle {
    position: fixed;
    top: 15px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
}

#tease-toast {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.8);
    padding: 12px 25px;
    border-radius: 30px;
    opacity: 0;
    transition: 0.3s;
}

#tease-toast.show {
    opacity: 1;
}
</style>
</head>

<body>

<div id="music-toggle" onclick="toggleMusic()">🔊</div>

<div class="container">
    <h1>Willst du mein Valentin sein? ❤️</h1>
    <img id="cat-gif" src="https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif">
    
    <div class="buttons">
        <button id="yes-btn" onclick="handleYesClick()">Ja ❤️</button>
        <button id="no-btn" onclick="handleNoClick()">Nein</button>
    </div>
</div>

<div id="tease-toast"></div>

<audio id="bg-music" loop>
    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
</audio>

<script>

const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
]

const noMessages = [
    "Nein",
    "Bist du dir wirklich sicher? 🤔",
    "Bitteee... 🥺",
    "Wenn du Nein sagst, bin ich traurig...",
    "Ich bin dann richtig traurig 😢",
    "Bitte??? 💔",
    "Tu mir das nicht an...",
    "Letzte Chance! 😭",
    "Du kannst mich sowieso nicht fangen 😜"
]

const yesTeasePokes = [
    "Sag erst mal Nein... ich wette, du willst wissen was passiert 😏",
    "Komm schon, klick einmal auf Nein 👀",
    "Du verpasst was 😈",
    "Klick Nein, ich trau mich 😏"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Autoplay-Trick
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
</script>

</body>
</html>
