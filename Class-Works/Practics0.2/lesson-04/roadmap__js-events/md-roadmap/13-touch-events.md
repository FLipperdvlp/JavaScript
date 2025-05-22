# Сенсорні події в JavaScript

Сенсорні події (Touch Events) дозволяють відстежувати взаємодію користувача з сенсорними пристроями, такими як смартфони, планшети та інші пристрої з сенсорним екраном.

## Основні типи сенсорних подій

- **touchstart** - виникає, коли користувач торкається екрану
- **touchmove** - виникає, коли користувач переміщує палець по екрану
- **touchend** - виникає, коли користувач прибирає палець з екрану
- **touchcancel** - виникає, коли дотик скасовано (наприклад, користувач перемістив палець за межі елемента)

## Об'єкт TouchEvent

Об'єкт `TouchEvent` містить інформацію про дотик, включаючи координати, цільовий елемент та інші дані.

### Основні властивості TouchEvent

- **touches** - список всіх поточних дотиків на екрані
- **targetTouches** - список дотиків, які почалися на поточному елементі
- **changedTouches** - список дотиків, які змінилися в поточній події

### Об'єкт Touch

Кожен дотик представлений об'єктом `Touch`, який має такі властивості:

- **identifier** - унікальний ідентифікатор дотику
- **target** - елемент, на якому почався дотик
- **clientX/clientY** - координати дотику відносно вікна браузера
- **pageX/pageY** - координати дотику відносно документа
- **screenX/screenY** - координати дотику відносно екрану
- **radiusX/radiusY** - радіус області дотику
- **rotationAngle** - кут повороту області дотику
- **force** - сила натискання (від 0 до 1)

## Базові приклади використання

### Відстеження дотику

```javascript
const element = document.getElementById('touchElement');

element.addEventListener('touchstart', function(event) {
  console.log('Дотик почався');
  
  // Запобігання прокрутці
  event.preventDefault();
  
  // Отримання першого дотику
  const touch = event.touches[0];
  console.log('Координати:', touch.clientX, touch.clientY);
});

element.addEventListener('touchmove', function(event) {
  console.log('Дотик переміщується');
  
  // Запобігання прокрутці
  event.preventDefault();
  
  // Отримання першого дотику
  const touch = event.touches[0];
  console.log('Нові координати:', touch.clientX, touch.clientY);
});

element.addEventListener('touchend', function(event) {
  console.log('Дотик завершено');
  
  // Запобігання прокрутці
  event.preventDefault();
  
  // Отримання останнього дотику (вже не в touches, а в changedTouches)
  const touch = event.changedTouches[0];
  console.log('Кінцеві координати:', touch.clientX, touch.clientY);
});
```

### Мультитач

```javascript
const element = document.getElementById('multiTouchElement');

element.addEventListener('touchstart', function(event) {
  console.log('Кількість дотиків:', event.touches.length);
  
  // Перебір всіх дотиків
  for (let i = 0; i < event.touches.length; i++) {
    const touch = event.touches[i];
    console.log(`Дотик ${i}:`, touch.identifier, touch.clientX, touch.clientY);
  }
});
```

## Практичні приклади

### 1. Перетягування елемента

```javascript
function enableDrag(element) {
  let initialX, initialY;
  let currentX, currentY;
  let xOffset = 0, yOffset = 0;
  let active = false;
  
  element.addEventListener('touchstart', dragStart, false);
  element.addEventListener('touchend', dragEnd, false);
  element.addEventListener('touchmove', drag, false);
  
  function dragStart(e) {
    const touch = e.touches[0];
    
    initialX = touch.clientX - xOffset;
    initialY = touch.clientY - yOffset;
    
    active = true;
  }
  
  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    
    active = false;
  }
  
  function drag(e) {
    if (active) {
      e.preventDefault();
      
      const touch = e.touches[0];
      
      currentX = touch.clientX - initialX;
      currentY = touch.clientY - initialY;
      
      xOffset = currentX;
      yOffset = currentY;
      
      setTranslate(currentX, currentY, element);
    }
  }
  
  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }
}

// Використання
document.addEventListener('DOMContentLoaded', function() {
  const draggable = document.getElementById('draggable');
  enableDrag(draggable);
});
```

### 2. Розпізнавання жестів: свайп

```javascript
function detectSwipe(element, callback) {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  
  // Мінімальна відстань для розпізнавання свайпу
  const minDistanceX = 50;
  const minDistanceY = 50;
  
  element.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, false);
  
  element.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const distanceX = touchEndX - touchStartX;
    const distanceY = touchEndY - touchStartY;
    
    // Визначення напрямку свайпу
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Горизонтальний свайп
      if (Math.abs(distanceX) > minDistanceX) {
        if (distanceX > 0) {
          callback('right');
        } else {
          callback('left');
        }
      }
    } else {
      // Вертикальний свайп
      if (Math.abs(distanceY) > minDistanceY) {
        if (distanceY > 0) {
          callback('down');
        } else {
          callback('up');
        }
      }
    }
  }
}

// Використання
document.addEventListener('DOMContentLoaded', function() {
  const swipeElement = document.getElementById('swipeArea');
  
  detectSwipe(swipeElement, function(direction) {
    console.log('Свайп:', direction);
    
    // Обробка різних напрямків
    switch (direction) {
      case 'left':
        showNextSlide();
        break;
      case 'right':
        showPrevSlide();
        break;
      case 'up':
        scrollToNext();
        break;
      case 'down':
        scrollToPrev();
        break;
    }
  });
});
```

### 3. Розпізнавання жестів: пінч (масштабування)

