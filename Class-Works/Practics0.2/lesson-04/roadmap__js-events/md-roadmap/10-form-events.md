# Події форм в JavaScript

Події форм (Form Events) виникають при взаємодії користувача з елементами форм. Вони дозволяють відстежувати введення даних, зміну значень, відправку форм та інші дії, пов'язані з формами.

## Основні типи подій форм

### Події форми в цілому

- **submit** - виникає при відправці форми (натискання кнопки типу submit або Enter в полі введення)
- **reset** - виникає при скиданні форми (натискання кнопки типу reset)

### Події елементів форми

- **focus** - виникає, коли елемент отримує фокус
- **blur** - виникає, коли елемент втрачає фокус
- **change** - виникає, коли значення елемента змінюється і елемент втрачає фокус
- **input** - виникає при кожній зміні значення елемента (в реальному часі)
- **select** - виникає, коли користувач виділяє текст в полі введення
- **reset** - виникає при скиданні значення елемента форми

## Подія submit

Подія `submit` виникає при відправці форми. Це може відбутися при:
- Натисканні кнопки типу submit
- Натисканні клавіші Enter в полі введення (якщо форма має тільки одне поле або кнопку submit)

```html
<form id="myForm">
  <input type="text" name="username" required>
  <button type="submit">Відправити</button>
</form>
```

```javascript
document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Запобігаємо стандартній відправці форми
  
  // Отримання даних форми
  const formData = new FormData(this);
  const username = formData.get('username');
  
  console.log('Форма відправлена. Ім\'я користувача:', username);
  
  // Відправка даних на сервер
  fetch('/api/submit', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => console.log('Успіх:', data))
  .catch(error => console.error('Помилка:', error));
});
```

### Запобігання стандартній відправці форми

За замовчуванням, відправка форми призводить до перезавантаження сторінки або переходу на URL, вказаний в атрибуті `action`. Для запобігання цьому використовується метод `preventDefault()`:

```javascript
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки
  // Власна логіка обробки форми
});
```

## Подія reset

Подія `reset` виникає при скиданні форми до початкових значень. Це може відбутися при:
- Натисканні кнопки типу reset
- Виклику методу `form.reset()`

```html
<form id="myForm">
  <input type="text" name="username">
  <button type="reset">Скинути</button>
</form>
```

```javascript
document.getElementById('myForm').addEventListener('reset', function(event) {
  console.log('Форма скинута');
  // Можна запобігти скиданню форми
  // event.preventDefault();
});
```

## Події focus і blur

- **focus** - виникає, коли елемент отримує фокус (при кліку на елемент, переході за допомогою Tab, або виклику метода `element.focus()`)
- **blur** - виникає, коли елемент втрачає фокус (при кліку на інший елемент, переході за допомогою Tab, або виклику метода `element.blur()`)

```javascript
const input = document.querySelector('input');

input.addEventListener('focus', function() {
  console.log('Поле отримало фокус');
  this.style.backgroundColor = 'lightyellow';
});

input.addEventListener('blur', function() {
  console.log('Поле втратило фокус');
  this.style.backgroundColor = '';
  
  // Валідація при втраті фокусу
  if (this.value.trim() === '') {
    this.style.borderColor = 'red';
  } else {
    this.style.borderColor = 'green';
  }
});
```

### Спливання подій focus і blur

Події `focus` і `blur` не спливають (не bubbling). Для відстеження цих подій на батьківських елементах використовуються події `focusin` і `focusout`, які спливають:

```javascript
const form = document.querySelector('form');

// Не спрацює для дочірніх елементів через відсутність спливання
form.addEventListener('focus', function() {
  console.log('focus на формі'); // Спрацює тільки якщо сама форма отримає фокус
}, true);

// Спрацює для всіх дочірніх елементів
form.addEventListener('focusin', function(event) {
  console.log('focusin на формі, цільовий елемент:', event.target);
});
```

## Подія change

Подія `change` виникає, коли значення елемента змінюється і елемент втрачає фокус. Поведінка залежить від типу елемента:

- Для `<input type="text">`, `<textarea>` - виникає при зміні значення і втраті фокусу
- Для `<select>`, `<input type="checkbox">`, `<input type="radio">` - виникає відразу при зміні значення

```javascript
const textInput = document.querySelector('input[type="text"]');
const checkbox = document.querySelector('input[type="checkbox"]');
const select = document.querySelector('select');

textInput.addEventListener('change', function() {
  console.log('Текстове поле змінено:', this.value);
});

checkbox.addEventListener('change', function() {
  console.log('Чекбокс змінено:', this.checked);
});

select.addEventListener('change', function() {
  console.log('Вибір змінено:', this.value);
});
```

## Подія input

