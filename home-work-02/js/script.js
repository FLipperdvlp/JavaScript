// Task 1
// Напишіть функцію, яка приймає у input числа і повертає більше з них. І виводить в out-1.

const input1 = document.querySelector("#input-1");
const btn1 = document.querySelector("#b-1");
const out1 = document.querySelector("#out-1");

function t1(value){
  const arr = value.trim().splt(", ");
  console.log(arr);
  const arrNum = arr.map((v) => +v);
  console.log(arrNum);
}

btn1.addEventListener("click", () => {
  t1(input1.value);
  out1.textContent = "Hello";
})

// Task 2.
// Напишіть функцію, яка приймає число і виводить таблицю множення для цього числа в out-2.
const input2 = document.querySelector("#input-2");
const btn2 = document.querySelector("#b-2");
const out2 = document.querySelector("#out-2");

function t2(value) {
  let num = parseInt(value);
  let result = '';
  for (let i = 1; i <= 10; i++) {
    result += `${num} x ${i} = ${num * i}<br>`;
  }
  out2.innerHTML = result;
}

btn2.addEventListener("click", () => {
  t2(input2.value);
});

// Task 3
// Напишіть функцію t3 яка приймає ваш рік народження та обчислює (повертає) ваш вік.
function t3(year) {
  const currentYear = new Date().getFullYear();
  return currentYear - year;
}

document.querySelector('#b-3').onclick = function () {
  const year = +document.querySelector('#input-3').value;
  document.querySelector('#out-3').textContent = t3(year);
};

// Task 4
// Напишіть функцію t4, яка приймає 2 числа та повертає випадкове ціле число від першого до другого прийнятого параметра.
function t4(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

document.querySelector('#b-4').onclick = function () {
  const a = +document.querySelector('#input-4-1').value;
  const b = +document.querySelector('#input-4-2').value;
  document.querySelector('#out-4').textContent = t4(a, b);
};

// Task 5
// Напишіть функцію t5, яка повертає випадковий колір у форматі rgb(x,y,z)(рядок). Де x, y, z – випадкові числа в діапазоні [0, 255].
function t5() {
  return `rgb(${t4(0,255)},${t4(0,255)},${t4(0,255)})`;
}

document.querySelector('#b-5').onclick = function () {
  const color = t5();
  const out5 = document.querySelector('#out-5');
  out5.textContent = color;
  out5.style.backgroundColor = color;
};


// Task 6
// Напишіть функцію t6, яка приймає рядок як параметр і повертає результат з очищеними пробілами на початку та в кінці рядка. Тобто приймає _hello_(де знак _ символізує прогалину), а повертає hello. Для видалення пробілів – використовуйте trim.
function t6(str) {
  return str.trim();
}

document.querySelector('#b-6').onclick = function () {
  const value = document.querySelector('#input-6').value;
  document.querySelector('#out-6').textContent = t6(value);
};

// Task 7
// Напишіть функцію t7, яка приймає число та повертає true, якщо число парне, і false якщо не парне.
function t7(num) {
  return num % 2 === 0;
}

document.querySelector('#b-7').onclick = function () {
  const num = +document.querySelector('#input-7').value;
  document.querySelector('#out-7').textContent = t7(num);
};

// Task 8
// Напишіть функцію для пошуку максимальної цифри у числі.
function t8(num) {
  const digits = num.toString().split('').map(Number);
  return Math.max(...digits);
}

document.querySelector('#b-8').onclick = function () {
  const num = +document.querySelector('#input-8').value;
  document.querySelector('#out-8').textContent = t8(num);
};

// Task 9
/*
    Написати функцію, яка повертає число Фібоначчі за переданим порядковим номером.
    Числа Фібоначчі: 1, 1, 2, 3, 5, 8, 13 ... Ряд ґрунтується на тому, що кожне число дорівнює сумі двох попередніх чисел.
    Наприклад: порядковий номер 3 – число 2, порядковий номер 6 – число 8.
 */
    function t9(index) {
      if (index <= 2) return 1;
      let a = 1, b = 1, result = 0;
      for (let i = 3; i <= index; i++) {
        result = a + b;
        a = b;
        b = result;
      }
      return result;
    }
    
    document.querySelector('#b-9').onclick = function () {
      const index = +document.querySelector('#input-9').value;
      document.querySelector('#out-9').textContent = t9(index);
    };
    
// Task 10
/*
    Створіть об'єкт, що описує автомобіль (виробник, модель, рік
    випуску, середня швидкість), і наступні функції для роботи з цим
    об'єктом.
    1. Функція для виведення інформації про автомобіль на
    екран.
    2. Функція для підрахунку необхідного часу для подолання
    переданої відстані із середньою швидкістю. Враховуйте,
    що через кожні 4 години дороги, водієві необхідно робити
    перерву на 1 годину.
    3. Функція, яка виводить на екран інформацію про час
    поїздки, а також час прибуття в пункт призначення.

 */
    function t10() {
      const car = {
        producer: document.querySelector('#input-10-1').value,
        model: document.querySelector('#input-10-2').value,
        year: +document.querySelector('#input-10-3').value,
        speed: +document.querySelector('#input-10-4').value,
        getInfo: function() {
          return `Виробник: ${this.producer}, Модель: ${this.model}, Рік: ${this.year}, Середня швидкість: ${this.speed} км/год`;
        },
        getTravelTime: function(distance) {
          const rawTime = distance / this.speed;
          const breaks = Math.floor(rawTime / 4);
          return rawTime + breaks;
        },
        getArrivalInfo: function(distance) {
          const totalTime = this.getTravelTime(distance);
          const hours = Math.floor(totalTime);
          const minutes = Math.round((totalTime - hours) * 60);
          const arrival = new Date();
          arrival.setHours(arrival.getHours() + hours);
          arrival.setMinutes(arrival.getMinutes() + minutes);
          return `Час поїздки: ${hours} год. ${minutes} хв.<br>Час прибуття: ${arrival.toLocaleTimeString()}`;
        }
      };
    
      const distance = +document.querySelector('#input-10-5').value;
      document.querySelector('#out-10').innerHTML = `
        ${car.getInfo()}<br>${car.getArrivalInfo(distance)}
      `;
    }
    
    document.querySelector('#b-10').onclick = t10;
    