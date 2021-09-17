const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const fadeBtn = document.getElementById('fade');
const dvdBtn = document.getElementById('dvd');
const clearEl = document.getElementById('clear');
const dvdBox = document.querySelector('.dvd');
const canvas_container = document.querySelector('.canvas_container');
const fadeText = document.querySelector('#fade span');
const sizeEL = document.getElementById('size');

let can = document.createElement('canvas')
can.id = "canvas"
can.width = window.innerWidth - 20
can.height = window.innerHeight - 20
canvas_container.appendChild(can)

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
// let gradient = ctx.createLinearGradient(20,0, 220,0);
// gradient.addColorStop(0, 'green');
// gradient.addColorStop(.5, 'cyan');
// gradient.addColorStop(1, 'green');
// ctx.fillStyle = gradient;
// ctx.fillRect(20, 20, 200, 100);
let colors = ["#5fdafb", "#ee78fd", "#b993ff", "#85ffb8", "#fdff97"]

let size = 10
let isPressed = false
let color;
let x
let y
function colorFull(){
    return Math.floor(Math.random() * 5)
}

let fadeState = true

fadeBtn.addEventListener('click', ()=> {
    fadeState = !fadeState;
    if(fadeState){
        fadeText.innerHTML = "on"
    }else{
        fadeText.innerHTML = "off"
    }
})

function fadeOn(){
    if(fadeState){
        setTimeout(()=>{canvas.style.opacity = 0,canvas.style.transition = "0.5s" },500)
        setTimeout(()=>{ctx.clearRect(0,0, canvas.width, canvas.height),canvas.style.opacity = 1 },1000)
    }else{
        return null;
    }
}
dvdBtn.addEventListener('click', dvdHide)

function dvdHide(){
    dvdBox.classList.toggle('hideMain')
}

let dvdTime;

canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    // color = `rgb(${ 50 + (colorFull() * 5)}, ${ (150 + colorFull() * 5)}, ${(150 + colorFull() * 10)})`
    color = colors[colorFull()]
    x = e.offsetX
    y = e.offsetY
    dvdBox.classList.add('hide');
    clearTimeout(dvdTime)
})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false
    x = undefined
    y = undefined
    fadeOn()
    dvdTime = setTimeout(()=>{dvdBox.classList.remove('hide')}, 6000)
  
})
canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY
        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)
        x = x2
        y = y2
    }
})



function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}
function updateSizeOnScreen() {
    sizeEL.innerText = size
}
increaseBtn.addEventListener('click', () => {
    size += 5
    if(size > 50) {size = 50}
    updateSizeOnScreen()
})
decreaseBtn.addEventListener('click', () => {
    size -= 5
    if(size < 5) {size = 5}
    updateSizeOnScreen()
})
clearEl.addEventListener('click', () => ctx.clearRect(0,0, canvas.width, canvas.height))