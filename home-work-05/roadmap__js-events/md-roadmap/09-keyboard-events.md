# Події клавіатури в JavaScript

Події клавіатури (Keyboard Events) виникають при взаємодії користувача з клавіатурою. Вони дозволяють відстежувати натискання клавіш, їх утримання та відпускання, що є важливим для створення інтерактивних веб-додатків.

## Основні типи подій клавіатури

В JavaScript є три основні типи подій клавіатури:

1. **keydown** - виникає, коли клавіша натиснута
2. **keyup** - виникає, коли клавіша відпущена
3. **keypress** - застарілий тип події, який виникає при натисканні клавіші, що генерує символ (не рекомендується використовувати)

## Порядок подій клавіатури

При натисканні клавіші події відбуваються в такому порядку:

1. **keydown** - коли клавіша натиснута
2. **keypress** (застаріла) - якщо клавіша генерує символ
3. **keyup** - коли клавіша відпущена

Якщо клавіша утримується, події `keydown` (і `keypress`) повторюються автоматично з певною частотою, яка залежить від налаштувань операційної системи.

```javascript
document.addEventListener('keydown', () => console.log('keydown'));
document.addEventListener('keypress', () => console.log('keypress'));
document.addEventListener('keyup', () => console.log('keyup'));

// При натисканні клавіші 'A' виведеться:
// keydown
// keypress
// keyup
```

## Об'єкт події клавіатури (KeyboardEvent)

Об'єкт події клавіатури містить інформацію про подію, що сталася:

### Основні властивості

- **key** - повертає символ або назву клавіші ("a", "Enter", "Escape", "ArrowRight", тощо)
- **code** - фізичний код клавіші на клавіатурі ("KeyA", "Enter", "Escape", "ArrowRight", тощо)
- **keyCode** / **which** - числовий код клавіші (застарілі властивості, не рекомендуються)
- **repeat** - `true`, якщо клавіша утримується і подія повторюється
- **shiftKey** - `true`, якщо клавіша Shift натиснута
- **altKey** - `true`, якщо клавіша Alt (Option на Mac) натиснута
- **ctrlKey** - `true`, якщо клавіша Ctrl натиснута
- **metaKey** - `true`, якщо клавіша Meta (Command на Mac, Windows на Windows) натиснута
- **location** - вказує на розташування клавіші на клавіатурі (наприклад, ліва або права клавіша Shift)

```javascript
document.addEventListener('keydown', function(event) {
  console.log(`
    key: ${event.key}
    code: ${event.code}
    repeat: ${event.repeat}
    shift: ${event.shiftKey}
    alt: ${event.altKey}
    ctrl: ${event.ctrlKey}
    meta: ${event.metaKey}
  `);
});
```

### Різниця між key і code

- **key** - повертає символ, який генерується при натисканні клавіші, з урахуванням поточної розкладки клавіатури та стану клавіш-модифікаторів
- **code** - повертає фізичний код клавіші, незалежно від розкладки клавіатури

Приклад:
- При натисканні клавіші "A" на англійській розкладці: `key = "a"`, `code = "KeyA"`
- При натисканні клавіші "A" на українській розкладці: `key = "ф"`, `code = "KeyA"`
- При натисканні Shift + "A" на англійській розкладці: `key = "A"`, `code = "KeyA"`

```javascript
document.addEventListener('keydown', function(event) {
  console.log(`Клавіша: ${event.key}, Код: ${event.code}`);
});
```

## Обробка комбінацій клавіш

Для обробки комбінацій клавіш використовуються властивості `shiftKey`, `altKey`, `ctrlKey` і `metaKey`:

```javascript
document.addEventListener('keydown', function(event) {
  // Перевірка комбінації Ctrl+Z або Command+Z (відміна)
  if (event.code == "KeyZ" && (event.ctrlKey || event.metaKey)) {
    console.log('Відміна дії');
    event.preventDefault(); // Запобігаємо стандартній поведінці браузера
  }
  
  // Перевірка комбінації Ctrl+S або Command+S (збереження)
  if (event.code == "KeyS" && (event.ctrlKey || event.metaKey)) {
    console.log('Збереження');
    event.preventDefault();
  }
});
```

