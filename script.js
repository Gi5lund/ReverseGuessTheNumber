"use strict";
window.addEventListener("load", start);
let guess_no=1;
let UPPER_LIMIT=100;
let LOWER_LIMIT=1;
let guess;

function start() {
  console.log("start");
 //eventlistener: sæt på listen og fang ved eventbubbling?
 document.querySelector("#guess-list").addEventListener("click", receiveInput);
 document.querySelector("#start").addEventListener("click", startGame);

}
function startGame() {
  console.log("startGame");
    document.querySelector("#start").removeEventListener("click", startGame);
  generateGuess(guess_no);
}
function receiveInput(evt) {
//evt.preventDefault();
  console.log("receiveInput");
  const clicked = evt.target;
  if(!clicked.id.includes("button")) {
    return;
  }
  const response=clicked.id.split("_")[1];
    console.log(response);
    if(response==="correct") {
      correct();
    } else if(response==="low") {
      tooLow();
    } else if(response==="high") {
      tooHigh();
    }
 

}
function tooLow() {
    // kaldes hvis gættet er for lavt, erstatter <li "knapperne" med gæt+too low
  console.log("tooLow");
  const id="#guess-"+guess_no;
    console.log(guess_no);
    const guessItem=document.querySelector(`${id} span`);
    console.log(guessItem);
  guessItem.innerHTML="-that was too low";
  
  console.log(guess_no);
  guess_no++;
  LOWER_LIMIT=guess+1;
  generateGuess(guess_no);
}
function tooHigh() {
  console.log("tooHigh");
  const id="#guess-"+guess_no;
  const guessItem=document.querySelector(`${id} span`);
    guessItem.innerHTML="-that was too high";
  
    console.log(guess_no);
    guess_no++;
    UPPER_LIMIT=guess-1;
  generateGuess(guess_no);
}
function correct() {
  console.log("Correct!!");
  document.querySelector("#response").innerHTML="I finally guessed it!";
}
function generateGuess(guess_no) {
    if(guess_no===undefined) {
      guess_no=1;
    }
  console.log("generateGuess");
  
  console.log(guess_no);
  guess=Math.floor( (UPPER_LIMIT + LOWER_LIMIT)/2);
  const list = document.querySelector("#guess-list");
  const html=`<li id="guess-${guess_no}">I'm guessing ${guess}<span>-is that <button id="button_low">Too Low</button> <button id="button_high">Too High</button><button id="button_correct">Correct!</button></span> </li>`
  list.insertAdjacentHTML("beforeend", html);
 
 receiveInput();
}