```javascript
function detectPinch(element, callback) {
  let initialDistance = 0;
  let currentDistance = 0;
  let scale = 1;
  let initialScale = 1;
  
  element.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
      initialDistance = getDistance(
        e.touches[0].clientX, e.touches[0].clientY,
        e.touches[1].clientX, e.touches[1].clientY
      );
      initialScale = scale;
    }
  }, false);
  
  element.addEventListener('touchmove', function(e) {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      currentDistance = getDistance(
        e.touches[0].clientX, e.touches[0].clientY,
        e.touches[1].clientX, e.touches[1].clientY
      );
      
      if (initialDistance > 0) {
        scale = initialScale * (currentDistance / initialDistance);
        callback(scale);
      }
    }
  }, false);
  
  function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

// Використання
document.addEventListener('DOMContentLoaded', function() {
  const pinchElement = document.getElementById('pinchArea');
  const targetElement = document.getElementById('scalableElement');
  
  detectPinch(pinchElement, function(scale) {
    // Обмеження масштабу
    const limitedScale = Math.min(Math.max(scale, 0.5), 3);
    
    // Застосування масштабу
    targetElement.style.transform = `scale(${limitedScale})`;
  });
});
```

### 4. Розпізнавання жестів: обертання

```javascript
function detectRotation(element, callback) {
  let initialAngle = 0;
  let currentAngle = 0;
  let rotation = 0;
  let initialRotation = 0;
  
  element.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
      initialAngle = getAngle(
        e.touches[0].clientX, e.touches[0].clientY,
        e.touches[1].clientX, e.touches[1].clientY
      );
      initialRotation = rotation;
    }
  }, false);
  
  element.addEventListener('touchmove', function(e) {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      currentAngle = getAngle(
        e.touches[0].clientX, e.touches[0].clientY,
        e.touches[1].clientX, e.touches[1].clientY
      );
      
      if (initialAngle !== null) {
        rotation = initialRotation + (currentAngle - initialAngle);
        callback(rotation);
      }
    }
  }, false);
  
  function getAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  }
}

// Використання
document.addEventListener('DOMContentLoaded', function() {
  const rotationElement = document.getElementById('rotationArea');
  const targetElement = document.getElementById('rotatableElement');
  
  detectRotation(rotationElement, function(rotation) {
    targetElement.style.transform = `rotate(${rotation}deg)`;
  });
});
```

## Бібліотеки для роботи з сенсорними подіями

Для спрощення роботи з сенсорними подіями можна використовувати спеціалізовані бібліотеки:

1. **Hammer.js** - популярна бібліотека для розпізнавання жестів
   ```javascript
   const hammer = new Hammer(element);
   
   hammer.on('swipe', function(event) {
     console.log(event.direction);
   });
   
   hammer.on('pinch', function(event) {
     console.log(event.scale);
   });
   ```

2. **ZingTouch** - модульна бібліотека для сенсорних жестів
   ```javascript
   const zt = new ZingTouch.Region(element);
   
   zt.bind(element, 'swipe', function(event) {
     console.log(event.detail.data[0].currentDirection);
   });
   ```

## Особливості та проблеми

### 1. Затримка кліку на мобільних пристроях

На мобільних пристроях є затримка 300мс між дотиком і подією кліку. Для усунення цієї затримки можна використовувати:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Або бібліотеку FastClick:

```javascript
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
```

### 2. Подвійні події на гібридних пристроях

На пристроях з підтримкою як сенсорного, так і мишачого введення можуть виникати подвійні події. Для вирішення цієї проблеми:

```javascript
let isTouchDevice = false;

document.addEventListener('touchstart', function() {
  isTouchDevice = true;
});

element.addEventListener('mousedown', function(event) {
  if (isTouchDevice) {
    event.preventDefault();
    return false;
  }
  // Обробка події миші
});
```

### 3. Запобігання масштабуванню сторінки

Для запобігання масштабуванню сторінки при мультитач жестах:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

```javascript
document.addEventListener('touchmove', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });
```

## Пасивні обробники подій

Для покращення продуктивності прокрутки на мобільних пристроях використовуйте пасивні обробники:

```javascript
element.addEventListener('touchmove', function(event) {
  // Не можна використовувати event.preventDefault() в пасивному обробнику
  console.log('Дотик переміщується');
}, { passive: true });
```

## Виявлення підтримки сенсорних подій

```javascript
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

if (isTouchDevice()) {
  console.log('Пристрій підтримує сенсорне введення');
  // Додавання обробників сенсорних подій
} else {
  console.log('Пристрій не підтримує сенсорне введення');
  // Додавання обробників подій миші
}
```

## Найкращі практики

1. **Використовуйте preventDefault() обережно** - це може блокувати стандартну поведінку прокрутки
2. **Враховуйте різні розміри екранів** - адаптуйте чутливість жестів до розміру екрану
3. **Забезпечте альтернативні способи взаємодії** - не всі користувачі використовують сенсорні пристрої
4. **Тестуйте на різних пристроях** - поведінка сенсорних подій може відрізнятися на різних пристроях
5. **Використовуйте пасивні обробники** для покращення продуктивності прокрутки
6. **Обробляйте як сенсорні події, так і події миші** для максимальної сумісності

## Висновок

Сенсорні події є важливою частиною сучасної веб-розробки, яка дозволяє створювати інтерактивні додатки для мобільних пристроїв. Розуміння особливостей роботи з сенсорними подіями допомагає створювати зручні та відзивчиві інтерфейси, які добре працюють на різних пристроях.
