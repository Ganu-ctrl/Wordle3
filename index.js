var height=6;
var width=5;
var col=0;
var row=0;
var gameOver=false;
var words = [
    "APPLE", "BREAD", "CLOUD", "DREAM", "EAGER", "FLOOD", "GRAPE", "HEART", "ISLET", "JUMPY",
    "KINGS", "LIONS", "MELON", "NEEDS", "OCEAN", "PIZZA", "QUIET", "ROSES", "SUNNY", "TIGER",
    "VISTA", "WATER", "XENON", "YOUTH", "ZEBRA", "ALERT", "BLOSS", "CHAIN", "DAILY", "ECLIP",
    "FIGHT", "GLOWY", "HAPPY", "ISLE", "JOKER", "KITES", "LUVED", "MAGIC", "NEONS", "OPENY",
    "PINKY", "QOTED", "ROLLS", "SINKS", "TASTE", "UNITA", "VITAL", "WEIRD", "XORZY", "YAKIS"
  ];
  var word=words[Math.floor(Math.random()*words.length)];
  console.log(word);
window.onload=function(){
    initialize();
}
function initialize(){
    for(let r=0;r<height;r++)
      {
        for(let c=0;c<width;c++)
          {
            let tile=document.createElement('span');
            tile.id=r.toString()+ '-' + c.toString();
            tile.classList.add('tile');
            tile.innerText="";
            document.getElementById("board").appendChild(tile);
            
          }
        }
        
        const keyboard = document.getElementById("keyboard");
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        
        // Create buttons for A-Z
        letters.split("").forEach(letter => {
          let button = document.createElement("div");
          button.classList.add("key");
          button.innerText = letter;
          
          keyboard.appendChild(button);
          button.id="Key"+letter;
          
          button.addEventListener("click",processKey)
    });
  
    // Create Enter button
    let enterKey = document.createElement("div");
    enterKey.classList.add("key");
    enterKey.innerText = "Enter";
  
    keyboard.appendChild(enterKey);
    enterKey.id="Enter";
    
  
    // Create Backspace button
    let backspaceKey = document.createElement("div");
    backspaceKey.classList.add("key");
    backspaceKey.innerText = "⌫";

    keyboard.appendChild(backspaceKey);
    backspaceKey.id="Backspace";

    enterKey.addEventListener("click",processKey)
    backspaceKey.addEventListener("click",processKey)

    }


document.addEventListener("keyup",(e)=>{
 processInput(e)
})
function processInput(e)
{
  if(gameOver) return;    
      if(e.code>="KeyA" && e.code<="KeyZ")
      {  
          if(col<width)
              {
                 let currTile=document.getElementById(row.toString() + "-" + col.toString());
                    if(currTile.innerText=="")
                    {
                      currTile.innerText=e.code[3];
                      col+=1;
                    }
              }
          
  
      }
      else if(e.code=="Backspace")
      {
          if(0<col && col<=width)
          {
          col=col-1;
          let currTile=document.getElementById(row.toString() + "-" + col.toString());
          currTile.innerText="";
          }
          
      }
      else if(e.code=="Enter")
      {
         if(col==width){
          update();
          row+=1;
          col = 0;
         }
          
  
  
      }
     
  
      if(!gameOver && row==height)
      {
          gameOver=true;
          document.getElementById("answer").innerText=word;
      }
  
}
function processKey()
{
  let e ={"code":this.id}
  processInput(e);
}



function update()
{
    let correct=0;
   
    for(let c=0;c<width;c++){
        let currTile=document.getElementById(row.toString() + "-" + c.toString());
        let letter=currTile.innerText;
    if(letter==word[c])
    {
        
        currTile.classList.add("correct");
        correct+=1;
    }
    else if(word.includes(letter))
    {
        currTile.classList.add("present");
    }
    else{
        currTile.classList.add("absent");
    }
    if(correct==width)
    {
        gameOver=true;
        alert("Congradulations you are the champion");
    }
    
}
 if(correct !=width && row==height-1 && col==width){
    gameOver=true;
    alert("You lost! the word was "+word);
}
}