Подія `input` виникає при кожній зміні значення елемента в реальному часі (при кожному натисканні клавіші, вставці тексту тощо). На відміну від `change`, не потрібно чекати втрати фокусу.

```javascript
const textInput = document.querySelector('input[type="text"]');
const output = document.querySelector('.output');

textInput.addEventListener('input', function() {
  output.textContent = this.value;
  console.log('Введено:', this.value);
});
```

### Відмінності між input і change

| Подія | Коли виникає | Використання |
|-------|--------------|--------------|
| input | При кожній зміні значення | Для миттєвого відгуку на введення користувача |
| change | При зміні значення і втраті фокусу | Для обробки завершеного введення |

## Подія select

Подія `select` виникає, коли користувач виділяє текст в полі введення:

```javascript
const textInput = document.querySelector('input[type="text"]');

textInput.addEventListener('select', function() {
  const start = this.selectionStart;
  const end = this.selectionEnd;
  const selectedText = this.value.substring(start, end);
  
  console.log(`Виділено текст: "${selectedText}" (позиції ${start}-${end})`);
});
```

### Властивості selectionStart і selectionEnd

Ці властивості дозволяють отримати початкову і кінцеву позиції виділеного тексту:

```javascript
// Отримання виділеного тексту
function getSelectedText(input) {
  return input.value.substring(input.selectionStart, input.selectionEnd);
}

// Встановлення виділення
function setSelection(input, start, end) {
  input.focus();
  input.setSelectionRange(start, end);
}
```

## Отримання даних форми

### Використання FormData

Об'єкт `FormData` дозволяє легко отримати всі дані форми:

```javascript
document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  
  // Отримання окремих значень
  const username = formData.get('username');
  const email = formData.get('email');
  
  // Перебір всіх значень
  for (const [name, value] of formData.entries()) {
    console.log(`${name}: ${value}`);
  }
  
  // Перетворення в об'єкт
  const formObject = Object.fromEntries(formData.entries());
  console.log(formObject);
});
```

### Отримання значень окремих елементів

```javascript
// Отримання значення текстового поля
const username = document.querySelector('input[name="username"]').value;

// Отримання значення чекбокса
const isSubscribed = document.querySelector('input[name="subscribe"]').checked;

// Отримання значення радіокнопки
const selectedGender = document.querySelector('input[name="gender"]:checked').value;

// Отримання значення випадаючого списку
const selectedCountry = document.querySelector('select[name="country"]').value;

// Отримання значення текстової області
const comments = document.querySelector('textarea[name="comments"]').value;
```

## Валідація форм

### Вбудована валідація HTML5

HTML5 надає атрибути для базової валідації форм:

```html
<form id="myForm">
  <input type="text" name="username" required minlength="3" maxlength="20">
  <input type="email" name="email" required>
  <input type="number" name="age" min="18" max="100">
  <input type="tel" name="phone" pattern="[0-9]{10}">
  <button type="submit">Відправити</button>
</form>
```

### Перевірка валідності в JavaScript

```javascript
document.getElementById('myForm').addEventListener('submit', function(event) {
  const usernameInput = this.elements.username;
  const emailInput = this.elements.email;
  
  // Перевірка валідності окремого поля
  if (!usernameInput.validity.valid) {
    event.preventDefault();
    showError(usernameInput, 'Будь ласка, введіть коректне ім\'я користувача');
  }
  
  // Перевірка валідності всієї форми
  if (!this.checkValidity()) {
    event.preventDefault();
    console.log('Форма містить помилки');
  }
});

function showError(input, message) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}
```

### Властивості об'єкта validity

Об'єкт `validity` містить інформацію про валідність поля:

- **valid** - `true`, якщо поле валідне
- **valueMissing** - `true`, якщо поле має атрибут `required` і порожнє
- **typeMismatch** - `true`, якщо значення не відповідає типу поля (наприклад, невалідний email)
- **patternMismatch** - `true`, якщо значення не відповідає патерну
- **tooLong** / **tooShort** - `true`, якщо значення занадто довге/коротке
- **rangeUnderflow** / **rangeOverflow** - `true`, якщо значення менше/більше допустимого
- **stepMismatch** - `true`, якщо значення не відповідає кроку
- **badInput** - `true`, якщо браузер не може перетворити введення в допустиме значення

```javascript
input.addEventListener('input', function() {
  if (this.validity.typeMismatch) {
    this.setCustomValidity('Будь ласка, введіть коректний email');
  } else {
    this.setCustomValidity('');
  }
});
```

## Приклади використання подій форм

### 1. Валідація форми в реальному часі

