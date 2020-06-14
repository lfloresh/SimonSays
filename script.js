const red = document.getElementById("red");
const green = document.getElementById("green");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");
const selection = document.getElementById("selection");
const LAST_LEVEL = 10;

class Game {
  constructor(diff) {
    this.difficulty = diff;
    this.init();
    this.setSequence();
    setTimeout(this.nextLvl, 500);
  }
  init() {
    this.toggleBtnStart();
    this.level = 1;
    this.colors = {
      0: red,
      1: green,
      2: yellow,
      3: blue,
    };
    this.colorsCode = {
      red: 0,
      green: 1,
      yellow: 2,
      blue: 3,
    };
    this.chooseColor = this.chooseColor.bind(this);
    this.nextLvl = this.nextLvl.bind(this);
  }
  toggleBtnStart() {
    const status = selection.classList.contains("hide");
    if (status) selection.classList.remove("hide");
    else selection.classList.add("hide");
  }

  setSequence() {
    this.sequence = new Array(LAST_LEVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }
  nextLvl() {
    this.sublvl = 0;
    this.lightSequence();
    this.addClickEvent();
  }
  lightColor(numberColor) {
    let time;
    this.colors[numberColor].classList.add("light");
    this.difficulty == "hard" ? (time = 150) : (time = 350);
    setTimeout(() => this.turnOffColor(numberColor), time);
  }
  turnOffColor(numberColor) {
    this.colors[numberColor].classList.remove("light");
  }
  lightSequence() {
    let time;
    this.difficulty == "hard" ? (time = 400) : (time = 1000);
    for (let i = 0; i < this.level; i++) {
      setTimeout(() => this.lightColor(this.sequence[i]), time * i);
    }
  }
  addClickEvent() {
    for (let i = 0; i < 4; i++) {
      this.colors[i].addEventListener("click", this.chooseColor);
    }
  }
  deleteClickEvent() {
    for (let i = 0; i < 4; i++) {
      this.colors[i].removeEventListener("click", this.chooseColor);
    }
  }
  chooseColor(evt) {
    const color = evt.target.dataset.color;
    const colorCode = this.colorsCode[color];
    this.lightColor(colorCode);
    if (colorCode === this.sequence[this.sublvl]) {
      this.sublvl++;
      if (this.sublvl === this.level) {
        this.level++;
        this.deleteClickEvent();
        if (this.level === LAST_LEVEL + 1) {
          this.win();
        } else {
          if (this.difficulty != "easy") this.setSequence();
          setTimeout(this.nextLvl, 1000);
        }
      }
    } else {
      this.lose();
    }
  }
  win() {
    swal("Simon says", "You rocks!", "success").then(this.init);
  }
  lose() {
    let lvl;
    this.level<=5?lvl="sucks!":lvl="are great!";
    swal("Simon says", "You "+lvl+" Try again.", "error").then(() => {
      this.deleteClickEvent();
      this.init();
    });
  }
}
function beginGame(diff) {
  window.game = new Game(diff);
}
