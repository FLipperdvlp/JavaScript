# Події миші в JavaScript

Події миші (Mouse Events) - це група подій, які виникають при взаємодії користувача з мишею. Вони дозволяють відстежувати рух курсора, натискання кнопок миші та інші дії, пов'язані з мишею.

## Основні типи подій миші

### Кліки

- **click** - виникає, коли користувач натискає і відпускає ліву кнопку миші на елементі
- **dblclick** - виникає при подвійному кліку лівою кнопкою миші
- **contextmenu** - виникає при кліку правою кнопкою миші (перед відкриттям контекстного меню)

### Натискання та відпускання кнопок

- **mousedown** - виникає, коли користувач натискає кнопку миші на елементі
- **mouseup** - виникає, коли користувач відпускає кнопку миші

### Рух миші

- **mousemove** - виникає при русі миші над елементом
- **mouseover** - виникає, коли курсор миші входить в межі елемента
- **mouseout** - виникає, коли курсор миші виходить за межі елемента
- **mouseenter** - виникає, коли курсор миші входить в межі елемента (не спливає)
- **mouseleave** - виникає, коли курсор миші виходить за межі елемента (не спливає)

### Колесо миші

- **wheel** - виникає при прокручуванні колеса миші

## Порядок подій миші

При взаємодії з елементом за допомогою миші події відбуваються в такому порядку:

1. **mousedown** - натискання кнопки миші
2. **mouseup** - відпускання кнопки миші
3. **click** - якщо натискання і відпускання відбулося на одному елементі
4. **dblclick** - якщо відбулося два кліки підряд за короткий проміжок часу

```javascript
const button = document.querySelector('.button');

button.addEventListener('mousedown', () => console.log('mousedown'));
button.addEventListener('mouseup', () => console.log('mouseup'));
button.addEventListener('click', () => console.log('click'));
button.addEventListener('dblclick', () => console.log('dblclick'));

// При подвійному кліку виведеться:
// mousedown
// mouseup
// click
// mousedown
// mouseup
// click
// dblclick
```

## Об'єкт події миші (MouseEvent)

Об'єкт події миші містить інформацію про подію, що сталася:

### Координати миші

- **clientX/clientY** - координати відносно вікна браузера (viewport)
- **pageX/pageY** - координати відносно документа (з урахуванням прокрутки)
- **screenX/screenY** - координати відносно екрану
- **offsetX/offsetY** - координати відносно елемента, на якому відбулася подія
- **movementX/movementY** - різниця між поточними і попередніми координатами (тільки для mousemove)

```javascript
document.addEventListener('mousemove', function(event) {
  console.log(`
    Client: ${event.clientX}, ${event.clientY}
    Page: ${event.pageX}, ${event.pageY}
    Screen: ${event.screenX}, ${event.screenY}
  `);
});
```

### Інформація про кнопки миші

- **button** - яка кнопка миші була натиснута:
  - 0: ліва кнопка
  - 1: середня кнопка (колесо)
  - 2: права кнопка
  - 3: кнопка "назад"
  - 4: кнопка "вперед"

- **buttons** - бітова маска натиснутих кнопок (для mousedown, mousemove, mouseup):
  - 0: жодна кнопка не натиснута
  - 1: ліва кнопка
  - 2: права кнопка
  - 4: середня кнопка
  - 8: кнопка "назад"
  - 16: кнопка "вперед"

```javascript
document.addEventListener('mousedown', function(event) {
  console.log(`Натиснута кнопка: ${event.button}`);
  console.log(`Бітова маска кнопок: ${event.buttons}`);
});
```

### Клавіші-модифікатори

- **shiftKey** - чи була натиснута клавіша Shift
- **altKey** - чи була натиснута клавіша Alt (або Option на Mac)
- **ctrlKey** - чи була натиснута клавіша Ctrl
- **metaKey** - чи була натиснута клавіша Meta (Command на Mac, Windows на Windows)

```javascript
document.addEventListener('click', function(event) {
  if (event.shiftKey) console.log('Shift + клік');
  if (event.altKey) console.log('Alt + клік');
  if (event.ctrlKey) console.log('Ctrl + клік');
  if (event.metaKey) console.log('Meta + клік');
});
```

### Додаткові властивості

- **relatedTarget** - елемент, з/на який переходить курсор (для mouseover/mouseout)
- **which** - застаріла властивість, аналогічна button
- **detail** - додаткова інформація (наприклад, кількість кліків для click/dblclick)

## Різниця між mouseover/mouseout і mouseenter/mouseleave

Пари подій mouseover/mouseout і mouseenter/mouseleave схожі, але мають важливі відмінності:

### mouseover/mouseout

- Спливають (bubbling)
- Спрацьовують при переході між дочірніми елементами

### mouseenter/mouseleave

- Не спливають (no bubbling)
- Не спрацьовують при переході між дочірніми елементами
- Спрацьовують тільки при вході/виході з самого елемента

```html
<div class="parent">
  Батьківський елемент
  <div class="child">Дочірній елемент</div>
</div>
```

```javascript
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

// mouseover/mouseout
parent.addEventListener('mouseover', () => console.log('parent: mouseover'));
parent.addEventListener('mouseout', () => console.log('parent: mouseout'));
child.addEventListener('mouseover', () => console.log('child: mouseover'));
child.addEventListener('mouseout', () => console.log('child: mouseout'));

// mouseenter/mouseleave
parent.addEventListener('mouseenter', () => console.log('parent: mouseenter'));
parent.addEventListener('mouseleave', () => console.log('parent: mouseleave'));
child.addEventListener('mouseenter', () => console.log('child: mouseenter'));
child.addEventListener('mouseleave', () => console.log('child: mouseleave'));
```