## Запобігання стандартній поведінці

Деякі клавіші та комбінації клавіш мають стандартну поведінку в браузері:
- F5 - оновлення сторінки
- Ctrl+S - збереження сторінки
- Alt+стрілки - навігація вперед/назад в історії браузера

Для запобігання стандартній поведінці використовується метод `preventDefault()`:

```javascript
document.addEventListener('keydown', function(event) {
  // Запобігаємо оновленню сторінки при натисканні F5
  if (event.key === 'F5') {
    event.preventDefault();
    console.log('Оновлення сторінки заблоковано');
  }
  
  // Запобігаємо збереженню сторінки при натисканні Ctrl+S
  if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    console.log('Збереження сторінки заблоковано');
  }
});
```

## Обробка спеціальних клавіш

### Клавіші-модифікатори

Клавіші-модифікатори (Shift, Alt, Ctrl, Meta) можна відстежувати як самостійно, так і в комбінації з іншими клавішами:

```javascript
document.addEventListener('keydown', function(event) {
  if (event.key === 'Shift') {
    console.log('Натиснуто Shift');
  }
  
  if (event.key === 'Control') {
    console.log('Натиснуто Control');
  }
});
```

### Клавіші навігації

Клавіші стрілок, Page Up, Page Down, Home, End:

```javascript
document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case 'ArrowUp':
      console.log('Стрілка вгору');
      break;
    case 'ArrowDown':
      console.log('Стрілка вниз');
      break;
    case 'ArrowLeft':
      console.log('Стрілка вліво');
      break;
    case 'ArrowRight':
      console.log('Стрілка вправо');
      break;
    case 'PageUp':
      console.log('Page Up');
      break;
    case 'PageDown':
      console.log('Page Down');
      break;
    case 'Home':
      console.log('Home');
      break;
    case 'End':
      console.log('End');
      break;
  }
});
```

### Функціональні клавіші

F1-F12:

```javascript
document.addEventListener('keydown', function(event) {
  if (event.key.match(/^F\d+$/)) {
    console.log(`Натиснуто ${event.key}`);
    event.preventDefault(); // Запобігаємо стандартній поведінці
  }
});
```

## Повторення клавіш при утриманні

Властивість `repeat` дозволяє визначити, чи є подія результатом автоматичного повторення при утриманні клавіші:

```javascript
document.addEventListener('keydown', function(event) {
  if (event.repeat) {
    console.log(`Клавіша ${event.key} утримується`);
  } else {
    console.log(`Клавіша ${event.key} натиснута вперше`);
  }
});
```

## Фокус і події клавіатури

Події клавіатури виникають на елементі, який має фокус. За замовчуванням, це може бути:
- Активний елемент форми (input, textarea, select)
- Елемент з атрибутом tabindex
- Документ в цілому

```javascript
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

input.addEventListener('keydown', function(event) {
  console.log(`Input: натиснуто ${event.key}`);
});

textarea.addEventListener('keydown', function(event) {
  console.log(`Textarea: натиснуто ${event.key}`);
});

// Події на документі виникають завжди, незалежно від фокусу
document.addEventListener('keydown', function(event) {
  console.log(`Document: натиснуто ${event.key}`);
});
```

## Приклади використання подій клавіатури

### 1. Керування грою за допомогою клавіатури

```javascript
const player = document.querySelector('.player');
let x = 0, y = 0;
const step = 10;

document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case 'ArrowUp':
      y -= step;
      break;
    case 'ArrowDown':
      y += step;
      break;
    case 'ArrowLeft':
      x -= step;
      break;
    case 'ArrowRight':
      x += step;
      break;
  }
  
  player.style.transform = `translate(${x}px, ${y}px)`;
  event.preventDefault(); // Запобігаємо прокрутці сторінки
});
```

