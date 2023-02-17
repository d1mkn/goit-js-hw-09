import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('.field [data-days]'),
  hours: document.querySelector('.field [data-hours]'),
  minutes: document.querySelector('.field [data-minutes]'),
  seconds: document.querySelector('.field [data-seconds]'),
  gifAlarm: document.querySelector('.timer-end img'),
};

let timerId = null;
let futureDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureDate = selectedDates[0].getTime() - new Date().getTime();
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.removeAttribute('disabled');
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', () => {
  if (timerId) {
    return;
  }
  timerId = setInterval(() => {
    const onTik = convertMs((futureDate = futureDate - 1000));
    refs.days.textContent = addLeadingZero(onTik.days);
    refs.hours.textContent = addLeadingZero(onTik.hours);
    refs.minutes.textContent = addLeadingZero(onTik.minutes);
    refs.seconds.textContent = addLeadingZero(onTik.seconds);
    if (
      onTik.days === 0 &&
      onTik.hours === 0 &&
      onTik.minutes === 0 &&
      onTik.seconds === 0
    ) {
      clearInterval(timerId);
      refs.gifAlarm.removeAttribute('style');
      Notiflix.Notify.info('Time is up!');
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);
