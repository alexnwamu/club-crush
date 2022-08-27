document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".gamegrid");
  const manU = "url(./images/manu.jpg)";
  const psg = "url(./images/psg.jpg)";
  const madrid = "url(./images/madrid.jfif)";
  const barca = "url(./images/barca.jfif)";
  const chelsea = "url(./images/chelsea.jfif)";
  const width = 8;
  const squares = [];
  const clubColors = [manU, psg, madrid, chelsea, barca];
  const createBoard = () => {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomClub = Math.floor(Math.random() * clubColors.length);
      square.style.backgroundImage = clubColors[randomClub];
      grid.appendChild(square);
      squares.push(square);
    }
  };

  createBoard();
let clubBeingDragged;
let clubBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced
let score = 0;
scoreDisplayed = document.getElementById('score');


  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
 clubBeingDragged = this.style.backgroundImage
 squareIdBeingDragged = parseInt(this.id)
 console.log(clubBeingDragged)
  }
  function dragOver(e) {
    e.preventDefault();
    
  }
  function dragEnter(e) {
    e.preventDefault();
   
  }
  function dragLeave() {
    this.style.backgroundImage = ''
  }
  function dragEnd() {
   let allowedMoves = [squareIdBeingDragged -1, squareIdBeingDragged - width, squareIdBeingDragged +1,squareIdBeingDragged +width]
   let allowedMove = allowedMoves.includes(squareIdBeingReplaced)
   if(squareIdBeingReplaced && allowedMove){
    squareIdBeingReplaced = null
   }else if (squareIdBeingReplaced && !allowedMove){
    squares[squareIdBeingReplaced].style.backgroundImage = clubBeingReplaced
    squares[squareIdBeingDragged].style.backgroundImage = clubBeingDragged
   } else squares[squareIdBeingDragged].style.backgroundImage = clubBeingDragged

  }
  function dragDrop() {
    clubBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = clubBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = clubBeingReplaced
  }
function moveDown(){
  for(i =0; i<55; i++){
    if (squares[i + width].style.backgroundImage === ''){
      squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
      squares[i].style.backgroundImage = ''
      const firstRow =[0,1,2,3,4,5,6,7]
      const isFirstRow = firstRow.includes(i)
      if (isFirstRow && squares[i].style.backgroundImage === ''){
        let randomClub =Math.floor(Math.random()*clubColors.length)
        squares[i].style.backgroundImage = clubColors[randomClub]
      }
    }

  }
}


//Checking for matches

function checkRowForThree()
{
    for(i=0; i <61; i++){
        let rowOfThree = [i, i+1,i+2]
        let decidedClub = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage===''
        const notALlowed =[6,7,14,15,22,23,30,31,38,39,46,47,54,55]
        if(notALlowed.includes(i)) continue
        if(rowOfThree.every(index =>squares[index].style.backgroundImage === decidedClub && !isBlank)){   score += 3
          scoreDisplayed.innerHTML = score
            rowOfThree.forEach(index =>{
                squares[index].style.backgroundImage = ''
            })
        }
    }
} 


function checkColumnForThree()
{
    for(i=0; i < 47; i++){
        let columnOfThree = [i, i+width,i+width*2]
        let decidedClub = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage===''

        if(columnOfThree.every(index =>squares[index].style.backgroundImage === decidedClub && !isBlank)){   score += 3
          scoreDisplayed.innerHTML = score
            columnOfThree.forEach(index =>{
                squares[index].style.backgroundImage = ''
            })
        }
    }
} 

window.setInterval(function(){
 moveDown()
  checkRowForThree()
  checkColumnForThree()
},100)


});
