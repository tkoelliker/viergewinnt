
// START JS-CODE FOR CONNECTFOUR

// selectors

var tableRow = document.getElementsByTagName('tr');
var tableCell = document.getElementsByTagName('td');
var tableSlot = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.player-turn');
const reset = document.querySelector('.reset');
// ***Kommentar noch einsetzen***** 
for(let i=0; i < tableCell.length; i++){
    tableCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};

//Namen durch Prompt anfragen setzten, Figur wird durch Reihenfolge gesetzt
while(!player1){
    var player1 = prompt('Namen Spieler:in 1. Du wirst Spieler 1, der Löwe, sein');
} 
player1Color = '#BA671C';
console.log(player1) // Player 1 gesetzt als Löwe

while(!player2){
    var player2 = prompt('Namen Spieler:in 2. Du wirst Spieler 2, der Elefant, sein');
} 
player2Color = '#8BAB23';
console.log(player2) // Player 2 gesetzt als Elefant

// ***Kommentar noch einsetzen***** 
player1Name = document.getElementById("player1Avatar").innerHTML= `${player1}`;
player2Name = document.getElementById("player2Avatar").innerHTML= `${player2}`;

//Status beim Beginn des Spieles
var currentPlayer =1;
playerTurn.textContent = `${player1}s Zug!`;

//jeder Slot hat zuerst die Farbe Weiss als Hintergrund
Array.prototype.forEach.call(tableCell, (cell) =>{
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white'; //damit der Hintergrund sicher weiss ist der einzelnen Zellen

})

//eigentliches Spiel, so dass die Farben der einzelnen Slots durch das klicken geändert wird
function changeColor(e){
    let column = e.target.cellIndex; //Immer wenn man auf eine Zelle klickt, setzt es den Index
    let row = [];

    for (let i = 5; i>-1; i--){ //man startet bei 5 damit die unterste Reihe zuerst geprüft wird, danach geht es nach "oben"
        if (tableRow[i].children[column].style.backgroundColor =='white'){ //überprüft ob die Hintergrundfarbe weiss ist oder die gleiche wie die eines Spielers
            row.push(tableRow[i].children[column]);

            //Schleife für Spieler 1
            if(currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color; //wenn es Spieler:in 1 ist wird der erste Index des Array in die Spielerfarbe gewechselt und danach zu Spieler 2 gewechslet
                if (horizontalCheck()|| verticalCheck()|| diagonalCheckUp()||diagonalCheckDown()){ //wenn einer der Checks (horizontal or vertical or diagonal) erfüllt ist und true zurück kommt wird winner ausgegeben 
                    playerTurn.textContent=`${player1} hat gewonnen!`;
                    playerTurn.style.color=player1Color; // die Farbe von Spieler 1 wird übernommen, da gewonnen
                    return(alert(`${player1} hat gewonnen!!`));
                }else if(drawCheck()){ //wenn kein Feld mehr weiss ist, aber weder horizontal, vertical oder diagonal Checks true ist muss es ein Unentschieden sein. Ausgabe dass es Unentschieden ist
                    playerTurn.textContent ='Es endet unentschieden!';
                    return alert('Unentschieden');
                }
                else {
                    playerTurn.textContent = `${player2}s Zug!`;
                    return currentPlayer = 2; //wechselt zu Spieler zwei (wenn Spieler 1 nicht gewonen oder unentschieden gemacht hat)
                }
            }
            else{ //wenn es nicht Spieler:in 1 ist wechselt es zu der Farbe von Spieler:in 2
                row[0].style.backgroundColor =player2Color;
                if (horizontalCheck()|| verticalCheck()|| diagonalCheckUp()||diagonalCheckDown()){ //wenn einer der Checks true wird winner ausgegeben (horizontal or vertical or diagonal)
                    playerTurn.textContent=`${player2} hat gewonnen!`;
                    playerTurn.style.color=player2Color;
                    return(alert(`${player2} hat gewonnen!!`));
                }else if(drawCheck()){
                    playerTurn.textContent ='Es endet unentschieden!';
                    return alert('Unentschieden');
                }
                playerTurn.textContent = `${player1}s Zug!`
                return currentPlayer = 1; //wechselt wieder zurück zu Spieler 1
            }
        }

    }
}

//Funktion zur Gewinnprüfung (Feld 1 - 4 müssen dieselbe Farbe haben, aber nicht weiss). Diese Funktion wird bei den einzelnen Richtungen jeweils übernommen
function colorMatchCheck (one, two, three, four){
    return(one == two && one === three && one === four && one !== 'white');
}

//horizontaler Check
// ***Kommentar noch einsetzen***** 
function horizontalCheck(){
    for(let row = 0; row < tableRow.length; row++){
        for (let col = 0; col < 4; col++){
            if(colorMatchCheck (tableRow[row].children[col].style.backgroundColor,
                tableRow[row].children[col+1].style.backgroundColor, 
                tableRow[row].children[col+2].style.backgroundColor, 
                tableRow[row].children[col+3].style.backgroundColor)){
                    return true; //
                }
        }

    }
}

//vertikaler Check
function verticalCheck(){
        for (let col = 0; col < 7; col++){
            for(let row=0; row<3; row++){// da man in jeder Reihe drei Mal gewinnen könnte vertikal ist es <3
                if(colorMatchCheck (tableRow[row].children[col].style.backgroundColor,
                tableRow[row+1].children[col].style.backgroundColor, 
                tableRow[row+2].children[col].style.backgroundColor, 
                tableRow[row+3].children[col].style.backgroundColor)){
                    return true;
            } 
            
                
                }

    }
}
//diagonaler Check aufwärts
function diagonalCheckUp(){
    for(let col = 0; col < 4; col++){ //Da es Diagonal vier Mal Platz hätte: col <4
        for (row = 0; row<3; row++){
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
                tableRow[row+1].children[col+1].style.backgroundColor,
                tableRow[row+2].children[col+2].style.backgroundColor,
                tableRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
        }
    }
}

//diagonaler Check abwärts
function diagonalCheckDown(){
    for(let col = 0; col < 4; col++){
        for (row = 5; row>2; row--){
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
                tableRow[row-1].children[col+1].style.backgroundColor,
                tableRow[row-2].children[col+2].style.backgroundColor,
                tableRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
                }
        }
    }
}

//wenn alles ausgefüllt ist = unentschieden
function drawCheck(){
    let fullSlot = [];
    for (let i = 0; i< tableCell.length; i++){
        if(tableCell[i].style.backgroundColor !== 'white'){
            fullSlot.push(tableCell[i]);
        }
    }
    if (fullSlot.length === tableCell.length){
        return true;
    }
}

//Resetknopf
reset.addEventListener('click', ()=>{
    tableSlot.forEach(slot=> {
        slot.style.backgroundColor = 'white';
    });
    playerTurn.style.Color='black';
    return(currentPlayer ===1 ? playerTurn.textContent = `${player1}s Zug`: playerTurn.textContent = `${player2}s Zug`); // Beginn wieder von vorne
})

// END JS-CODE FOR CONNECTFOUR