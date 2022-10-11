import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);

// Chooses whether to fulfill or reject the promise.
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(e) {
  e.preventDefault();
  // Gets values from inputs.
  let { delay, step, amount } = e.currentTarget;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);

  for (let position = 1; position <= amount; position += 1) {
    // Returns one promise that will be fulfilled or rejected after delay time.
    createPromise(position, delay)
      .then(({ position, delay }) => {
        return Notify.success(`Fullfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        return Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    // Adds delay on next step after each promise.
    delay += step;
  }
}
