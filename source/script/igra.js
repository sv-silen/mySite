const clickSound = [
    new Audio('source/sounds/option.mp3'),
    new Audio('source/sounds/lose.mp3'),
    new Audio('source/sounds/win.mp3'),
];
function playSound(index) {
    const sound = clickSound[index]
  // Сбрасываем время в 0, чтобы звук можно было прерывать и играть быстро
  sound.currentTime = 0; 
  sound.play();
}

let score = JSON.parse(localStorage.getItem("score")) || {
  выигрыш: 0,
  проигрыш: 0,
  ничья: 0,
};
updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const hod = pickComputer();
      plaer(hod);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".auto-play-button").innerHTML = "Stop";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".auto-play-button").innerHTML = "Auto Play";
  }
}

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  plaer("ножницы");
  animateButton(".js-scissors-button");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  plaer("бумага");
  animateButton(".js-paper-button");
});
document.querySelector(".js-rock-button").addEventListener("click", () => {
  plaer("камень");
  animateButton(".js-rock-button");
});
document
  .querySelector(".js-reset-score-button")
  .addEventListener("click", () => {
    score.выигрыш = 0;
    score.проигрыш = 0;
    score.ничья = 0;
    localStorage.removeItem("score");
    updateScoreElement();
  });
document.querySelector(".js-auto-play").addEventListener("click", () => {
  autoPlay();
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "к" || event.key === "К") {
    plaer("камень");
  } else if (event.key === "б" || event.key === "Б") {
    plaer("бумага");
  } else if (event.key === "н" || event.key === "Н") {
    plaer("ножницы");
  }
});

function plaer(hod) {
  const comp = pickComputer();
  playSound(0);
  let result = "";
  if (hod === "ножницы") {
    if (comp === "камень") {
      result = "ПРОИГРАЛ";
    } else if (comp === "бумага") {
      result = "ВЫИГРАЛ !";
    } else if (comp === "ножницы") {
      result = "НИЧЬЯ";
    }
  } else if (hod === "бумага") {
    if (comp === "камень") {
      result = "ВЫИГРАЛ !";
    } else if (comp === "бумага") {
      result = "НИЧЬЯ";
    } else if (comp === "ножницы") {
      result = "ПРОИГРАЛ";
    }
  } else if (hod === "камень") {
    if (comp === "камень") {
      result = "НИЧЬЯ";
    } else if (comp === "бумага") {
      result = "ПРОИГРАЛ";
    } else if (comp === "ножницы") {
      result = "ВЫИГРАЛ !";
    }
  }
  if (result === "ВЫИГРАЛ !") {
    score.выигрыш += 1;
  } else if (result === "ПРОИГРАЛ") {
    score.проигрыш += 1;
  } else if (result === "НИЧЬЯ") {
    score.ничья += 1;
  }

  // Логика смены фона
  const body = document.body;

  if (result === "ВЫИГРАЛ !") {
    playSound(2);
    body.style.backgroundColor = "rgb(76, 175, 80)"; // Приятный зеленый
  } else if (result === "ПРОИГРАЛ") {
    playSound(1);
    body.style.backgroundColor = "rgb(244, 67, 54)"; // Мягкий красный
  } else if (result === "НИЧЬЯ") {
    body.style.backgroundColor = " rgb(171, 182, 184)"; // Возвращаем ваш исходный цвет
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `Ты
    <img src="source/images/${hod}-emoji.png"
    class="move-icon">
    <img src="source/images/${comp}-emoji.png"
    class="move-icon">
    Компьютер`;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML =
    `выигрышей:${score.выигрыш} проигрышей:${score.проигрыш} ничьих:${score.ничья}`;
}

function pickComputer() {
  const randNumb = Math.random();
  let comp = "";
  if (randNumb >= 0 && randNumb < 1 / 3) {
    comp = "камень";
  } else if (randNumb >= 1 / 3 && randNumb < 2 / 3) {
    comp = "бумага";
  } else if (randNumb >= 2 / 3 && randNumb < 1) {
    comp = "ножницы";
  }
  return comp;
}
