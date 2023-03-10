let refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  intervalId = setInterval(() => {
    const rndColor = getRandomHexColor();
    refs.body.style.backgroundColor = `${rndColor}`;
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
