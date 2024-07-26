import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('.start-btn');
const inputField = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let userSelectedDate;
let countdownInterval;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log({ userSelectedDate });
    const actualDate = new Date();
    if (userSelectedDate <= actualDate) {
      iziToast.error({
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        messageColor: 'white',
        position: 'topRight',
        timeout: 5000,
      });
      startBtn.disabled = true;
      startBtn.classList.remove('btn-active');
      resetDisplay();
    } else {
      startBtn.disabled = false;
      startBtn.classList.add('btn-active');
    }
  },
};

flatpickr(inputField, options);

function resetDisplay() {
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
}

function startTimer() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(() => {
    const actualDate = new Date();
    const deltaTimeMilis = userSelectedDate - actualDate;
    if (deltaTimeMilis <= 0) {
      clearInterval(countdownInterval);
      resetDisplay();
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTimeMilis);
    const formatTime = time => String(time).padStart(2, '0');
    daysElement.textContent = formatTime(days);
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
  }, 1000);
}

startBtn.addEventListener('click', () => {
  startTimer();
  startBtn.disabled = true;
  inputField.disabled = true;
});
