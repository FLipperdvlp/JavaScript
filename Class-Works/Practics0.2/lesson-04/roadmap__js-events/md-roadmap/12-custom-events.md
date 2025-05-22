# Користувацькі події в JavaScript

Користувацькі події (Custom Events) дозволяють створювати власні типи подій для реалізації гнучкої архітектури додатку. Вони є потужним інструментом для розробки слабко зв'язаних компонентів, що можуть взаємодіяти між собою без прямих залежностей.

## Створення користувацьких подій

### Базове створення події

Для створення користувацької події використовується конструктор `CustomEvent`:

```javascript
// Створення події без додаткових даних
const event = new CustomEvent('myEvent');

// Створення події з додатковими даними
const eventWithData = new CustomEvent('myEventWithData', {
  detail: {
    message: 'Привіт зі світу подій!',
    time: new Date(),
    sender: 'Компонент A'
  },
  bubbles: true,      // Чи буде подія спливати
  cancelable: true    // Чи можна скасувати подію
});
```

### Параметри CustomEvent

Конструктор `CustomEvent` приймає два параметри:
1. **Назва події** (рядок)
2. **Об'єкт опцій** (необов'язковий), який може містити:
   - **detail** - об'єкт з даними, які будуть передані з подією
   - **bubbles** - чи буде подія спливати вгору по DOM-дереву (за замовчуванням `false`)
   - **cancelable** - чи можна скасувати стандартну дію події (за замовчуванням `false`)
   - **composed** - чи може подія перетинати межі Shadow DOM (за замовчуванням `false`)

## Відправка користувацьких подій

Для відправки (диспетчеризації) події використовується метод `dispatchEvent()`:

```javascript
// Створення елемента, який буде відправляти подію
const button = document.querySelector('#myButton');

// Створення події
const event = new CustomEvent('myEvent', {
  detail: { message: 'Кнопку натиснуто!' },
  bubbles: true
});

// Відправка події
button.dispatchEvent(event);

// Також можна відправляти події на document або window
document.dispatchEvent(new CustomEvent('appStateChanged', {
  detail: { state: 'ready' }
}));
```

## Прослуховування користувацьких подій

Користувацькі події прослуховуються так само, як і стандартні події, за допомогою `addEventListener`:

```javascript
// Прослуховування на конкретному елементі
document.querySelector('#myElement').addEventListener('myEvent', function(event) {
  console.log('Отримано користувацьку подію на елементі:', event.detail);
});

// Прослуховування на рівні документа
document.addEventListener('appStateChanged', function(event) {
  console.log('Стан додатку змінився:', event.detail.state);
  
  // Доступ до додаткових даних через властивість detail
  if (event.detail.state === 'ready') {
    initializeApp();
  }
});
```

## Приклади використання користувацьких подій

### 1. Комунікація між компонентами

```javascript
// Компонент A - відправник події
class ComponentA {
  constructor() {
    this.element = document.querySelector('.component-a');
    this.button = this.element.querySelector('button');
    
    this.button.addEventListener('click', () => this.sendMessage());
  }
  
  sendMessage() {
    const message = 'Повідомлення від компонента A';
    
    // Створення і відправка користувацької події
    const event = new CustomEvent('messageFromA', {
      bubbles: true,
      detail: { message, timestamp: new Date() }
    });
    
    this.element.dispatchEvent(event);
    console.log('Компонент A відправив повідомлення');
  }
}

// Компонент B - отримувач події
class ComponentB {
  constructor() {
    this.element = document.querySelector('.component-b');
    this.output = this.element.querySelector('.output');
    
    // Прослуховування події
    document.addEventListener('messageFromA', this.handleMessage.bind(this));
  }
  
  handleMessage(event) {
    console.log('Компонент B отримав повідомлення:', event.detail);
    this.output.textContent = `Отримано: ${event.detail.message} о ${event.detail.timestamp.toLocaleTimeString()}`;
  }
}

// Ініціалізація компонентів
document.addEventListener('DOMContentLoaded', () => {
  const componentA = new ComponentA();
  const componentB = new ComponentB();
});
```

### 2. Реалізація шаблону Спостерігач (Observer)

```javascript
// Клас EventBus для централізованої обробки подій
class EventBus {
  constructor() {
    this.events = {};
  }
  
  // Підписка на подію
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    
    this.events[eventName].push(callback);
    
    return () => {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    };
  }
  
  // Відправка події
  publish(eventName, data) {
    if (!this.events[eventName]) {
      return;
    }
    
    this.events[eventName].forEach(callback => {
      callback(data);
    });
  }
}

// Використання EventBus
const eventBus = new EventBus();

// Підписка на події
const unsubscribe = eventBus.subscribe('userLoggedIn', (user) => {
  console.log('Користувач увійшов:', user);
  updateUI(user);
});

// Відправка події
function login(username, password) {
  // Логіка авторизації
  const user = { username, id: 123, role: 'admin' };
  
  // Повідомлення про успішний вхід
  eventBus.publish('userLoggedIn', user);
}

// Відписка від події
function logout() {
  unsubscribe();
  console.log('Відписано від події userLoggedIn');
}
```

