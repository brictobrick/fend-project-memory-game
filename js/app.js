(function() {
    'use strict';

    // Global Variables
    let arr = ["fa-btc", "fa-btc", "fa-whatsapp", "fa-whatsapp", "fa-tumblr", "fa-tumblr", "fa-text-width", "fa-text-width", "fa-krw", "fa-krw", "fa-windows", "fa-windows", "fa-bold", "fa-bold", "fa-twitter", "fa-twitter"];
    let selectedCard, moveNumber = 0;
    const elemDeck = document.querySelector(".deck");

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
      const elemDeck = document.querySelector(".deck");
      arr = shuffle(arr);
      for (let i = 0; i <= 15; i++) {
        const newLi = document.createElement("li");
        newLi.classList.add("card");
        elemDeck.appendChild(newLi);
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

    const restart = document.querySelector(".fa-repeat");
    restart.addEventListener("click", function(evt) {
      evt.preventDefault();
      restartCards();
    });

    // Memory Game Logic
    elemDeck.addEventListener("click", function(evt) {
      evt.preventDefault();
      const target = evt.target;
      if (target.className === "card") {

        // Move Counter
        moveNumber = moveNumber + 1;
        const moveNumberSpan = document.querySelector(".moves");
        moveNumberSpan.textContent = moveNumber;

        // Rate Stars
        const elemStars = document.querySelector(".stars");
        if (moveNumber == 25) {
          elemStars.removeChild(elemStars.childNodes[0]);
          elemStars.removeChild(elemStars.childNodes[0]);
        } else if (moveNumber == 50) {
          elemStars.removeChild(elemStars.childNodes[0]);
          elemStars.removeChild(elemStars.childNodes[0]);
        }

        // Match Cards
        target.classList.add("open");
        target.classList.add("show");
        if (selectedCard == null) {
          selectedCard = target.children[0].className.split(" ")[1];
        } else if (selectedCard == target.children[0].className.split(" ")[1]) {
          for (let i=0; i<=1; i++) {
            elemDeck.querySelectorAll(".open")[i].classList.add("match");
            elemDeck.querySelectorAll(".open")[i].classList.add("jump");
          }
          for (let i=0; i<=15; i++) {
            const elemCard = document.querySelectorAll(".card")[i];
            elemCard.classList.remove("open");
            elemCard.classList.remove("show");
          }
          selectedCard = null;
        } else {
          elemDeck.classList.add("disClick");
          for (let i=0; i<=1; i++) {
            elemDeck.querySelectorAll(".open")[i].classList.add("shake");
          }
          setTimeout(function() {
            target.classList.remove("open");
            target.classList.remove("show");
            for (let i=0; i<=1; i++) {
              elemDeck.querySelectorAll(".shake")[i].classList.remove("open");
              elemDeck.querySelectorAll(".shake")[i].classList.remove("show");
            }
            target.classList.remove("shake");
            elemDeck.querySelector(".shake").classList.remove("shake");
            selectedCard = null;
            elemDeck.classList.remove("disClick");
          }, 300);
        }

        // Congratulations Popup
        const theNumberOfMatch = elemDeck.querySelectorAll(".match").length;
        if (theNumberOfMatch == 16) {
          clearTimeout(t);
          const elementContainer = document.querySelector(".container");
          while (elementContainer.firstChild) {
            elementContainer.removeChild(elementContainer.firstChild)
          }
          const htmlTextToAdd = `
            <div class="cong-container">
              <h1>Congratulations! You Won!</h1>
              <p>It takes ${currentTime} seconds and ${moveNumber} moves!</p>
              <input type="button" onclick="window.location.reload()" value="Play Again">
            </div>`;
          elementContainer.insertAdjacentHTML('afterbegin', htmlTextToAdd);
        }
      }
    });

    // Start Timer
    elemDeck.addEventListener("click", startTimer, {once: true});
    function startTimer(evt) {
      evt.preventDefault();
      timer();
    }

    // Timer from https://jsfiddle.net/pvk6p/2996/
    const time = document.querySelector(".time");
    let seconds = 0, minutes = 0, currentTime = 0, t;

    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }

        currentTime = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        time.textContent = currentTime;

        timer();
    }

    function timer() {
        t = setTimeout(add, 1000);
    }

}());
