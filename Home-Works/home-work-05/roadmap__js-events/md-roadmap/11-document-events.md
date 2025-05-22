# Події документа в JavaScript

Події документа (Document Events) пов'язані з життєвим циклом веб-сторінки та її елементів. Вони дозволяють відстежувати завантаження сторінки, зміну її розмірів, прокрутку та інші дії, пов'язані з документом в цілому.

## Основні типи подій документа

### Події життєвого циклу

- **DOMContentLoaded** - виникає, коли HTML завантажено й оброблено, DOM документа повністю побудований і доступний
- **load** - виникає, коли сторінка повністю завантажена, включаючи всі зовнішні ресурси (зображення, стилі, скрипти)
- **beforeunload** - виникає перед тим, як користувач покидає сторінку
- **unload** - виникає, коли користувач покидає сторінку
- **readystatechange** - виникає при зміні стану документа під час завантаження

### Події взаємодії з документом

- **resize** - виникає при зміні розміру вікна браузера
- **scroll** - виникає при прокрутці документа або елемента
- **visibilitychange** - виникає, коли вкладка стає видимою або невидимою
- **fullscreenchange** - виникає при переході в/з повноекранного режиму
- **online/offline** - виникає, коли браузер переходить в онлайн/офлайн режим

## Подія DOMContentLoaded

Подія `DOMContentLoaded` виникає, коли браузер повністю завантажив HTML і побудував DOM-дерево, але зовнішні ресурси (зображення, стилі, фрейми) можуть бути ще не завантажені.

```javascript
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM повністю завантажено і розібрано');
  
  // Тепер можна безпечно працювати з DOM
  const element = document.getElementById('myElement');
  if (element) {
    element.textContent = 'DOM завантажено!';
  }
});
```

### Коли використовувати DOMContentLoaded

- Коли потрібно працювати з DOM-елементами
- Коли не потрібно чекати завантаження зображень та інших ресурсів
- Для ініціалізації інтерфейсу користувача
- Для додавання обробників подій до елементів

## Подія load

Подія `load` виникає, коли сторінка повністю завантажена, включаючи всі зовнішні ресурси (зображення, стилі, скрипти, фрейми, тощо).

```javascript
window.addEventListener('load', function() {
  console.log('Сторінка повністю завантажена');
  
  // Тепер можна працювати з елементами, які залежать від зовнішніх ресурсів
  const images = document.querySelectorAll('img');
  const totalSize = Array.from(images).reduce((sum, img) => sum + (img.naturalWidth * img.naturalHeight), 0);
  console.log('Загальний розмір зображень (пікселів):', totalSize);
});
```

### Коли використовувати load

- Коли потрібно працювати з зображеннями та їх розмірами
- Коли потрібно дочекатися завантаження всіх ресурсів
- Для ініціалізації компонентів, які залежать від зовнішніх ресурсів
- Для відображення прелоадера до повного завантаження сторінки

## Різниця між DOMContentLoaded і load

| Подія | Коли виникає | Використання |
|-------|--------------|--------------|
| DOMContentLoaded | Коли DOM побудований | Для роботи з DOM-елементами |
| load | Коли всі ресурси завантажені | Для роботи з зовнішніми ресурсами |

```javascript
// Вимірювання часу завантаження
const startTime = new Date().getTime();

document.addEventListener('DOMContentLoaded', function() {
  const domContentLoadedTime = new Date().getTime() - startTime;
  console.log('DOMContentLoaded час:', domContentLoadedTime, 'мс');
});

window.addEventListener('load', function() {
  const loadTime = new Date().getTime() - startTime;
  console.log('Load час:', loadTime, 'мс');
});
```

## Події beforeunload і unload

### beforeunload

Подія `beforeunload` виникає перед тим, як користувач покидає сторінку (закриває вкладку, переходить на іншу сторінку, оновлює сторінку). Вона дозволяє показати діалогове вікно підтвердження.

```javascript
window.addEventListener('beforeunload', function(event) {
  // Перевірка, чи є незбережені зміни
  if (hasUnsavedChanges()) {
    // Сучасні браузери ігнорують цей текст і показують стандартне повідомлення
    const message = 'У вас є незбережені зміни. Ви впевнені, що хочете покинути сторінку?';
    event.returnValue = message; // Для старих браузерів
    return message; // Для сучасних браузерів
  }
});

function hasUnsavedChanges() {
  // Логіка перевірки незбережених змін
  return true; // або false
}
```

**Важливо:** Сучасні браузери ігнорують користувацький текст і показують стандартне повідомлення для запобігання зловживанням.

### unload

Подія `unload` виникає, коли користувач покидає сторінку. Вона може використовуватися для очищення ресурсів або відправки аналітичних даних.

