const screens = document.querySelectorAll('.screen');
const choose_politician_btns = document.querySelectorAll('.choose-politician-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_politician = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_politician_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_politician = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createPolitician, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createPolitician() {
    const politician = document.createElement('div')
    politician.classList.add('politician')
    const { x, y } = getRandomLocation()
    politician.style.top = `${y}px`
    politician.style.left = `${x}px`
    politician.innerHTML = `<img src="${selected_politician.src}" alt="${selected_politician.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`


    politician.addEventListener('click', catchPolitician)

    game_container.appendChild(politician)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchPolitician() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addPoliticians()
}

function addPoliticians() {
    setTimeout(createPolitician, 1000)
    setTimeout(createPolitician, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}