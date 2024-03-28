//marquee
const marqueeLine = document.querySelector(".marquee__line");
const footerMarquee = document.querySelector("footer .marquee");
const marqueeText = document.querySelector(".marquee__text");

const marqueeTextClone = marqueeText.cloneNode(true);
marqueeLine.append(marqueeTextClone);
const marqueeLineClone = marqueeLine.cloneNode(true);
footerMarquee.append(marqueeLineClone);

//phases slider
let width = 750;
const phaseSlides = document.querySelector(".phases__cards");
const prevButton = document.querySelector(".phases__arrows button");
const nextButton = document.querySelectorAll(".phases__arrows button")[1];
const dots = document.querySelectorAll(".phases__arrows .dot");

let position = 0;

if (position == 0) {
  prevButton.disabled = true;
}
dots[0].style.backgroundColor = "#313131";

function disableButton() {
  position == 0 ? (prevButton.disabled = true) : (prevButton.disabled = false);

  position == -width * 4
    ? (nextButton.disabled = true)
    : (nextButton.disabled = false);
}

function activeDot(n) {
  for (let i = 0; i < dots.length; i++) {
    if (i === n - 1) {
      dots[i].style.backgroundColor = "#313131";
    } else {
      dots[i].style.backgroundColor = "#d9d9d9";
    }
  }
}
document.querySelector(".phases__prev").onclick = function () {
  position += width;
  position = Math.min(position, 0);
  phaseSlides.style.marginLeft = position + "px";
  disableButton();
  activeDot(-position / width + 1);
};
document.querySelector(".phases__next").onclick = function () {
  position -= width;
  position = Math.max(position, -width * 4);
  phaseSlides.style.marginLeft = position + "px";
  disableButton();
  console.log(position / width);
  activeDot(-position / width + 1);
};
function currentSlide(n) {
  position = -width * (n - 1);
  phaseSlides.style.marginLeft = position + "px";
  activeDot(n);
  disableButton();
}

// players slider
const prevBtn = document.querySelector(".players__prev");
const nextBtn = document.querySelector(".players__next");
const playerSlides = document.querySelector(".players__cards");
const playerList = document.querySelectorAll(".players__card");
const number = document.querySelector(".players__arrows div span:nth-child(1)");

const player1 = {
  name: "Хозе-Рауль Капабланка",
  rank: "Чемпион мира по шахматам",
};
const player2 = {
  name: "Эммануил Ласкер",
  rank: "Чемпион мира по шахматам",
};
const player3 = {
  name: "Александр Алехин",
  rank: "Чемпион мира по шахматам",
};
const player4 = {
  name: "Арон Нимцович",
  rank: "Чемпион мира по шахматам",
};
const player5 = {
  name: "Рихард Рети",
  rank: "Чемпион мира по шахматам",
};
const player6 = {
  name: "Остап Бендер",
  rank: "Гроссмейстер",
};

const players = [player1, player2, player3, player4, player5, player6];

const playersCards = [];
for (let i = 0; i < players.length; i++) {
  playersCards.push(`
  <div class="players__card">
  <img src="img/avatar.png" alt="avatar" />
  <p>${players[i].name}</p>
  <p>${players[i].rank}</p>
  <button>Подробнее</button>
  </div>`);
}

const slideCount = playersCards.length;
let slideIndex = 0;

window.addEventListener("resize", updateSlider);
prevBtn.addEventListener("click", showPreviousSlide);
nextBtn.addEventListener("click", showNextSlide);

function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
  document
    .querySelectorAll(".players__card")
    .forEach((item) => (item.style.animationDirection = "reverse"));
}

function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

function updateSlider() {
  if (document.documentElement.offsetWidth < 750) {
    playerSlides.innerHTML = playersCards[slideIndex];
    number.innerHTML = slideIndex + 1;
  } else {
    playerSlides.innerHTML =
      playersCards[slideIndex] +
      playersCards[(slideIndex + 1) % slideCount] +
      playersCards[(slideIndex + 2) % slideCount];
    number.innerHTML = 3;
  }
}

updateSlider();

let autoplayInterval = null;

function startAutoplay() {
  if (!autoplayInterval) {
    autoplayInterval = setInterval(showNextSlide, 4000);
  }
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = null;
}

startAutoplay();