```javascript
window.addEventListener('unload', function() {
  // Відправка аналітичних даних
  // Використовуйте navigator.sendBeacon для надійної відправки даних
  navigator.sendBeacon('/analytics', JSON.stringify({
    timeSpent: Date.now() - pageLoadTime,
    scrollDepth: getScrollDepth()
  }));
});
```

**Важливо:** Код в обробнику `unload` має бути дуже простим і швидким, оскільки браузер може не чекати його завершення.

## Подія readystatechange

Подія `readystatechange` виникає при зміні властивості `document.readyState`, яка може мати такі значення:
- **loading** - документ завантажується
- **interactive** - документ розібраний, але ресурси ще завантажуються
- **complete** - документ і всі ресурси завантажені

```javascript
document.addEventListener('readystatechange', function() {
  console.log('Стан документа:', document.readyState);
});

// Альтернативний спосіб перевірки стану документа
if (document.readyState === 'loading') {
  console.log('Документ завантажується');
} else if (document.readyState === 'interactive') {
  console.log('Документ розібраний');
} else if (document.readyState === 'complete') {
  console.log('Документ і ресурси завантажені');
}
```

## Подія resize

Подія `resize` виникає при зміні розміру вікна браузера.

```javascript
window.addEventListener('resize', function() {
  console.log('Розмір вікна:', window.innerWidth, 'x', window.innerHeight);
  
  // Адаптація інтерфейсу до нового розміру
  updateLayout();
});

// Для оптимізації продуктивності використовуйте debounce
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    console.log('Розмір вікна після debounce:', window.innerWidth, 'x', window.innerHeight);
    updateLayout();
  }, 250);
});

function updateLayout() {
  // Логіка адаптації інтерфейсу
}
```

### Властивості для роботи з розмірами

- **window.innerWidth/innerHeight** - розмір видимої області вікна (включаючи полосу прокрутки)
- **window.outerWidth/outerHeight** - розмір вікна браузера (включаючи рамки, меню, тощо)
- **document.documentElement.clientWidth/clientHeight** - розмір видимої області вікна (без полоси прокрутки)

## Подія scroll

Подія `scroll` виникає при прокрутці документа або елемента.

```javascript
window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
  console.log('Прокрутка:', scrollLeft, 'x', scrollTop);
  
  // Реалізація "липкого" меню
  const header = document.querySelector('header');
  if (scrollTop > 100) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});
```

### Оптимізація обробки scroll

Подія `scroll` може виникати дуже часто, що може призвести до проблем з продуктивністю. Для оптимізації використовуйте:

1. **Throttling** - обмеження частоти виконання функції

```javascript
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

window.addEventListener('scroll', throttle(function() {
  console.log('Прокрутка (throttled)');
}, 100));
```

2. **requestAnimationFrame** - синхронізація з оновленням екрану

```javascript
let ticking = false;

window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      console.log('Прокрутка (RAF):', scrollTop);
      ticking = false;
    });
    ticking = true;
  }
});
```

### Властивості для роботи з прокруткою

- **window.pageYOffset/pageXOffset** - прокрутка сторінки (сучасний спосіб)
- **document.documentElement.scrollTop/scrollLeft** - прокрутка сторінки
- **element.scrollTop/scrollLeft** - прокрутка елемента

## Подія visibilitychange

Подія `visibilitychange` виникає, коли вкладка стає видимою або невидимою (користувач переключається між вкладками або мінімізує вікно).

```javascript
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    console.log('Сторінка не видима');
    // Призупинення анімацій, відео, тощо
    pauseAnimations();
  } else {
    console.log('Сторінка видима');
    // Відновлення анімацій, відео, тощо
    resumeAnimations();
  }
});
```

### Властивості для роботи з видимістю

- **document.hidden** - `true`, якщо сторінка не видима
- **document.visibilityState** - стан видимості сторінки ("visible", "hidden", "prerender")

## Події online/offline

Події `online` і `offline` виникають, коли браузер переходить в онлайн або офлайн режим.

```javascript
window.addEventListener('online', function() {
  console.log('Браузер перейшов в онлайн режим');
  // Відновлення синхронізації з сервером
  syncWithServer();
});

window.addEventListener('offline', function() {
  console.log('Браузер перейшов в офлайн режим');
  // Перехід в офлайн режим
  enableOfflineMode();
});

// Перевірка поточного стану
if (navigator.onLine) {
  console.log('Браузер в онлайн режимі');
} else {
  console.log('Браузер в офлайн режимі');
}
```

## Приклади використання подій документа

### 1. Прелоадер

```javascript
// Показуємо прелоадер при завантаженні сторінки
const preloader = document.querySelector('.preloader');

// Приховуємо прелоадер, коли DOM завантажено
document.addEventListener('DOMContentLoaded', function() {
  preloader.classList.add('preloader--dom-loaded');
});

// Повністю видаляємо прелоадер, коли всі ресурси завантажені
window.addEventListener('load', function() {
  setTimeout(function() {
    preloader.style.display = 'none';
  }, 500);
});
```

