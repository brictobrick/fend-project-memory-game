// Global Variables
let arr = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-paper-plane-o", "fa-twitter", "fa-bolt", "fa-cube", "fa-twitter", "fa-leaf", "fa-bicycle"];
let selectedCard;
let moveNumber = 0;
const elementDeck = document.querySelector(".deck");

// Shuffle Cards: from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleCards() {
  const elementDeck = document.querySelector(".deck");
  arr = shuffle(arr);
  for (let i = 0; i <= 15; i++) {
    const newLi = document.createElement("li");
    newLi.classList.add("card");
    elementDeck.appendChild(newLi);
    const newI = document.createElement("i");
    newI.classList.add("fa");
    newI.classList.add(arr[i]);
    const elemCard = document.querySelectorAll(".card");
    elemCard[i].appendChild(newI);
  }
}

// Start Game
function startCards() {
    shuffleCards();
}

startCards();

// Restart Game
function restartCards() {

  const elementDeck = document.querySelector(".deck");
  while (elementDeck.firstChild) {
    elementDeck.removeChild(elementDeck.firstChild);
  }

  shuffleCards();
}

const restart = document.querySelector(".fa-repeat");
restart.addEventListener("click", function(evt) {
  evt.preventDefault();
  restartCards();
});

// Memory Game Logic
elementDeck.addEventListener("click", function(evt) {
  evt.preventDefault();
  const target = evt.target;
  if (target.className === "card") {

    // Move Counter
    moveNumber = moveNumber + 1;
    const moveNumberSpan = document.querySelector(".moves");
    moveNumberSpan.textContent = moveNumber;

    //Rate Stars
    const elementStars = document.querySelector(".stars");
    if (moveNumber == 25) {
      elementStars.removeChild(elementStars.childNodes[0]);
      elementStars.removeChild(elementStars.childNodes[0]);
    } else if (moveNumber == 50) {
      elementStars.removeChild(elementStars.childNodes[0]);
      elementStars.removeChild(elementStars.childNodes[0]);
    }

    // Match Cards
    target.classList.add("open");
    target.classList.add("show");
    if (selectedCard == null) {
      selectedCard = target.children[0].className.split(" ")[1];
    } else if (selectedCard == target.children[0].className.split(" ")[1]) {
      for (let i=0; i<=1; i++) {
        elementDeck.querySelectorAll(".open")[i].classList.add("match");
        elementDeck.querySelectorAll(".open")[i].classList.add("jump");
      }
      for (let i=0; i<=15; i++) {
        const elemCard = document.querySelectorAll(".card")[i];
        elemCard.classList.remove("open");
        elemCard.classList.remove("show");
      }
      selectedCard = null;
    } else {
      for (let i=0; i<=1; i++) {
        elementDeck.querySelectorAll(".open")[i].classList.add("shake");
      }
      setTimeout(function() {
        target.classList.remove("open");
        target.classList.remove("show");
        for (let i=0; i<=1; i++) {
          elementDeck.querySelectorAll(".shake")[i].classList.remove("open");
          elementDeck.querySelectorAll(".shake")[i].classList.remove("show");
        }
        target.classList.remove("shake");
        elementDeck.querySelector(".shake").classList.remove("shake");
        selectedCard = null;
      }, 400);
    }

    //Congratulations Popup
    const theNumberOfMatch = elementDeck.querySelectorAll(".match").length;
    if (theNumberOfMatch == 16) {
      Time();
      const elementContainer = document.querySelector(".container");
      while (elementContainer.firstChild) {
        elementContainer.removeChild(elementContainer.firstChild)
      }
      const htmlTextToAdd = `
        <div class="cong-container">
          <h1>Congratulations! You Won!</h1>
          <p>It takes ${moveNumber} moves and ${playTime} milliseconds!</p>
          <input type="button" onclick="window.location.reload()" value="Play Again">
        </div>`;
      elementContainer.insertAdjacentHTML('afterbegin', htmlTextToAdd);
    }
  }
});

//Start Timer
let startingTime;
elementDeck.addEventListener("click", function() {
  startingTime = performance.now();
}, {once: true});

//Ending Time
let endingTime, playTime;
const Time = function () {
  endingTime = performance.now();
  playTime = endingTime - startingTime;
}

// Stopwatch from https://codepen.io/_Billy_Brown/pen/dbJeh