```javascript
const form = document.getElementById('registrationForm');
const inputs = form.querySelectorAll('input, select, textarea');

// Валідація при введенні
inputs.forEach(input => {
  input.addEventListener('input', function() {
    validateInput(this);
  });
});

// Валідація при втраті фокусу
inputs.forEach(input => {
  input.addEventListener('blur', function() {
    validateInput(this);
  });
});

// Валідація при відправці форми
form.addEventListener('submit', function(event) {
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    event.preventDefault();
  }
});

function validateInput(input) {
  const errorElement = input.nextElementSibling;
  let errorMessage = '';
  
  // Очищення попередньої помилки
  input.classList.remove('invalid');
  
  // Перевірка на обов'язковість
  if (input.hasAttribute('required') && input.value.trim() === '') {
    errorMessage = 'Це поле обов\'язкове';
  }
  // Перевірка email
  else if (input.type === 'email' && input.value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      errorMessage = 'Введіть коректний email';
    }
  }
  // Перевірка паролю
  else if (input.name === 'password' && input.value !== '') {
    if (input.value.length < 8) {
      errorMessage = 'Пароль має бути не менше 8 символів';
    }
  }
  // Перевірка підтвердження паролю
  else if (input.name === 'confirmPassword') {
    const password = form.querySelector('input[name="password"]').value;
    if (input.value !== password) {
      errorMessage = 'Паролі не співпадають';
    }
  }
  
  // Відображення помилки
  if (errorMessage) {
    input.classList.add('invalid');
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    return false;
  } else {
    errorElement.style.display = 'none';
    return true;
  }
}
```

### 2. Динамічне оновлення форми

```javascript
const form = document.getElementById('orderForm');
const productSelect = form.querySelector('select[name="product"]');
const quantityInput = form.querySelector('input[name="quantity"]');
const priceElement = form.querySelector('.price');
const totalElement = form.querySelector('.total');

// Дані про продукти
const products = {
  'product1': { name: 'Продукт 1', price: 100 },
  'product2': { name: 'Продукт 2', price: 150 },
  'product3': { name: 'Продукт 3', price: 200 }
};

// Оновлення при зміні продукту
productSelect.addEventListener('change', updatePrice);

// Оновлення при зміні кількості
quantityInput.addEventListener('input', updateTotal);

function updatePrice() {
  const selectedProduct = products[productSelect.value];
  priceElement.textContent = `${selectedProduct.price} грн`;
  updateTotal();
}

function updateTotal() {
  const selectedProduct = products[productSelect.value];
  const quantity = parseInt(quantityInput.value) || 0;
  const total = selectedProduct.price * quantity;
  totalElement.textContent = `${total} грн`;
}

// Ініціалізація
updatePrice();
```

### 3. Автозбереження форми

```javascript
const form = document.getElementById('postForm');
const formElements = form.elements;
const saveStatus = document.querySelector('.save-status');

// Збереження при зміні будь-якого поля
for (let i = 0; i < formElements.length; i++) {
  const element = formElements[i];
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
    element.addEventListener('input', autoSave);
    element.addEventListener('change', autoSave);
  }
}

// Завантаження збережених даних при завантаженні сторінки
window.addEventListener('load', loadSavedData);

let saveTimeout;

function autoSave() {
  // Очищення попереднього таймера
  clearTimeout(saveTimeout);
  
  // Встановлення статусу
  saveStatus.textContent = 'Збереження...';
  
  // Затримка для запобігання частим збереженням
  saveTimeout = setTimeout(() => {
    // Збір даних форми
    const formData = {};
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.name) {
        formData[element.name] = element.value;
      }
    }
    
    // Збереження в localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
    
    // Оновлення статусу
    saveStatus.textContent = 'Збережено ' + new Date().toLocaleTimeString();
  }, 1000);
}

function loadSavedData() {
  const savedData = localStorage.getItem('formData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    
    // Заповнення полів форми
    for (const name in formData) {
      if (formElements[name]) {
        formElements[name].value = formData[name];
      }
    }
    
    saveStatus.textContent = 'Завантажено збережені дані';
  }
}
```

## Найкращі практики

1. **Завжди запобігайте стандартній відправці форми** за допомогою `event.preventDefault()`, якщо обробляєте дані за допомогою JavaScript
2. **Використовуйте FormData** для зручного отримання даних форми
3. **Поєднуйте HTML5 валідацію з JavaScript валідацією** для кращого користувацького досвіду
4. **Надавайте зворотний зв'язок** про помилки та успішне відправлення
5. **Використовуйте подію input для миттєвого відгуку** і change для завершеного введення
6. **Враховуйте доступність** - забезпечте можливість навігації за допомогою клавіатури та правильні атрибути aria
7. **Тестуйте форми на різних пристроях** - мобільні пристрої можуть мати особливості введення

У наступному розділі ми розглянемо події документа та їх особливості.
