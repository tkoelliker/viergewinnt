// START CHANGE AVATAR

//Variablen definieren
var cardText = "Löwe"; //global var, Text auswählen, welcher Inhalt die Select Box hat von Player 1
var cardTextP2 = 'Elefant'; //global var, Text auswählen, welcher Inhalt die Select Box hat von Player 2
var valueSloganP1 = 'Königlich gut'; //global var, Text auswählen, welcher Inhalt der Slogan hat von Player 1
var valueSloganP2 = 'Gross eifern'; //global var, Text auswählen, welcher Inhalt der Slogan hat von Player 2

let player1img = document.getElementById("cardImg").getAttribute("src"); // Hintergrundbild für spiel definieren
let player2img = document.getElementById("cardImgP2").getAttribute("src"); // Hintergrundbild für spiel definieren


function ddlselect(selectObject) {
    // START PLAYER 1
    var d = document.getElementById('ddselect'); // Add Element mit der ID 'ddselect'  //Quelle: https://www.youtube.com/watch?v=WNLC2b5AVIE
    cardText = d.options[d.selectedIndex].text; //Text auswählen, welcher Inhalt die Select Box hat Player 1

    const $select = document.querySelector('#ddselect'); //schaut, welche Option gerade ausgewählt ist (Player 1) in der DropDown List //Quelle: https://alvarotrigo.com/blog/javascript-select-option/

    if (cardText == cardTextP2) { //schaut, ob das Tier bereits bei Player 2 auftritt. Wenn ja, dann wechselt er das Tier auf das Standardtier Löwe
        cardText = 'Löwe';
        valueSloganP2 = 'Königlich gut';
        $select.value = 'Königlich gut'
        alert('Du hast das gleiche Tier ausgewählt wie der/die andere Spieler:in. Bitte wähle ein anderes Tier aus');      
    } else { //wenn nicht, geschieht nichts, Tier kann gewählt werden

    }

    valueSloganP1 = document.getElementById("ddselect").value; //value des Dropdown definieren (value='xxx') Player 1
    txtvalueP1.innerHTML = valueSloganP1; //Text des Dropdown definieren Player 1
    document.getElementById("cardImg").src="img/icon/"+cardText+".svg"; //Bild des Tier anpassen Player 1
    // END PLAYER 1

    // START PLAYER 2
    var d2 = document.getElementById('ddselectP2'); // global var, Element mit der ID 'ddselectP2' hinzufügen, Player 2
    cardTextP2 = d2.options[d2.selectedIndex].text; //Text auswählen, welcher Inhalt die Select Box hat Player 2

    const $selectP2 = document.querySelector('#ddselectP2'); //schaut, welche Option gerade ausgewählt ist (Player 2) in der DropDown List //Quelle: https://alvarotrigo.com/blog/javascript-select-option/
   
    if (cardTextP2 == cardText) { //schaut, ob das Tier bereits bei Player 1 auftritt. Wenn ja, dann wechselt er das Tier auf das Standardtier Elefant

        cardTextP2 = 'Elefant';
        valueSloganP2 = 'Gross eifern';
        $selectP2.value = 'Gross eifern'
        alert('Du hast das gleiche Tier ausgewählt wie der/die andere Spieler:in. Bitte wähle ein anderes Tier aus');        
    } else { //wenn nicht, geschieht nichts, Tier kann gewählt werden

    }

    valueSloganP2 = document.getElementById("ddselectP2").value; //value des Dropdown definieren (value='xxx')
    txtvalueP2.innerHTML = valueSloganP2; //Text des Dropdown definieren
    document.getElementById("cardImgP2").src="img/icon/"+cardTextP2+".svg"; //icon wechseln nach gewähltem Tier
    // END PLAYER 2
    player1img = document.getElementById("cardImg").getAttribute("src"); // Hintergrundbild für Spiel neu definieren
    player2img = document.getElementById("cardImgP2").getAttribute("src");
}

// END CHANGE AVATAR


// START JS-CODE FOR CONNECTFOUR

// selectors

