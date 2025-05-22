# Делегування подій в JavaScript

Делегування подій (Event Delegation) - це потужний патерн проектування в JavaScript, який базується на принципі спливання подій. Замість того, щоб призначати обробники кожному елементу, ми призначаємо один обробник їх спільному предку і визначаємо, на якому саме елементі відбулася подія.

## Принцип делегування подій

Основна ідея делегування подій полягає в тому, що:

1. Ми розміщуємо один обробник на спільному предку елементів
2. В обробнику ми визначаємо, на якому конкретно елементі відбулася подія за допомогою `event.target`
3. Обробляємо подію відповідно до елемента, на якому вона відбулася

## Переваги делегування подій

Делегування подій має ряд суттєвих переваг:

1. **Економія пам'яті** - замість багатьох обробників використовується один
2. **Динамічні елементи** - працює з елементами, які додаються динамічно після завантаження сторінки
3. **Менше коду** - не потрібно писати код для кожного елемента
4. **Централізоване управління** - логіка обробки подій зосереджена в одному місці
5. **Кращий контроль** - можна легко вмикати/вимикати обробку подій для всіх елементів одночасно

## Базовий приклад делегування подій

Розглянемо приклад списку, де ми хочемо обробляти кліки на кожному елементі:

```html
<ul id="menu">
  <li data-action="save">Зберегти</li>
  <li data-action="load">Завантажити</li>
  <li data-action="search">Пошук</li>
</ul>
```

### Без делегування подій

```javascript
// Без делегування - призначаємо обробник кожному елементу
document.querySelectorAll('#menu li').forEach(item => {
  item.addEventListener('click', function() {
    const action = this.dataset.action;
    console.log('Вибрана дія:', action);
  });
});
```

### З делегуванням подій

```javascript
// З делегуванням - один обробник на батьківському елементі
document.getElementById('menu').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    const action = event.target.dataset.action;
    console.log('Вибрана дія:', action);
  }
});
```

## Практичні приклади делегування подій

### Приклад 1: Таблиця з сортуванням

```html
<table id="data-table">
  <thead>
    <tr>
      <th data-sort="name">Ім'я</th>
      <th data-sort="age">Вік</th>
      <th data-sort="city">Місто</th>
    </tr>
  </thead>
  <tbody>
    <!-- Дані таблиці -->
  </tbody>
</table>
```

```javascript
document.getElementById('data-table').addEventListener('click', function(event) {
  const th = event.target.closest('th');
  if (th && th.dataset.sort) {
    const sortBy = th.dataset.sort;
    console.log('Сортування за:', sortBy);
    // Логіка сортування таблиці
  }
});
```

### Приклад 2: Галерея зображень

```html
<div id="gallery">
  <img src="image1.jpg" data-full="image1-full.jpg" alt="Image 1">
  <img src="image2.jpg" data-full="image2-full.jpg" alt="Image 2">
  <img src="image3.jpg" data-full="image3-full.jpg" alt="Image 3">
</div>
```

```javascript
document.getElementById('gallery').addEventListener('click', function(event) {
  if (event.target.tagName === 'IMG') {
    const fullImageSrc = event.target.dataset.full;
    console.log('Відкриття повного зображення:', fullImageSrc);
    // Логіка відкриття повного зображення
  }
});
```

### Приклад 3: Динамічний список завдань

```html
<div id="todo-app">
  <input type="text" id="new-task">
  <button id="add-task">Додати</button>
  <ul id="tasks">
    <!-- Завдання будуть додаватися динамічно -->
  </ul>
</div>
```

```javascript
// Додавання нового завдання
document.getElementById('add-task').addEventListener('click', function() {
  const taskText = document.getElementById('new-task').value;
  if (taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
      ${taskText}
      <button class="delete">Видалити</button>
      <button class="complete">Виконано</button>
    `;
    document.getElementById('tasks').appendChild(li);
    document.getElementById('new-task').value = '';
  }
});

// Делегування подій для кнопок у завданнях
document.getElementById('tasks').addEventListener('click', function(event) {
  if (event.target.className === 'delete') {
    // Видалення завдання
    event.target.closest('li').remove();
  } else if (event.target.className === 'complete') {
    // Позначення завдання як виконаного
    event.target.closest('li').classList.toggle('completed');
  }
});
```

## Метод closest() для делегування подій

Метод `element.closest(selector)` шукає найближчий батьківський елемент, який відповідає селектору, включаючи сам елемент. Це дуже корисно для делегування подій:

```javascript
document.getElementById('menu').addEventListener('click', function(event) {
  // Знаходимо найближчий елемент li від місця кліку
  const item = event.target.closest('li');
  if (item && this.contains(item)) {
    const action = item.dataset.action;
    console.log('Вибрана дія:', action);
  }
});
```

Метод `contains` перевіряє, чи є елемент нащадком іншого елемента, що допомагає уникнути обробки подій для елементів, які не належать до нашого контейнера.

## Фільтрація цільових елементів

При делегуванні подій важливо правильно визначити, на якому елементі відбулася подія. Для цього можна використовувати різні підходи:

### 1. Перевірка тегу

```javascript
if (event.target.tagName === 'LI') {
  // Обробка кліку на елементі списку
}
```

### 2. Перевірка класу

```javascript
if (event.target.classList.contains('item')) {
  // Обробка кліку на елементі з класом 'item'
}
```

### 3. Перевірка атрибута

```javascript
if (event.target.hasAttribute('data-action')) {
  // Обробка кліку на елементі з атрибутом 'data-action'
}
```

### 4. Використання селектора з closest

```javascript
const button = event.target.closest('button.action');
if (button) {
  // Обробка кліку на кнопці з класом 'action'
}
```

## Обмеження делегування подій

Делегування подій має деякі обмеження:

1. **Не всі події спливають** - наприклад, `focus`, `blur`, `mouseenter`, `mouseleave` не спливають, тому їх не можна делегувати стандартним способом
2. **Складність з деякими подіями** - наприклад, `mouseenter`/`mouseleave` можна емулювати за допомогою `mouseover`/`mouseout` з додатковою логікою
3. **Додаткова логіка** - потрібна додаткова логіка для визначення цільового елемента

## Найкращі практики

1. **Використовуйте data-атрибути** для зберігання додаткової інформації про елементи
2. **Перевіряйте, чи належить цільовий елемент до контейнера** за допомогою `contains`
3. **Використовуйте метод closest()** для пошуку потрібного елемента
4. **Розділяйте логіку** визначення елемента і обробки події
5. **Будьте обережні з подіями, які не спливають**

## Висновок

Делегування подій - це потужний патерн, який дозволяє ефективно обробляти події для багатьох елементів, включаючи динамічно створені. Він базується на принципі спливання подій і дозволяє значно оптимізувати код та покращити продуктивність веб-додатків.

У наступному розділі ми розглянемо, як запобігати стандартній поведінці браузера при обробці подій.