### 2. Гарячі клавіші для веб-додатка

```javascript
document.addEventListener('keydown', function(event) {
  // Ctrl+N або Command+N - створення нового документа
  if (event.code === 'KeyN' && (event.ctrlKey || event.metaKey)) {
    createNewDocument();
    event.preventDefault();
  }
  
  // Ctrl+O або Command+O - відкриття документа
  if (event.code === 'KeyO' && (event.ctrlKey || event.metaKey)) {
    openDocument();
    event.preventDefault();
  }
  
  // Ctrl+S або Command+S - збереження документа
  if (event.code === 'KeyS' && (event.ctrlKey || event.metaKey)) {
    saveDocument();
    event.preventDefault();
  }
  
  // Escape - закриття модального вікна
  if (event.key === 'Escape') {
    closeModal();
  }
});

function createNewDocument() { console.log('Створення нового документа'); }
function openDocument() { console.log('Відкриття документа'); }
function saveDocument() { console.log('Збереження документа'); }
function closeModal() { console.log('Закриття модального вікна'); }
```

### 3. Валідація введення в полі форми

```javascript
const numberInput = document.querySelector('.number-input');

numberInput.addEventListener('keydown', function(event) {
  // Дозволяємо: цифри, backspace, delete, стрілки, home, end
  if (
    /^\d$/.test(event.key) || // Цифри
    event.key === 'Backspace' || 
    event.key === 'Delete' || 
    event.key === 'ArrowLeft' || 
    event.key === 'ArrowRight' || 
    event.key === 'Home' || 
    event.key === 'End'
  ) {
    // Дозволяємо стандартну поведінку
    return;
  }
  
  // Блокуємо введення всіх інших символів
  event.preventDefault();
});
```

### 4. Обробка введення в текстовому редакторі

```javascript
const editor = document.querySelector('.editor');

editor.addEventListener('keydown', function(event) {
  // Ctrl+B або Command+B - жирний текст
  if (event.code === 'KeyB' && (event.ctrlKey || event.metaKey)) {
    document.execCommand('bold');
    event.preventDefault();
  }
  
  // Ctrl+I або Command+I - курсив
  if (event.code === 'KeyI' && (event.ctrlKey || event.metaKey)) {
    document.execCommand('italic');
    event.preventDefault();
  }
  
  // Tab - вставка табуляції
  if (event.key === 'Tab') {
    document.execCommand('insertText', false, '    ');
    event.preventDefault();
  }
});
```

## Кросбраузерна сумісність

При роботі з подіями клавіатури важливо враховувати кросбраузерні відмінності:

- Властивості `key` і `code` підтримуються в сучасних браузерах, але можуть мати відмінності
- Застарілі властивості `keyCode` і `which` можуть знадобитися для підтримки старих браузерів
- Деякі комбінації клавіш можуть бути зарезервовані операційною системою або браузером

```javascript
// Кросбраузерна функція для отримання коду клавіші
function getKeyCode(event) {
  return event.key || event.keyCode || event.which;
}

document.addEventListener('keydown', function(event) {
  const key = getKeyCode(event);
  console.log(`Натиснута клавіша: ${key}`);
});
```

## Найкращі практики

1. **Використовуйте `key` і `code` замість застарілих `keyCode` і `which`**
2. **Перевіряйте підтримку браузерами** властивостей подій клавіатури
3. **Враховуйте різні розкладки клавіатури** - використовуйте `code` для фізичних клавіш і `key` для символів
4. **Не блокуйте важливі комбінації клавіш** без вагомої причини
5. **Надавайте альтернативні способи взаємодії** для користувачів, які не можуть використовувати клавіатуру
6. **Використовуйте `event.preventDefault()` обережно**, щоб не порушити стандартну функціональність
7. **Враховуйте особливості мобільних пристроїв**, де віртуальна клавіатура може працювати інакше

У наступному розділі ми розглянемо події форм та їх особливості.
