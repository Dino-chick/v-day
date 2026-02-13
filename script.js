const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif ",    // 0 normal
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif ",  // 1 verwirrt
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif ",             // 2 flehend
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif ",             // 3 traurig
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif ",       // 4 trauriger
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif ",             // 5 am Boden zerstört
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif ",               // 6 sehr am Boden zerstört
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif "  // 7 weinend weggelaufen
]

const noMessages = [
    "Nein",
    "Bist du dir sicher? 🤔",
    "Pookie, bitte... 🥺",
    "Wenn du nein sagst, werde ich sehr traurig sein...",
    "Ich werde sehr traurig sein... 😢",
    "Bitte??? 💔",
    "Tu mir das nicht an...",
    "Letzte Chance! 😭",
    "Du kannst mich sowieso nicht fangen 😜"
]

const yesTeasePokes = [
    "versuch erst mal nein zu sagen... ich wette, du willst wissen, was passiert 😏",
    "komm, drück auf nein... nur einmal 👀",
    "da verpasst du was 😈",
    "klick auf nein, ich fordere dich heraus 😏"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Autoplay: Audio startet stumm (umgeht Browser-Richtlinie), sofort wieder einschalten
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: Stummschaltung aufheben bei erster Interaktion
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
        // Sie necken, erst mal Nein zu probieren
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

    // Durch Schuldgefühle-Nachrichten rotieren
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Ja-Button jedes Mal größer machen
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Nein-Button schrumpfen lassen als Kontrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Katzen-GIF durch Stufen wechseln
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Weglaufen startet bei Klick 5
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
