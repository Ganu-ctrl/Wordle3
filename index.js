var height = 6;
var width = 5;
var col = 0;
var row = 0;
var gameOver = false;
var words = [
  "APPLE", "BREAD", "CLOUD", "DREAM", "EAGER", "FLOOD", "GRAPE", "HEART", "ISLET", "JUMPY",
  "KINGS", "LIONS", "MELON", "NEEDS", "OCEAN", "PIZZA", "QUIET", "ROSES", "SUNNY", "TIGER",
  "VISTA", "WATER", "XENON", "YOUTH", "ZEBRA", "ALERT", "BLOSS", "CHAIN", "DAILY", "ECLIP",
  "FIGHT", "GLOWY", "HAPPY", "ISLE", "JOKER", "KITES", "LUVED", "MAGIC", "NEONS", "OPENY",
  "PINKY", "QOTED", "ROLLS", "SINKS", "TASTE", "UNITA", "VITAL", "WEIRD", "XORZY", "YAKIS"
];
var word = words[Math.floor(Math.random() * words.length)];
console.log(word);

window.onload = function() {
  initialize();
  createKeyboard();
}

function initialize() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement('span');
      tile.id = r.toString() + '-' + c.toString();
      tile.classList.add('tile');
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }
}

function createKeyboard() {
  const keyboard = document.getElementById("keyboard");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  // Create buttons for A-Z
  letters.split("").forEach(letter => {
    let button = document.createElement("div");
    button.classList.add("key");
    button.innerText = letter;
    button.addEventListener("click", () => handleKeyPress(letter));
    keyboard.appendChild(button);
  });

  // Create Enter button
  let enterKey = document.createElement("div");
  enterKey.id = "enter";
  enterKey.classList.add("key");
  enterKey.innerText = "Enter";
  enterKey.addEventListener("click", () => handleKeyPress("Enter"));
  keyboard.appendChild(enterKey);

  // Create Backspace button
  let backspaceKey = document.createElement("div");
  backspaceKey.id = "backspace";
  backspaceKey.classList.add("key");
  backspaceKey.innerText = "⌫";
  backspaceKey.addEventListener("click", () => handleKeyPress("Backspace"));
  keyboard.appendChild(backspaceKey);
}

function handleKeyPress(key) {
  if (gameOver) return;

  if (key >= "A" && key <= "Z") {
    if (col < width) {
      let currTile = document.getElementById(row.toString() + "-" + col.toString());
      if (currTile.innerText == "") {
        currTile.innerText = key;
        col += 1;
      }
    }
  } else if (key == "Backspace") {
    if (col > 0 && col <= width) {
      col -= 1;
      let currTile = document.getElementById(row.toString() + "-" + col.toString());
      currTile.innerText = "";
    }
  } else if (key == "Enter") {
    if (col == width) {
      update();
      row += 1;
      col = 0;
    }
  }

  if (!gameOver && row == height) {
    gameOver = true;
    document.getElementById("answer").innerText = word;
  }
}

document.addEventListener("keyup", (e) => {
  if (gameOver) return;
  
  if (e.code >= "KeyA" && e.code <= "KeyZ") {  
    if (col < width) {
      let currTile = document.getElementById(row.toString() + "-" + col.toString());
      if (currTile.innerText == "") {
        currTile.innerText = e.code[3]; // extracts the letter from "KeyX"
        col += 1;
      }
    }
  } else if (e.code == "Backspace") {
    if (col > 0 && col <= width) {
      col -= 1;
      let currTile = document.getElementById(row.toString() + "-" + col.toString());
      currTile.innerText = "";
    }
  } else if (e.code == "Enter") {
    if (col == width) {
      update();
      row += 1;
      col = 0;
    }
  }

  if (!gameOver && row == height) {
    gameOver = true;
    document.getElementById("answer").innerText = word;
  }
});

function update() {
  let correct = 0;
  
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currTile.innerText;
    if (letter == word[c]) {
      currTile.classList.add("correct");
      correct += 1;
    } else if (word.includes(letter)) {
      currTile.classList.add("present");
    } else {
      currTile.classList.add("absent");
    }
  }
  
  if (correct == width) {
    gameOver = true;
    alert("Congratulations, you are the champion!");
  } else if (row == height - 1 && col == width) {
    gameOver = true;
    alert("You lost! The word was " + word);
  }
}
