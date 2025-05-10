# Об'єкт події в JavaScript

Коли відбувається подія, браузер створює об'єкт події, який містить інформацію про те, що сталося. Цей об'єкт передається як аргумент функції-обробнику.

## Основи об'єкта події

Об'єкт події автоматично передається в обробник події:

```javascript
const button = document.querySelector(".button");

function showConsole(event) {
  console.log(event.type); // тип події, наприклад "click"
  console.log(event); // весь об'єкт події
}

button.addEventListener("click", showConsole);
```

Можна використовувати будь-яке ім'я параметра, але зазвичай використовують `event`, `evt` або просто `e`:

```javascript
button.addEventListener("click", function(e) {
  console.log(e.type);
});
```

## Загальні властивості об'єкта події

Всі об'єкти подій мають наступні властивості:

- **type** - тип події (наприклад, "click", "keydown")
- **target** - елемент, на якому відбулася подія (цільовий елемент)
- **currentTarget** - елемент, до якого прикріплений обробник події
- **eventPhase** - фаза події (занурення, цільова, спливання)
- **bubbles** - чи спливає подія (boolean)
- **cancelable** - чи можна скасувати стандартну дію події (boolean)
- **defaultPrevented** - чи було викликано preventDefault() (boolean)
- **isTrusted** - чи була подія ініційована користувачем (true) або скриптом (false)
- **timeStamp** - час виникнення події (мілісекунди)

## Різниця між target і currentTarget

- **event.target** - це елемент, на якому безпосередньо відбулася подія
- **event.currentTarget** - це елемент, на якому зареєстрований обробник події

Ця різниця важлива при спливанні подій:

```javascript
document.querySelector(".container").addEventListener("click", function(event) {
  console.log("target:", event.target); // може бути будь-який елемент всередині контейнера
  console.log("currentTarget:", event.currentTarget); // завжди буде .container
});
```

## Специфічні властивості для різних типів подій

### Для подій миші (MouseEvent)

- **clientX/clientY** - координати відносно вікна браузера
- **pageX/pageY** - координати відносно документа (з урахуванням прокрутки)
- **screenX/screenY** - координати відносно екрану
- **offsetX/offsetY** - координати відносно елемента, на якому відбулася подія
- **button** - яка кнопка миші була натиснута (0 - ліва, 1 - середня, 2 - права)
- **buttons** - бітова маска натиснутих кнопок
- **altKey, ctrlKey, shiftKey, metaKey** - чи були натиснуті відповідні клавіші-модифікатори
- **relatedTarget** - елемент, з/на який переходить курсор (для mouseover/mouseout)

Приклад:

```javascript
const blockForMouse = document.querySelector(".block-for-mouse");

blockForMouse.addEventListener("mousemove", function(event) {
  blockForMouse.innerHTML = `clientX - ${event.clientX} <br> clientY - ${event.clientY}`;
});
```

### Для подій клавіатури (KeyboardEvent)

- **key** - символ, що відповідає натиснутій клавіші ("a", "Enter", "Escape", тощо)
- **code** - фізичний код клавіші ("KeyA", "Enter", "Escape", тощо)
- **keyCode** - числовий код клавіші (застарілий)
- **altKey, ctrlKey, shiftKey, metaKey** - чи були натиснуті відповідні клавіші-модифікатори
- **repeat** - чи утримується клавіша (повторні натискання)

Приклад:

```javascript
document.addEventListener("keydown", function(event) {
  if (event.code == "KeyZ" && (event.ctrlKey || event.metaKey)) {
    console.log("Натиснуто Ctrl+Z або Command+Z");
  }
});
```

### Для подій форм

- **value** - поточне значення елемента форми (для input, select, тощо)
- **checked** - стан чекбокса (для input type="checkbox")
- **selected** - стан опції (для select)

## Методи об'єкта події

- **preventDefault()** - скасовує стандартну дію браузера
- **stopPropagation()** - зупиняє спливання події
- **stopImmediatePropagation()** - зупиняє спливання і запобігає виконанню інших обробників на поточному елементі

### preventDefault()

Метод `preventDefault()` скасовує стандартну дію браузера для події:

```javascript
// Запобігання переходу за посиланням
document.querySelector("a").addEventListener("click", function(event) {
  event.preventDefault();
  console.log("Клік по посиланню, але перехід не відбувся");
});

// Запобігання відправці форми
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("Форма не відправлена");
});
```

### stopPropagation()

Метод `stopPropagation()` зупиняє спливання події:

```javascript
document.querySelector(".child").addEventListener("click", function(event) {
  event.stopPropagation();
  console.log("Клік по дочірньому елементу");
  // Подія не спливе до батьківських елементів
});
```

### stopImmediatePropagation()

Метод `stopImmediatePropagation()` зупиняє спливання і запобігає виконанню інших обробників на поточному елементі:

```javascript
const button = document.querySelector(".button");

button.addEventListener("click", function(event) {
  console.log("Перший обробник");
});

button.addEventListener("click", function(event) {
  console.log("Другий обробник");
  event.stopImmediatePropagation();
});

button.addEventListener("click", function(event) {
  console.log("Третій обробник"); // Не виконається
});
```

## Найкращі практики

1. **Завжди перевіряйте об'єкт події** перед використанням його властивостей
2. **Використовуйте preventDefault()** замість повернення false з обробника
3. **Будьте обережні зі stopPropagation()** - це може порушити роботу інших обробників
4. **Використовуйте делегування подій** для ефективної обробки багатьох елементів
5. **Пам'ятайте про кросбраузерні відмінності** в об'єктах подій

У наступному розділі ми розглянемо спливання та занурення подій.
