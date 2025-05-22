// Task 1 ============================================
/* Додайте на блок .div-1 подію клік і по кліку запуск функції t1. Функція повинна повертати та виводити на екран вміст блоку (тільки текст). Вивід здійснюється у out-1.  */

const div1 = document.querySelector("#div-1");
const out1 = document.querySelector("#out-1");

// function t1() {
//   out1.textContent = div1.textContent;
// }

// div1.addEventListener("click", t1);

div1.addEventListener("click", () => {
  out1.textContent = div1.textContent;
});

Math.floor(Math.random() * 100) + 1; // диапазон от 1 до 100
Math.floor(Math.random() * 100); // диапазон от 0 до 99
Math.round(Math.random() * 100); // диапазон от 0 до 100
Math.ceil(Math.random() * 100); // диапазон от 1 до 100
// Task 2 ============================================
const div2 = document.querySelector("#div-2");
const out2 = document.querySelector("#out-2");

div2.addEventListener("click", (event) => {
  const altPressed = event.altKey;
  out2.textContent = altPressed;
});

// Task 3 ============================================
const div3 = document.querySelector("#div-3");
const out3 = document.querySelector("#out-3");
let width3 = 100;

div3.addEventListener("click", () => {
  width3 += 5;
  div3.style.width = width3 + "px";
  out3.textContent = `Width: ${width3}px`;
});

// Task 4 ============================================
const btn4 = document.querySelector("#btn-4");
const out4 = document.querySelector("#out-4");

btn4.addEventListener("click", () => {
  const randomNum = Math.floor(Math.random() * 101);
  out4.textContent = `Random number: ${randomNum}`;
});

// Task 5 ============================================
const btn5 = document.querySelector("#btn-5");
const text5 = document.querySelector("#text-5");

btn5.addEventListener("click", () => {
  if (text5.style.display === "none") {
    text5.style.display = "block";
  } else {
    text5.style.display = "none";
  }
});

// Task 6 ============================================
const div6 = document.querySelector("#div-6");
const img6 = document.querySelector("#img-6");

div6.addEventListener("mouseover", () => {
  img6.src = "2.png";
});

div6.addEventListener("mouseout", () => {
  img6.src = "1.png";
});

// Task 7 ============================================
const div7 = document.querySelector("#div-7");
let count7 = 0;

div7.addEventListener("mousemove", () => {
  count7++;
  div7.textContent = count7;
});

// Task 8 ============================================
const div8 = document.querySelector("#div-8");
let width8 = 100;

div8.addEventListener("mousemove", () => {
  width8 += 1;
  div8.style.width = width8 + "px";
});

// Task 9 ============================================
const newsList = document.querySelector("#news-list");
const toggleNewsBtn = document.querySelector("#toggle-news");

toggleNewsBtn.addEventListener("click", () => {
  if (newsList.style.display === "none") {
    newsList.style.display = "block";
    toggleNewsBtn.textContent = "Hide";
  } else {
    newsList.style.display = "none";
    toggleNewsBtn.textContent = "Show";
  }
});

newsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-news")) {
    event.target.parentElement.remove();
  }
});