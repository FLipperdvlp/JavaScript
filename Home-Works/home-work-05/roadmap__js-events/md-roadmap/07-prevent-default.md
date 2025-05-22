# Запобігання стандартній поведінці в JavaScript

Багато елементів HTML мають стандартну (вбудовану) поведінку, яку браузер виконує автоматично:
- Клік по посиланню (`<a>`) переводить на нову сторінку
- Відправка форми (`<form>`) перезавантажує сторінку
- Клік правою кнопкою миші відкриває контекстне меню
- Натискання на чекбокс змінює його стан
- Перетягування тексту виділяє його

Іноді нам потрібно запобігти цій стандартній поведінці і реалізувати власну логіку. Для цього використовується метод `event.preventDefault()`.

## Метод preventDefault()

Метод `preventDefault()` скасовує стандартну дію браузера для події, якщо вона скасовувана (має властивість `cancelable: true`).

```javascript
element.addEventListener("event", function(event) {
  event.preventDefault();
  // Власна логіка обробки події
});
```

## Приклади використання preventDefault()

### 1. Запобігання переходу за посиланням

```html
<a href="https://example.com" id="myLink">Посилання з власною обробкою</a>
```

```javascript
document.getElementById('myLink').addEventListener('click', function(event) {
  event.preventDefault(); // Запобігаємо переходу за посиланням
  console.log('Клік по посиланню, але перехід не відбувся');
  
  // Власна логіка, наприклад, відкриття в модальному вікні
  showModal('https://example.com');
});
```

### 2. Запобігання відправці форми

```html
<form id="myForm">
  <input type="text" name="username" required>
  <button type="submit">Відправити</button>
</form>
```

```javascript
document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Запобігаємо стандартній відправці форми
  
  // Власна логіка валідації та відправки даних
  const formData = new FormData(this);
  
  fetch('/api/submit', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => console.log('Успіх:', data))
  .catch(error => console.error('Помилка:', error));
});
```

### 3. Запобігання контекстному меню

```javascript
document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); // Запобігаємо відкриттю стандартного контекстного меню
  
  // Власне контекстне меню
  showCustomContextMenu(event.clientX, event.clientY);
});
```

### 4. Запобігання виділенню тексту

```javascript
document.querySelector('.no-select').addEventListener('mousedown', function(event) {
  event.preventDefault(); // Запобігаємо виділенню тексту
});
```

### 5. Запобігання перетягуванню зображень

```javascript
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('dragstart', function(event) {
    event.preventDefault(); // Запобігаємо перетягуванню зображень
  });
});
```

## Перевірка можливості скасування події

Не всі події можна скасувати. Перед викликом `preventDefault()` можна перевірити, чи можна скасувати подію за допомогою властивості `event.cancelable`:

```javascript
element.addEventListener('click', function(event) {
  if (event.cancelable) {
    event.preventDefault();
  }
  // Продовження обробки події
});
```

## Повернення false з обробника події

У старому коді можна зустріти інший спосіб запобігання стандартній поведінці - повернення `false` з обробника події:

```javascript
// Старий спосіб (не рекомендується)
element.onclick = function() {
  // Логіка обробки
  return false; // Запобігає стандартній поведінці
};
```

Цей підхід має кілька недоліків:
1. Працює тільки для обробників, призначених через властивості (не працює з `addEventListener`)
2. Зупиняє не тільки стандартну дію, але і спливання події (як `event.preventDefault()` + `event.stopPropagation()`)
3. Менш явний і може призвести до помилок

**Рекомендується завжди використовувати `event.preventDefault()`.**

## Застосування preventDefault() з різними типами подій

### Події форм

```javascript
// Запобігання відправці форми
form.addEventListener('submit', function(event) {
  event.preventDefault();
});

// Запобігання зміні значення поля введення
input.addEventListener('input', function(event) {
  if (someCondition) {
    event.preventDefault();
  }
});

// Запобігання фокусуванню на елементі
element.addEventListener('focus', function(event) {
  event.preventDefault();
});
```

### Події миші

```javascript
// Запобігання подвійному кліку (і виділенню тексту)
element.addEventListener('dblclick', function(event) {
  event.preventDefault();
});

// Запобігання контекстному меню
element.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// Запобігання перетягуванню елемента
element.addEventListener('dragstart', function(event) {
  event.preventDefault();
});
```

### Події клавіатури

```javascript
// Запобігання дії клавіші
document.addEventListener('keydown', function(event) {
  // Запобігаємо дії клавіші F5 (оновлення сторінки)
  if (event.key === 'F5') {
    event.preventDefault();
    console.log('Оновлення сторінки заблоковано');
  }
  
  // Запобігаємо дії Ctrl+S (збереження сторінки)
  if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    console.log('Збереження сторінки заблоковано');
  }
});
```

### Події сенсорних пристроїв

```javascript
// Запобігання масштабуванню на сенсорних пристроях
element.addEventListener('touchmove', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Запобігаємо масштабуванню двома пальцями
  }
});
```

## Опція passive для обробників подій

Для покращення продуктивності, особливо на мобільних пристроях, браузери можуть починати обробку деяких подій (наприклад, `touchstart`, `touchmove`) паралельно з виконанням JavaScript. Це може призвести до проблем, якщо JavaScript викликає `preventDefault()`.

Щоб уникнути цього, була введена опція `passive` для `addEventListener`:

```javascript
element.addEventListener('touchmove', function(event) {
  // event.preventDefault(); // Це не спрацює!
}, { passive: true });
```

Якщо `passive: true`, то браузер знає, що обробник не буде викликати `preventDefault()`, і може почати обробку події негайно, не чекаючи завершення виконання JavaScript.

## Найкращі практики

1. **Використовуйте preventDefault() замість return false**
2. **Перевіряйте event.cancelable перед викликом preventDefault()**
3. **Використовуйте опцію passive для подій прокрутки та дотику**
4. **Не зловживайте preventDefault()** - використовуйте тільки коли дійсно потрібно змінити стандартну поведінку
5. **Надавайте користувачам зрозумілий зворотний зв'язок**, коли ви змінюєте стандартну поведінку

## Висновок

Метод `preventDefault()` - потужний інструмент для контролю над стандартною поведінкою браузера. Він дозволяє створювати власні інтерфейси та взаємодії, які відрізняються від стандартних. Однак важливо використовувати його обережно, щоб не порушити очікування користувачів і не погіршити доступність сайту.

У наступному розділі ми детальніше розглянемо події миші та їх особливості.
