"use strict";

//^ Selecting element
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0"); //* 😂 متنساش الـ# علشان انا كمان كنت بنساه
const score1El = document.getElementById("score--1"); //* أصلاً id لكن هنا مش بنحط الـ# لان الخاصية هنا مخصصىة للـ
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold ");

let scores, currentScore, activePlayer, playing;
//* scope كان لازم نعرفهم برا الاول لاننا لو معملناش كدة مكانوش هيشتغلوا ف الفانكشن بسبب الـ
//* جوا الفانكشن mutate ف كان الحل اننا نعرفهم برا ونعمل ليهم
//* وبكدة نقدر نستخدم المتغيرات دي

//^ Starting Conditions
const init = function () {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;

   score0El.textContent = 0;
   score1El.textContent = 0;
   current0El.textContent = 0;
   current1El.textContent = 0;

   diceEl.classList.add("hidden");
   player0El.classList.remove("player--winner");
   player1El.classList.remove("player--winner");
   player0El.classList.add("player--active");
   player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   currentScore = 0;
   activePlayer = activePlayer === 0 ? 1 : 0;
   player0El.classList.toggle("player--active");
   player1El.classList.toggle("player--active");
};

//^ Rolling dice functionality
btnRoll.addEventListener("click", function () {
   if (playing) {
      //* 1) Generating a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;

      //* 2) Display the dice
      diceEl.classList.remove("hidden");
      diceEl.src = `./dice-${dice}.png`;

      //* 3) Check for rolled 1: if true, switch to next player

      if (dice !== 1) {
         //* Add dice to current score
         currentScore += dice;
         document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
      } else {
         //* Switch to next player
         switchPlayer();
      }
   }
});

btnHold.addEventListener("click", function () {
   if (playing) {
      //* 1) Add current score to active player's score\
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
         scores[activePlayer];

      //* 2) check if player's score is >= 100
      if (scores[activePlayer] >= 100) {
         //* Finish the game
         playing = false;
         diceEl.classList.add("hidden");
         document
            .querySelector(`.player--${activePlayer}`)
            .classList.add("player--winner");
         document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove("player--active");
      } else {
         //* Switch to the next player
         switchPlayer();
      }
   }
});

btnNew.addEventListener("click", function () {
   init();
});