var tableRow = document.getElementsByTagName('tr');
var tableCell = document.getElementsByTagName('td');
var tableSlot = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.player-turn');
const resetBtn = document.querySelector('.reset');
let confe = document.querySelector('#my-canvas'); // Confetti
// ***Kommentar noch einsetzen***** 
for(let i=0; i < tableCell.length; i++){
    tableCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};

//Namen durch Prompt anfragen setzten, Figur wird durch Reihenfolge gesetzt
while(!player1){
    var player1 = prompt('Namen Spieler:in 1. Du wirst die braune Farbe haben.');
} 
player1Color = '#BA671C';
//console.log(player1img.getAttribute("src"));
console.log(player1) // Player 1 gesetzt als Löwe
console.log('player1img: ' + player1img);






while(!player2){
    var player2 = prompt('Namen Spieler:in 2. Du wirst die grüne Farbe haben');
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


// start confetti plugin
    var confettiSettings = { target: 'my-canvas' };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
// end confetti

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
                row[0].style.backgroundImage = `url('${player1img}')`; //fügt Hintergrundbild ein
                row[0].style.backgroundRepeat = "no-repeat";
                row[0].style.backgroundPosition = "center";
                if (horizontalCheck()|| verticalCheck()|| diagonalCheckUp()||diagonalCheckDown()){ //wenn einer der Checks (horizontal or vertical or diagonal) erfüllt ist und true zurück kommt wird winner ausgegeben 
                    
                    playerTurn.textContent=`${player1} hat gewonnen!`;
                    confe.classList.add('active'); //einfügen Confetti-Look
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
                row[0].style.backgroundImage = `url('${player2img}')`; //fügt Hintergrundbild ein
                row[0].style.backgroundRepeat = "no-repeat";
                row[0].style.backgroundPosition = "center";
                if (horizontalCheck()|| verticalCheck()|| diagonalCheckUp()||diagonalCheckDown()){ //wenn einer der Checks true wird winner ausgegeben (horizontal or vertical or diagonal)
                    playerTurn.textContent=`${player2} hat gewonnen!`;
                    confe.classList.add('active'); //einfügen Confetti-Look
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
resetBtn.addEventListener('click', () => {
    tableSlot.forEach(slot=> {
        slot.style.backgroundColor = 'white';
        slot.style.backgroundImage = '';
    });
    playerTurn.style.Color='black';
    confe.classList.remove('active'); // Reset Confetti-Look
    return(currentPlayer ===1 ? playerTurn.textContent = `${player1}s Zug!`: playerTurn.textContent = `${player2}s Zug!`); // Beginn wieder von vorne
})

// END JS-CODE FOR CONNECTFOUR





//START Zeitanzeige
const anzeige = document.getElementById("zeitanzeige");

var gestoppteZeit = 0;
var pausiert = true;
var letzterDurchlauf = new Date(); // Zeitpunkt jetzt in Milisekunden

function start() {
    pausiert = false;
}
function pause() {
    pausiert = true;
}
function reset_timer() {
    pausiert = true;
    gestoppteZeit = 0;
    aktualisiereAnzeige();
}

function aktualisiereZeit() {
    if(pausiert === false) {
        gestoppteZeit += new Date() - letzterDurchlauf;
        aktualisiereAnzeige();
    }
    letzterDurchlauf = new Date();
    setTimeout(aktualisiereZeit, 1);
}

function aktualisiereAnzeige(){
    let millisekunden = gestoppteZeit % 1000;
    let sekunden = Math.floor(gestoppteZeit / 1000) % 60;
    let minuten = Math.floor(gestoppteZeit / 60000) % 60;
    let stunden = Math.floor(gestoppteZeit / 3600000);

    stunden = stunden < 10 ? "0" + stunden : stunden;
    minuten = minuten < 10 ? "0" + minuten : minuten;
    sekunden = sekunden < 10 ? "0" + sekunden : sekunden;
    millisekunden = "000" + millisekunden;
    millisekunden = millisekunden.slice(millisekunden.length - 3);

    anzeige.innerHTML = stunden + ":" + minuten + ":" + sekunden + "." + millisekunden;
}
aktualisiereZeit(); 