При переміщенні курсора з батьківського елемента на дочірній:
- Спрацює `child: mouseover`, потім `parent: mouseout`
- `parent: mouseleave` не спрацює, оскільки курсор все ще в межах батьківського елемента

## Подія wheel

Подія `wheel` виникає при прокручуванні колеса миші. Вона надає інформацію про напрямок і величину прокрутки:

```javascript
element.addEventListener('wheel', function(event) {
  console.log(`
    deltaX: ${event.deltaX}
    deltaY: ${event.deltaY}
    deltaZ: ${event.deltaZ}
    deltaMode: ${event.deltaMode}
  `);
  
  // Запобігання стандартній прокрутці
  event.preventDefault();
});
```

Властивості:
- **deltaX** - горизонтальна прокрутка
- **deltaY** - вертикальна прокрутка (найчастіше використовується)
- **deltaZ** - прокрутка по осі Z (рідко використовується)
- **deltaMode** - одиниці виміру для значень delta:
  - 0: пікселі
  - 1: рядки
  - 2: сторінки

## Перетягування елементів (Drag and Drop)

JavaScript надає можливість реалізувати перетягування елементів за допомогою подій миші:

```javascript
const element = document.querySelector('.draggable');
let isDragging = false;
let offsetX, offsetY;

element.addEventListener('mousedown', function(event) {
  isDragging = true;
  
  // Запам'ятовуємо зміщення курсора відносно елемента
  offsetX = event.clientX - element.getBoundingClientRect().left;
  offsetY = event.clientY - element.getBoundingClientRect().top;
  
  // Запобігаємо виділенню тексту при перетягуванні
  event.preventDefault();
});

document.addEventListener('mousemove', function(event) {
  if (!isDragging) return;
  
  // Оновлюємо позицію елемента
  element.style.left = (event.clientX - offsetX) + 'px';
  element.style.top = (event.clientY - offsetY) + 'px';
});

document.addEventListener('mouseup', function() {
  isDragging = false;
});
```

## Запобігання виділенню тексту

При реалізації інтерактивних елементів часто потрібно запобігти виділенню тексту:

```javascript
element.addEventListener('mousedown', function(event) {
  // Запобігаємо виділенню тексту
  event.preventDefault();
  
  // Інша логіка обробки події
});
```

Або за допомогою CSS:

```css
.no-select {
  user-select: none;
}
```

## Запобігання стандартній поведінці контекстного меню

Для створення власного контекстного меню:

```javascript
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  
  const customMenu = document.querySelector('.custom-context-menu');
  customMenu.style.display = 'block';
  customMenu.style.left = event.clientX + 'px';
  customMenu.style.top = event.clientY + 'px';
});

// Закриття меню при кліку в будь-якому місці
document.addEventListener('click', function() {
  document.querySelector('.custom-context-menu').style.display = 'none';
});
```

## Приклади використання подій миші

### 1. Слідкування за курсором

```javascript
const follower = document.querySelector('.follower');

document.addEventListener('mousemove', function(event) {
  follower.style.left = (event.clientX - follower.offsetWidth / 2) + 'px';
  follower.style.top = (event.clientY - follower.offsetHeight / 2) + 'px';
});
```

### 2. Інтерактивна галерея зображень

```javascript
const gallery = document.querySelector('.gallery');
let startX;
let scrollLeft;

gallery.addEventListener('mousedown', function(event) {
  startX = event.clientX;
  scrollLeft = gallery.scrollLeft;
  gallery.classList.add('active');
});

gallery.addEventListener('mousemove', function(event) {
  if (!gallery.classList.contains('active')) return;
  
  const x = event.clientX;
  const walk = (x - startX) * 2; // Швидкість прокрутки
  gallery.scrollLeft = scrollLeft - walk;
});

gallery.addEventListener('mouseup', function() {
  gallery.classList.remove('active');
});

gallery.addEventListener('mouseleave', function() {
  gallery.classList.remove('active');
});
```

### 3. Малювання на полотні (Canvas)

```javascript
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', function(event) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(
    event.clientX - canvas.getBoundingClientRect().left,
    event.clientY - canvas.getBoundingClientRect().top
  );
});

canvas.addEventListener('mousemove', function(event) {
  if (!isDrawing) return;
  
  ctx.lineTo(
    event.clientX - canvas.getBoundingClientRect().left,
    event.clientY - canvas.getBoundingClientRect().top
  );
  ctx.stroke();
});

canvas.addEventListener('mouseup', function() {
  isDrawing = false;
});

canvas.addEventListener('mouseleave', function() {
  isDrawing = false;
});
```

## Найкращі практики

1. **Використовуйте делегування подій** для ефективної обробки подій миші на багатьох елементах
2. **Обмежуйте кількість обробників mousemove** для покращення продуктивності
3. **Використовуйте requestAnimationFrame** для плавної анімації при обробці подій миші
4. **Враховуйте мобільні пристрої** - додавайте підтримку сенсорних подій
5. **Запобігайте виділенню тексту** при реалізації перетягування елементів
6. **Використовуйте mouseenter/mouseleave** замість mouseover/mouseout, якщо не потрібне спливання подій

У наступному розділі ми розглянемо події клавіатури та їх особливості.