### 3. Валідація форми з користувацькими подіями

```javascript
// Клас валідатора форми
class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = Array.from(form.querySelectorAll('[data-validate]'));
    
    // Додавання обробників подій
    this.fields.forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearError(field));
    });
    
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }
  
  validateField(field) {
    const type = field.dataset.validate;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (type) {
      case 'required':
        isValid = value !== '';
        errorMessage = 'Це поле обов\'язкове';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        errorMessage = 'Введіть коректний email';
        break;
      case 'password':
        isValid = value.length >= 8;
        errorMessage = 'Пароль має бути не менше 8 символів';
        break;
    }
    
    // Встановлення стану валідації
    if (!isValid) {
      this.setError(field, errorMessage);
      
      // Відправка події про помилку валідації
      field.dispatchEvent(new CustomEvent('validation:error', {
        bubbles: true,
        detail: { field: field.name, message: errorMessage }
      }));
    } else {
      this.clearError(field);
      
      // Відправка події про успішну валідацію
      field.dispatchEvent(new CustomEvent('validation:success', {
        bubbles: true,
        detail: { field: field.name }
      }));
    }
    
    return isValid;
  }
  
  setError(field, message) {
    field.classList.add('is-invalid');
    
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
  }
  
  clearError(field) {
    field.classList.remove('is-invalid');
    
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.textContent = '';
    }
  }
  
  validateAll() {
    let isValid = true;
    
    this.fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  handleSubmit(event) {
    if (!this.validateAll()) {
      event.preventDefault();
      
      // Відправка події про невдалу валідацію форми
      this.form.dispatchEvent(new CustomEvent('form:invalid', {
        bubbles: true,
        detail: { formId: this.form.id }
      }));
    } else {
      // Відправка події про успішну валідацію форми
      this.form.dispatchEvent(new CustomEvent('form:valid', {
        bubbles: true,
        detail: { formId: this.form.id, formData: new FormData(this.form) }
      }));
    }
  }
}

// Використання валідатора
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const validator = new FormValidator(form);
  
  // Прослуховування користувацьких подій
  form.addEventListener('validation:error', (event) => {
    console.log('Помилка валідації:', event.detail);
  });
  
  form.addEventListener('form:valid', (event) => {
    console.log('Форма валідна, дані:', event.detail);
    
    // Відправка даних на сервер
    const formData = event.detail.formData;
    fetch('/api/register', {
      method: 'POST',
      body: formData
    });
  });
});
```

### 4. Система сповіщень

```javascript
// Клас для управління сповіщеннями
class NotificationSystem {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'notification-container';
    document.body.appendChild(this.container);
    
    // Прослуховування подій сповіщень
    document.addEventListener('notification:show', this.handleNotification.bind(this));
  }
  
  handleNotification(event) {
    const { type, message, duration = 3000 } = event.detail;
    this.showNotification(type, message, duration);
  }
  
  showNotification(type, message, duration) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    this.container.appendChild(notification);
    
    // Анімація появи
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Автоматичне закриття
    setTimeout(() => {
      notification.classList.remove('show');
      
      // Видалення після завершення анімації
      notification.addEventListener('transitionend', () => {
        notification.remove();
      });
    }, duration);
  }
}

// Ініціалізація системи сповіщень
document.addEventListener('DOMContentLoaded', () => {
  const notificationSystem = new NotificationSystem();
});

// Функції для показу сповіщень
function showSuccess(message, duration) {
  document.dispatchEvent(new CustomEvent('notification:show', {
    detail: { type: 'success', message, duration }
  }));
}

function showError(message, duration) {
  document.dispatchEvent(new CustomEvent('notification:show', {
    detail: { type: 'error', message, duration }
  }));
}

function showInfo(message, duration) {
  document.dispatchEvent(new CustomEvent('notification:show', {
    detail: { type: 'info', message, duration }
  }));
}

// Використання
document.querySelector('#saveButton').addEventListener('click', () => {
  // Логіка збереження
  showSuccess('Дані успішно збережено!');
});

document.querySelector('#deleteButton').addEventListener('click', () => {
  // Логіка видалення
  showError('Помилка при видаленні. Спробуйте ще раз.');
});
```

## Розширені можливості користувацьких подій

### 1. Наслідування від базових подій

Можна створювати користувацькі події, які наслідують властивості стандартних подій:

```javascript
// Створення події, яка наслідує MouseEvent
const clickEvent = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

// Відправка події
document.querySelector('#myButton').dispatchEvent(clickEvent);
```

