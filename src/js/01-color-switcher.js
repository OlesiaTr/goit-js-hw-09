const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let timerID = null;

// Clicking on the buttons calls for functions
refs.start.addEventListener('click', onStartBtn);
refs.stop.addEventListener('click', onStopBtn);

function onStartBtn(e) {
  // Disables a start btn, while function is running
  e.target.disabled = true;

  if (e.target.disabled) {
    // Changes the <body> background color
    timerID = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
}

function onStopBtn() {
  // Activates a start btn
  refs.start.disabled = false;
  // Clears a timer
  clearInterval(timerID);
}

function getRandomHexColor() {
  // Generates a random color
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
