// selectors

var tableRow = document.getElementsByTagName('tr');
var tableCell = document.getElementsByTagName('td');
var tableSlot = document.querySelector('.slot');
const playerTurn = document.querySelector('.player-turn');

for(let i=0; i < tableCell.length; i++){
    tableCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};