### 2. Використання Event.target

Властивість `target` вказує на елемент, який є джерелом події:

```javascript
document.addEventListener('myCustomEvent', function(event) {
  console.log('Подію відправив елемент:', event.target);
  console.log('Обробник прикріплений до:', event.currentTarget);
});

const button = document.querySelector('#myButton');
button.dispatchEvent(new CustomEvent('myCustomEvent', { bubbles: true }));
```

### 3. Скасування користувацьких подій

Для подій з параметром `cancelable: true` можна використовувати метод `preventDefault()`:

```javascript
// Створення події, яку можна скасувати
const formSubmitEvent = new CustomEvent('formSubmit', {
  cancelable: true,
  detail: { formData: new FormData(form) }
});

// Відправка події
const isCancelled = !form.dispatchEvent(formSubmitEvent);

if (isCancelled) {
  console.log('Відправку форми скасовано');
} else {
  console.log('Відправка форми продовжується');
  submitFormToServer(formSubmitEvent.detail.formData);
}

// Обробник, який може скасувати подію
document.addEventListener('formSubmit', function(event) {
  if (!validateForm(event.detail.formData)) {
    event.preventDefault(); // Скасування події
  }
});
```

### 4. Використання з Shadow DOM

Для відправки подій через межі Shadow DOM використовується параметр `composed: true`:

```javascript
// Створення компонента з Shadow DOM
class CustomComponent extends HTMLElement {
  constructor() {
    super();
    
    // Створення Shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Додавання вмісту
    this.shadowRoot.innerHTML = `
      <div class="container">
        <button id="innerButton">Натисни мене</button>
      </div>
    `;
    
    // Додавання обробника
    this.shadowRoot.querySelector('#innerButton').addEventListener('click', () => {
      // Відправка події, яка перетинає межі Shadow DOM
      this.dispatchEvent(new CustomEvent('buttonClicked', {
        bubbles: true,
        composed: true,
        detail: { component: this.getAttribute('name') }
      }));
    });
  }
}

// Реєстрація компонента
customElements.define('custom-component', CustomComponent);

// Прослуховування події на рівні документа
document.addEventListener('buttonClicked', (event) => {
  console.log('Кнопка натиснута в компоненті:', event.detail.component);
});
```

## Найкращі практики

1. **Використовуйте префікси для назв подій** - це допоможе уникнути конфліктів з іншими бібліотеками та майбутніми стандартними подіями
   ```javascript
   // Погано
   element.dispatchEvent(new CustomEvent('change'));
   
   // Добре
   element.dispatchEvent(new CustomEvent('myapp:change'));
   ```

2. **Завжди передавайте дані через властивість detail** - це стандартний спосіб передачі даних з користувацькими подіями
   ```javascript
   // Погано
   const event = new CustomEvent('userUpdate');
   event.userData = { name: 'John' }; // Не рекомендується
   
   // Добре
   const event = new CustomEvent('userUpdate', {
     detail: { name: 'John' }
   });
   ```

3. **Документуйте свої користувацькі події** - опишіть, які події відправляються, які дані передаються, і в яких ситуаціях
   ```javascript
   /**
    * Подія userUpdate
    * Відправляється при оновленні даних користувача
    * 
    * @event userUpdate
    * @type {CustomEvent}
    * @property {Object} detail - Дані події
    * @property {string} detail.name - Ім'я користувача
    * @property {string} detail.role - Роль користувача
    */
   ```

4. **Використовуйте спливання (bubbling) обережно** - включайте його тільки якщо подія повинна бути оброблена на вищих рівнях DOM
   ```javascript
   // Для локальних подій
   const localEvent = new CustomEvent('localChange', {
     bubbles: false // За замовчуванням false
   });
   
   // Для подій, які повинні спливати
   const bubblingEvent = new CustomEvent('globalChange', {
     bubbles: true
   });
   ```

5. **Розглядайте використання EventTarget для не-DOM об'єктів** - це дозволяє додати систему подій до будь-якого об'єкта
   ```javascript
   class Model extends EventTarget {
     setData(data) {
       this._data = data;
       this.dispatchEvent(new CustomEvent('dataChanged', {
         detail: { data }
       }));
     }
   }
   
   const model = new Model();
   model.addEventListener('dataChanged', (event) => {
     console.log('Дані змінилися:', event.detail.data);
   });
   ```

## Висновок

Користувацькі події в JavaScript є потужним інструментом для створення слабко зв'язаних компонентів і реалізації різних архітектурних патернів. Вони дозволяють організувати комунікацію між різними частинами додатку без створення прямих залежностей.

Правильне використання користувацьких подій допомагає створювати більш модульний, тестований і підтримуваний код, особливо в складних веб-додатках з багатьма компонентами.
