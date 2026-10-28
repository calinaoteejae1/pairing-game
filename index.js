const cards = document.querySelectorAll(".card");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

const images = [
  "image1.svg", "image1.svg",
  "image2.svg", "image2.svg",
  "image3.svg", "image3.svg",
  "image4.svg", "image4.svg",
  "image5.svg", "image5.svg",
  "image6.svg", "image6.svg",
  "image7.svg", "image7.svg",
  "image8.svg", "image8.svg"
];

let firstCard = null;
let secondCard = null;
let matches = 0;
let locked = false;
let hideTimeout = null;

function shuffleImages() {
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
}

function flipCard(event) {
  const card = event.currentTarget;
  if (locked || card === firstCard || card.classList.contains("matched")) return;

  const index = Array.from(cards).indexOf(card);
  card.innerHTML = `<img src="images/${images[index]}" alt="Revealed image">`;

  if (firstCard === null) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.innerHTML === secondCard.innerHTML) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches++;
    statusText.textContent = `Pairs found: ${matches}/8`;
    firstCard = null;
    secondCard = null;
    if (matches === 8) statusText.textContent = "You win!";
  } else {
    locked = true;
    hideTimeout = setTimeout(() => {
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";
      firstCard = null;
      secondCard = null;
      locked = false;
      hideTimeout = null;
    }, 1000);
  }
}

function restartGame() {
  if (hideTimeout !== null) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  shuffleImages();
  matches = 0;
  firstCard = null;
  secondCard = null;
  locked = false;
  for (const card of cards) {
    card.innerHTML = "";
    card.classList.remove("matched");
  }
  statusText.textContent = "Find the matching pairs!";
}

for (const card of cards) card.addEventListener("click", flipCard);
restartButton.addEventListener("click", restartGame);
restartGame();