### 2. Безкінечна прокрутка (Infinite Scroll)

```javascript
// Функція для завантаження нового контенту
function loadMoreContent() {
  // Перевірка, чи досягнуто кінця сторінки
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  
  // Якщо прокручено до кінця сторінки (з запасом 200px)
  if (scrollTop + windowHeight >= documentHeight - 200) {
    // Завантаження нового контенту
    fetch('/api/content?page=' + currentPage)
      .then(response => response.json())
      .then(data => {
        // Додавання нового контенту на сторінку
        const contentContainer = document.querySelector('.content-container');
        data.items.forEach(item => {
          const element = document.createElement('div');
          element.className = 'content-item';
          element.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
          `;
          contentContainer.appendChild(element);
        });
        
        currentPage++;
      });
  }
}

// Використання throttle для оптимізації
let currentPage = 1;
window.addEventListener('scroll', throttle(loadMoreContent, 200));

// Початкове завантаження контенту
document.addEventListener('DOMContentLoaded', loadMoreContent);
```

### 3. Збереження стану форми при перезавантаженні

```javascript
const form = document.querySelector('form');

// Збереження стану форми перед перезавантаженням
window.addEventListener('beforeunload', function() {
  const formData = new FormData(form);
  const formState = {};
  
  for (const [name, value] of formData.entries()) {
    formState[name] = value;
  }
  
  localStorage.setItem('formState', JSON.stringify(formState));
});

// Відновлення стану форми при завантаженні
document.addEventListener('DOMContentLoaded', function() {
  const savedState = localStorage.getItem('formState');
  
  if (savedState) {
    const formState = JSON.parse(savedState);
    
    for (const name in formState) {
      const input = form.elements[name];
      if (input) {
        input.value = formState[name];
      }
    }
  }
});
```

### 4. Адаптивний дизайн без медіа-запитів

```javascript
function updateLayout() {
  const width = window.innerWidth;
  const container = document.querySelector('.container');
  
  if (width < 768) {
    container.classList.remove('desktop', 'tablet');
    container.classList.add('mobile');
  } else if (width < 1024) {
    container.classList.remove('desktop', 'mobile');
    container.classList.add('tablet');
  } else {
    container.classList.remove('tablet', 'mobile');
    container.classList.add('desktop');
  }
  
  // Динамічне розташування елементів
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    if (width < 768) {
      item.style.width = '100%';
    } else if (width < 1024) {
      item.style.width = '50%';
    } else {
      item.style.width = '33.33%';
    }
  });
}

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', updateLayout);

// Оновлення при зміні розміру вікна
window.addEventListener('resize', debounce(updateLayout, 250));
```

### 5. Відстеження часу, проведеного на сторінці

```javascript
let pageLoadTime = Date.now();
let timeSpentOnPage = 0;
let isPageVisible = true;
let lastVisibilityChangeTime = pageLoadTime;

// Відстеження видимості сторінки
document.addEventListener('visibilitychange', function() {
  const now = Date.now();
  
  if (document.hidden) {
    // Сторінка стала невидимою
    isPageVisible = false;
    // Додаємо час, проведений на видимій сторінці
    timeSpentOnPage += now - lastVisibilityChangeTime;
  } else {
    // Сторінка стала видимою
    isPageVisible = true;
    lastVisibilityChangeTime = now;
  }
});

// Відправка даних при закритті сторінки
window.addEventListener('beforeunload', function() {
  // Якщо сторінка видима, додаємо час до закриття
  if (isPageVisible) {
    timeSpentOnPage += Date.now() - lastVisibilityChangeTime;
  }
  
  // Відправка даних
  navigator.sendBeacon('/analytics', JSON.stringify({
    timeSpent: timeSpentOnPage,
    totalTime: Date.now() - pageLoadTime
  }));
});
```

## Найкращі практики

1. **Використовуйте DOMContentLoaded для роботи з DOM** і load для роботи з зовнішніми ресурсами
2. **Оптимізуйте обробники scroll і resize** за допомогою throttling або requestAnimationFrame
3. **Використовуйте visibilitychange для оптимізації ресурсів** при переключенні вкладок
4. **Будьте обережні з beforeunload** - не зловживайте діалоговими вікнами
5. **Враховуйте мобільні пристрої** - події resize і orientationchange можуть працювати інакше
6. **Використовуйте navigator.sendBeacon для відправки даних** при закритті сторінки
7. **Перевіряйте підтримку браузерами** подій документа

## Висновок

Події документа є важливою частиною JavaScript, яка дозволяє створювати інтерактивні та адаптивні веб-додатки. Вони дають можливість відстежувати життєвий цикл сторінки, реагувати на зміни розміру вікна, прокрутку та інші дії користувача, пов'язані з документом в цілому.

Правильне використання подій документа дозволяє оптимізувати продуктивність, покращити користувацький досвід та створювати більш надійні веб-додатки.
