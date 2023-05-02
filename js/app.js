'use strict';

const start = document.querySelector('.start');
const screen = document.querySelector('.screen');
const button = document.querySelectorAll('.nums__button');
let level = 1;
let array = [];
let arrayLength;
let screenItem;
disableNumbers(true);

function disableStart(value) {
  start.disabled = value;
}

function disableNumbers(value) {
  button.forEach(item => {
    item.disabled = value;
  });
}

function interval() {
  const screenList = document.querySelector('.screen__list');
  let count = 0;

  array = [];

  const intervalNums = setInterval(() => {
    count++;

    array.push(Math.trunc(Math.random() * 10));

    screenList.insertAdjacentHTML('beforeend', `<li class="screen__item">${array[count - 1]}</li>`);

    if (count === 4 + level) {
      arrayLength = array.length - 1;
      level++;
      screenItem = document.querySelectorAll('.screen__item');
      setTimeout(() => {
        screenItem.forEach(item => item.textContent = '?');
        disableNumbers(false);
      }, 1200)

      clearInterval(intervalNums);
    }
  }, 1200);
}

function check(i) {
  if (i === array[arrayLength]) {
    screenItem[arrayLength].textContent = `${i}`;
    screenItem[arrayLength].style.color = '#9cff94';
    arrayLength--;

    if (arrayLength < 0) {
      disableNumbers(true);
      disableStart(false);
      start.textContent = 'Продолжить';
    }

  } else {
    screenItem[arrayLength].textContent = `${array[arrayLength]}`;
    screenItem[arrayLength].style.color = '#ff5a43';
    disableNumbers(true);
    disableStart(false);
    start.textContent = 'Новая игра';
    level = 1;
  }
}

start.addEventListener('click', () => {
  start.textContent = '...';
  screen.innerHTML = `<ul class="screen__list"></ul>`;
  document.querySelector('.level').textContent = `${level}`;
  disableStart(true);
  interval(true);
});

button.forEach((item, index) => {
  item.addEventListener('click', () => {
    check(index);
  });
});