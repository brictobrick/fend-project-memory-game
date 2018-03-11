// a list that holds all of your cards

let arr = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-paper-plane-o", "fa-twitter", "fa-bolt", "fa-cube", "fa-twitter", "fa-leaf", "fa-bicycle"];
let selectedCard;
const deck = document.querySelector(".deck");

// Shuffle function from http://stackoverflow.com/a/2450976
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function shuffleCards() {
  arr = shuffle(arr);
  for (let i = 0; i <= 15; i++) {
    const newLi = document.createElement("li");
    newLi.classList.add("card");
    deck.appendChild(newLi);
    const newI = document.createElement("i");
    newI.classList.add("fa");
    newI.classList.add(arr[i]);
    const card = document.querySelectorAll(".card");
    card[i].appendChild(newI);
  }
}

function startCards() {
    shuffleCards();
}

startCards();

function restartCards() {

  const element = document.querySelector(".deck");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  shuffleCards();

}

const restart = document.querySelector(".fa-repeat");
restart.addEventListener("click", function(evt) {
  evt.preventDefault();
  restartCards();
});

deck.addEventListener("click", function(evt) {
  evt.preventDefault();
  const target = evt.target;
  target.classList.add("open");
  target.classList.add("show");
  if (selectedCard == null) {
    selectedCard = target.querySelector(".fa").className;
  } else if (selectedCard == target.querySelector(".fa").className){
    const firstSelectedCard = deck.getElementsByClassName(selectedCard)[0];
    const secondSelectedCard = deck.getElementsByClassName(selectedCard)[1];
    firstSelectedCard.parentElement.classList.add("match");
    firstSelectedCard.parentElement.classList.remove("open");
    firstSelectedCard.parentElement.classList.remove("show");
    secondSelectedCard.parentElement.classList.add("match");
    secondSelectedCard.parentElement.classList.remove("open");
    secondSelectedCard.parentElement.classList.remove("show");
    selectedCard = null;
  } else {
    const firstSelectedCard = deck.getElementsByClassName(selectedCard)[0];
    const secondSelectedCard = deck.getElementsByClassName(selectedCard)[1];
    setTimeout(function() {
      firstSelectedCard.parentElement.classList.remove("open");
      firstSelectedCard.parentElement.classList.remove("show");
      secondSelectedCard.parentElement.classList.remove("open");
      secondSelectedCard.parentElement.classList.remove("show");
      target.classList.remove("open");
      target.classList.remove("show");
    }, 800);
    selectedCard = null;
  }
});
