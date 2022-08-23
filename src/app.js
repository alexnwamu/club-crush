document.addEventListener('DOMContentLoaded',()=>{
const grid = document.querySelector('.gamegrid');

const width = 8;
const squares = []
const clubColors = [
    'url(./images/manu.jpg)','url(./images/psg.jpg)','url(./images/madrid.jfif)','url(./images/chelsea.jfif)'
];
const createBoard = ()=> {
for(let i =0; i < width*width; i++) {
const square = document.createElement('div')
let randomClub = Math.floor(Math.random()*clubColors.length);
square.style.backgroundImage = clubColors[randomClub]
grid.appendChild(square)
squares.push(square)
}
}

createBoard();



})