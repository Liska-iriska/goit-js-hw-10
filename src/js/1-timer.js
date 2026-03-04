import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startButton = document.querySelector("button[data-start]");
const input = document.querySelector('#datetime-picker');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
        startButton.disabled = true;
        // alert("Please choose a date in the future");
        iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
        userSelectedDate = null;
    } else {
        startButton.disabled = false;
        userSelectedDate = selectedDates[0];
    }
  },
}; 



 startButton.addEventListener("click", () => {
    startButton.disabled = true;
    input.disabled = true;

    const timer = setInterval(() => {
        const currentTime = Date.now();
        const difference = userSelectedDate - currentTime;

        if (difference <= 0) {
            clearInterval(timer);
            startButton.disabled = false;
            return;
        }

        const time = convertMs(difference);

        updateTimerInterface(time);
    }, 1000);
});

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimerInterface ({days, hours, minutes, seconds}) {
    document.querySelector('[data-days]').textContent = addZero(days);
    document.querySelector('[data-hours]').textContent = addZero(hours);
    document.querySelector('[data-minutes]').textContent = addZero(minutes);
    document.querySelector('[data-seconds]').textContent = addZero(seconds);
}

flatpickr(input, options);


