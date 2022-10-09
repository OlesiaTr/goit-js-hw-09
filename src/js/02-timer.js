import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.btn.disabled = true;

// const today = new Date();
// let tmrw = new Date();

let date = null;

const options = {
  enableTime: true,
  time_24hr: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  defaultDate: new Date(),
  //   minDate: tmrw.setDate(today.getDate() + 1), <---- formula for "tomorrow"
  minuteIncrement: 1,
  onClose(selectedDates) {
    date = selectedDates[0].getTime();
    const unavailableDate = date - Date.now();
    if (unavailableDate <= 0) {
      return Notify.failure('Please choose a date in the future');
    }

    refs.btn.disabled = false;
  },
};

// Cross-browser selection of the end date and time in a single UI element.
const fp = flatpickr(refs.input, options);

refs.btn.addEventListener('click', onBtnClick);

function onBtnClick() {
  refs.btn.disabled = true;
  refs.input.disabled = true;
  Notify.info('The countdown has begun');

  let intervalID = setInterval(() => {
    // Counts ms from the chosen date
    const countdownEnd = date - Date.now();
    if (countdownEnd <= 1000) {
      clearInterval(intervalID);
      Notify.success('The countdown has ended');
    }
    // Converts ms firstly, so it was possible to choose a formate of the time
    const formattedTime = convertMs(countdownEnd);
    refs.days.textContent = formattedTime.days;
    refs.hours.textContent = formattedTime.hours;
    refs.minutes.textContent = formattedTime.minutes;
    refs.seconds.textContent = formattedTime.seconds;
  }, 1000);
}

// Calculates once a second how much time is left until the specified date and update the timer interface, showing four numbers: days, hours, minutes and seconds in the following format: xx:xx:xx:xx.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// Adds 0, if there are less than two digits in the number, in the timer interface
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
