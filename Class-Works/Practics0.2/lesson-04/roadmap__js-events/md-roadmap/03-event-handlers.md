# Обробники подій в JavaScript

Обробники подій (event handlers) - це функції, які виконуються у відповідь на певну подію. Існує кілька способів призначити обробник події в JavaScript.

## 1. Використання HTML-атрибутів

Найпростіший (але не найкращий) спосіб - використання HTML-атрибутів, які починаються з `on`:

```html
<button onclick="console.log('Клік!')">Натисни мене</button>
```

Можна також викликати функцію, визначену в JavaScript:

```html
<button onclick="showConsole()">Натисни мене</button>

<script>
const showConsole = () => {
  console.log("Клік!");
};
</script>
```

**Переваги:**
- Простота і наочність
- Легко побачити, які обробники подій призначені елементу

**Недоліки:**
- Змішування HTML і JavaScript (порушення принципу розділення відповідальності)
- Обмежена функціональність
- Проблеми з масштабуванням для складних обробників
- Можливі проблеми з областю видимості

## 2. Використання DOM-властивостей

Другий спосіб - призначення обробника через DOM-властивості:

```javascript
document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".button");
  
  button.onclick = function () {
    console.log("Клік!");
  };
});
```

Спочатку отримуємо елемент за допомогою одного з методів:

```javascript
// Різні способи отримання елементів
const b1 = document.getElementById("btn1");
const b2 = document.getElementsByClassName("button");
const b3 = document.getElementsByTagName("p");
const b4 = document.getElementsByName("btn");

const button = document.querySelector("#btn");
const buttons = document.querySelectorAll(".button");
```

Потім призначаємо обробник:

```javascript
button.onclick = function () {
  console.log("Клік!");
};

// Або використовуючи стрілкову функцію
button.onclick = () => {
  console.log("Клак!");
};

// Або призначаючи іменовану функцію
function showConsole() {
  console.log("Клік!");
}
button.onclick = showConsole; // Важливо! Без круглих дужок!
```

**Переваги:**
- Розділення HTML і JavaScript
- Краща читабельність для складних обробників
- Доступ до області видимості JavaScript

**Недоліки:**
- Можна призначити тільки один обробник для кожної події на елементі
- Кожне нове призначення обробника перезапише попереднє:

```javascript
const button = document.querySelector('.button');

button.onclick = function () {
  console.log('Клік!');
}
button.onclick = function () {
  console.log('Клак!'); // Тільки цей обробник спрацює
  this.style.backgroundColor = 'red';
}
```

## 3. Метод addEventListener/removeEventListener

Найбільш гнучкий і рекомендований спосіб - використання методів `addEventListener` і `removeEventListener`:

```javascript
element.addEventListener(event, handler, [options]);
```

Приклад:

```javascript
const button = document.querySelector(".button");

button.addEventListener("click", function () {
  console.log("Клік!");
});
button.addEventListener("click", function () {
  console.log("Клак!");
}); // Обидва обробники спрацюють
```

Можна використовувати іменовані функції, що дозволяє пізніше видалити обробник:

```javascript
function showConsole1() {
  console.log("Клик!");
}
function showConsole2() {
  console.log("HELLO USERS!");
}

button.addEventListener("click", showConsole1);
button.addEventListener("click", showConsole2);

// Видалення обробника
button.removeEventListener("click", showConsole2);
```

### Опції addEventListener

Третій параметр `addEventListener` може бути об'єктом з опціями:

```javascript
const options = {
  capture: false, // фаза, на якій повинен спрацювати обробник
  once: false,    // якщо true, обробник буде автоматично видалений після виконання
  passive: false  // якщо true, обробник ніколи не викличе preventDefault()
};

button.addEventListener("click", showConsole, options);
```

**Переваги:**
- Можливість додавати кілька обробників для однієї події
- Більш гнучкі налаштування через опції
- Можливість видаляти конкретні обробники
- Підтримка фаз спливання і занурення подій

**Недоліки:**
- Трохи більш складний синтаксис порівняно з іншими методами

## Найкращі практики

1. **Використовуйте addEventListener** для більшості випадків
2. **Уникайте inline-обробників** в HTML для підтримки розділення відповідальності
3. **Використовуйте делегування подій** для динамічних елементів
4. **Видаляйте обробники**, коли вони більше не потрібні, щоб уникнути витоків пам'яті
5. **Використовуйте опцію once: true** для обробників, які повинні спрацювати тільки один раз
6. **Будьте обережні з контекстом this** в обробниках подій

У наступному розділі ми розглянемо об'єкт події та його властивості.
