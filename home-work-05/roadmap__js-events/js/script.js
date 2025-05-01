//! Вступ в JavaScript подій

/*
Подія – це сигнал від браузера, що щось сталося. Це може бути дія користувача (клік, натискання клавіші, рух миші) або системна подія (завантаження сторінки, помилка).

Відловлювати виникнення події ми будемо за допомогою спеціальних обробників. Будь-якій події можна призначити обробник, тобто функцію, яка спрацює, як тільки станеться потрібна нам подія.

Саме завдяки цим обробникам JavaScript може реагувати на дії користувача та створювати інтерактивні веб-сторінки.
*/

//? Навіщо потрібні події?

/**
Події дозволяють:
- Реагувати на дії користувача
- Створювати інтерактивні інтерфейси
- Динамічно змінювати вміст сторінки
- Валідувати форми
- Створювати анімації
- Взаємодіяти з API браузера
 */

//? Модель подій в JavaScript:

/*
Основні компоненти моделі подій:
1. **Джерело події** - елемент DOM, на якому відбулася подія
2. **Тип події** - що саме сталося (клік, натискання клавіші тощо)
3. **Обробник події** - функція, яка виконується у відповідь на подію
4. **Об'єкт події** - містить інформацію про подію (координати миші, натиснута клавіша тощо)
5. **Поширення події** - як подія розповсюджується по DOM-дереву (спливання та занурення)

Життєвий цикл події
1. **Ініціювання події** - користувач або система ініціює подію (наприклад, клік)
2. **Створення об'єкта події** - браузер створює об'єкт події з інформацією про подію
3. **Фаза занурення** - подія проходить від кореневого елемента до цільового
4. **Цільова фаза** - подія досягає цільового елемента
5. **Фаза спливання** - подія "спливає" від цільового елемента до кореневого
6. **Виконання обробників** - на кожному етапі виконуються відповідні обробники подій
*/

//Todo: Події миші
/**
Події миші виникають при взаємодії користувача з мишею:

- **click** – відбувається, коли клацнули на елемент лівою кнопкою миші (на пристроях із сенсорними екранами воно відбувається при торканні)
- **dblclick** – відбувається, коли клацнули два рази на елемент лівою кнопкою миші
- **contextmenu** – відбувається, коли клацнули на елемент правою кнопкою миші
- **mouseover** / **mouseout** – коли миша наводиться / залишає елемент
- **mouseenter** / **mouseleave** – коли миша наводиться / залишає елемент (на відміну від mouseover/mouseout не спливають і не виникають на дочірніх елементах)
- **mousedown** / **mouseup** – коли натиснули / відпустили кнопку миші на елементі
- **mousemove** – під час руху миші
 */

//Todo: Події клавіатури
/**
Події клавіатури виникають при взаємодії з клавіатурою:

- **keydown** – коли користувач натискає клавішу
- **keyup** – коли користувач відпускає клавішу

*/

//Todo: Події форм
/**
Події, пов'язані з формами та їх елементами:

- **submit** – користувач надіслав форму `<form>`
- **reset** – користувач скинув форму (рідко використовується)
- **focus** – користувач фокусується на елементі, наприклад, натискає на `<input>`
- **blur** – користувач виходить з фокусу елемента
- **change** – користувач змінює значення елемента (для `<input>`, `<select>` і `<textarea>`)
- **input** – виникає при кожній зміні значення в полі введення
- **select** – користувач виділяє текст в полі введення
 */

//Todo: Події документа
/**
Події, пов'язані з життєвим циклом документа:

- **DOMContentLoaded** – коли HTML завантажено й оброблено, DOM документа повністю побудований і доступний
- **load** – коли сторінка повністю завантажена, включаючи всі зовнішні ресурси (зображення, стилі тощо)
- **beforeunload** – виникає перед тим, як користувач покидає сторінку
- **unload** – коли користувач покидає сторінку
- **resize** – коли змінюється розмір вікна браузера
- **scroll** – коли користувач прокручує сторінку або елемент
 */

//!! Обробники подій

// function sum(a, b) {
//   console.log(a + b);
// }

/*
Обробники подій (event handlers) - це функції, які виконуються у відповідь на певну подію. Існує кілька способів призначити обробник події в JavaScript.
*/

//Todo: Використання атрибута HTML

/*
<button onclick="console.log('Клік!')">Натисни мене</button>

const showConsole = () => {
  console.log("Клік!");
};
*/

//Todo: Використання DOM-объекта

// const button = document.getElementById("btn");

// function showConsole() {
//   console.log("Клік!");
// }

// button.onclick = showConsole;

// console.dir(button);

// Або використовуючи стрілкову функцію
// button.onclick = () => {
//   console.log("Клак!");
// };

// Або призначаючи іменовану функцію
// function showConsole() {
//   console.log("Клік!");
// }
// button.onclick = showConsole; // Важливо! Без круглих дужок!

/**
Недоліки:
- Можна призначити тільки один обробник для кожної події на елементі
- Кожне нове призначення обробника перезапише попереднє.
 */

// const button = document.querySelector(".button");

// button.onclick = function () {
//   console.log("Клік!");
// };

// button.onclick = function () {
//   console.log("Клак!");
//   this.style.backgroundColor = "red";
// };

//Todo: Обробник подій addEventListener/removeEventListener

/*
Найбільш гнучкий і рекомендований спосіб - використання методів `addEventListener` і `removeEventListener`:

element.addEventListener(event, handler, [options]);

*/

// const button = document.querySelector(".button");
// const title = document.querySelector("#title");

// button.addEventListener("click", function () {
//   console.log("Клік!");
// });
// button.addEventListener("click", function () {
//   console.log("Клак!");
// });

// function showConsole1() {
//   console.log("Клик!");
// }
// function showConsole2() {
//   console.log("HELLO USERS!");
// }

// button.addEventListener("click", showConsole1);
// button.addEventListener("click", showConsole2);

// if (title) {
//   title.addEventListener("click", () => {
//     button.removeEventListener("click", showConsole1);
//     button.removeEventListener("click", showConsole2);
//   });
// }

// Можна використовувати іменовані функції, що дозволяє пізніше видалити обробник:
/*
function showConsole1() {
  console.log("Клик!");
}
function showConsole2() {
  console.log("HELLO USERS!");
}

button.addEventListener("click", showConsole1);
button.addEventListener("click", showConsole2);

*/

//* Опции

// const options = {
//   capture: false, // фаза, на якій повинен спрацювати обробник. options може бути false/true, це те саме, що {capture: false/true}.
//   once: false, // якщо true, тоді обробник буде автоматично вилучений після виконання.
//   passive: false, // якщо true, тоді обробник ніколи не викличе preventDefault()
// };

// const button = document.querySelector(".button");

// function showConsole() {
//   console.log("Клік!");
// }

// button.addEventListener("click", showConsole, options);

/*
Метод addEventListener може здатися складнішим, ніж, скажімо, на click.
Але, через те, що він має перевагу
"прослуховування" кількох подій,
а також враховуючи той факт, що існують події, які можна відловити
лише з допомогою цього методу.
В результаті розробники найчастіше використовують саме його.
*/

//====================================================

//!! Об'єкт події в JavaScript

/*
Коли відбувається подія, браузер створює об'єкт події, який містить інформацію про те, що сталося. Цей об'єкт передається як аргумент функції-обробнику.
*/

// const button = document.querySelector(".button");

// function showConsole(event) {
//   console.log(event.type); // тип події, наприклад "click"
//   console.log(event); // весь об'єкт події
// }

// button.addEventListener("click", showConsole);

// button.addEventListener("click", (event) => {
//   console.log(event.eventPhase);
//   console.log(event.target);
//   console.log(event.currentTarget);
// });

// document.addEventListener("click", (event) => {
//   console.log(event.target);
//   console.log(event.currentTarget);
// });

//* ## Загальні властивості об'єкта події
/*
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
*/

/*
document.addEventListener("click", function (event) {
  console.log("target:", event.target); // може бути будь-який елемент всередині контейнера
  console.log("currentTarget:", event.currentTarget); // завжди буде .container
});
*/

//* ### Для подій миші (MouseEvent)
/*
- **clientX/clientY** - координати відносно вікна браузера
- **pageX/pageY** - координати відносно документа (з урахуванням прокрутки)
- **screenX/screenY** - координати відносно екрану
- **offsetX/offsetY** - координати відносно елемента, на якому відбулася подія
- **button** - яка кнопка миші була натиснута (0 - ліва, 1 - середня, 2 - права)
- **altKey, ctrlKey, shiftKey, metaKey** - чи були натиснуті відповідні клавіші-модифікатори
- **relatedTarget** - елемент, з/на який переходить курсор (для mouseover/mouseout)
*/

// const blockForMouse = document.querySelector(".block-for-mouse");

// blockForMouse.addEventListener("mousemove", function (event) {
//   blockForMouse.innerHTML = `clientX - ${event.clientX} <br> clientY - ${event.clientY}`;
// });

//* ### Для подій клавіатури (KeyboardEvent)
/*
- **key** - символ, що відповідає натиснутій клавіші ("a", "Enter", "Escape", тощо)
- **code** - фізичний код клавіші ("KeyA", "Enter", "Escape", тощо)
- **keyCode** - числовий код клавіші (застарілий)
- **altKey, ctrlKey, shiftKey, metaKey** - чи були натиснуті відповідні клавіші-модифікатори
- **repeat** - чи утримується клавіша (повторні натискання)
*/

// document.addEventListener("keydown", function (event) {
//   if (event.code == "KeyZ" && (event.ctrlKey || event.metaKey)) {
//     console.log("Натиснуто Ctrl+Z або Command+Z");
//   }
// });

//* ### Для подій форм
/*
- **value** - поточне значення елемента форми (для input, select, тощо)
- **checked** - стан чекбокса (для input type="checkbox")
- **selected** - стан опції (для select)
*/

//* ## Методи об'єкта події
/*
- **preventDefault()** - скасовує стандартну дію браузера
- **stopPropagation()** - зупиняє спливання події
- **stopImmediatePropagation()** - зупиняє спливання і запобігає виконанню інших обробників на поточному елементі
*/

// ! Бульбашковий механізм (спливання та занурення)

/*
Коли подія відбувається на елементі, вона не тільки обробляється на цьому елементі, але і "подорожує" по DOM-дереву. Цей процес має дві фази: занурення (capturing) і спливання (bubbling).
*/

//* ## Фази поширення події

/*
Згідно зі специфікацією DOM Events, існує три фази поширення події:

1. **Фаза занурення (Capturing phase)** - подія спускається від кореневого елемента до цільового
2. **Цільова фаза (Target phase)** - подія досягає цільового елемента
3. **Фаза спливання (Bubbling phase)** - подія піднімається від цільового елемента до кореневого

```
                    | Фаза 1: Занурення (Capturing) |
                    v                               v
html -> body -> div -> p -> span (цільовий елемент)
                    ^                               ^
                    | Фаза 3: Спливання (Bubbling)  |
```
*/

//* ## Спливання подій (Event Bubbling)

/*
Спливання подій (Event Bubbling) - процес, коли подія, що була ініційована на внутрішньому елементі, піднімається (бульбашиться) вгору по DOM до самого кореня (наприклад, до document).
*/

//* ## Занурення подій (Event Capturing)

/*
Занурення подій (Event Capturing) - процес, коли подія, що була ініційована на кореневому елементі, спускається вниз по DOM до самого внутрішнього елемента.
*/

// const block = document.querySelector(".block");
// const blockInner = document.querySelector(".block__inner");
// const blockInnerInner = document.querySelector(".block__inner-inner");

// block.addEventListener("click", function (event) {
//   console.log("Клик на Блок першого уровня!");
//   console.log(event.target);
//   // console.log(event.target.closest(".block"));
// });

// blockInner.addEventListener("click", function (event) {
//   console.log("Клик на Блок второго уровня!");
//   // console.log(event.eventPhase);
// });

// blockInnerInner.addEventListener("click", function (event) {
//   console.log("Клик на Блок третьего уровня!");
//   // console.log(event.eventPhase);
// });

/*
const options = {
  capture: false, // фаза, на якій повинен спрацювати обробник. options може бути false/true, це те саме, що {capture: false/true}.
  once: false, // якщо true, тоді обробник буде автоматично вилучений після виконання.
  passive: false, // якщо true, тоді обробник ніколи не викличе preventDefault()
};
*/

//* ## Зупинка спливання

/**
 * event.stopPropagation() - зупиняє спливання події
 */

// ! Делегування подій

/*
Делегування подій (Event Delegation) - це потужний патерн проектування в JavaScript, який базується на принципі спливання подій. Замість того, щоб призначати обробники кожному елементу, ми призначаємо один обробник їх спільному предку і визначаємо, на якому саме елементі відбулася подія.
*/

//* ## Принцип делегування подій
/*
Основна ідея делегування подій полягає в тому, що:

1. Ми розміщуємо один обробник на спільному предку елементів
2. В обробнику ми визначаємо, на якому конкретно елементі відбулася подія за допомогою `event.target`
3. Обробляємо подію відповідно до елемента, на якому вона відбулася
*/

//* ## Переваги делегування подій

/*
1. **Економія пам'яті** - замість багатьох обробників використовується один
2. **Динамічні елементи** - працює з елементами, які додаються динамічно після завантаження сторінки
3. **Менше коду** - не потрібно писати код для кожного елемента
4. **Централізоване управління** - логіка обробки подій зосереджена в одному місці
5. **Кращий контроль** - можна легко вмикати/вимикати обробку подій для всіх елементів одночасно
*/

// const buttons = document.querySelector(".buttons");

// console.log(buttons);

// // function showConsole(event) {
// //   console.log("Ура!");
// // }

// buttons.addEventListener("click", (event) => {
//   // if (event.target.closest(".button")) {
//   //   console.log(event.target);
//   //   console.log("Клік по кнопці");
//   // }
//   // if (event.target.classList.contains("button")) {
//   //   console.log("Клік по кнопці");
//   // }
//   // if (event.target.tagName === "BUTTON") {
//   //   console.log("Клік по кнопці");
//   // }
// });

// -----------------

// const lesson = document.querySelector(".lesson");

// function showConsole() {
//   console.log("Ура!");
// }

// lesson.addEventListener("click", function (event) {
//   console.dir(this);
//   console.dir(event);

//   if (event.target.classList.contains("button")) {
//     console.log("Клік по кнопці");
//   }

//   if (event.target.tagName === "BUTTON") {
//     console.log("Клік по кнопці");
//   }

//   if (event.target.closest(".button-1")) {
//     console.log("Клік по кнопці 1");
//   }

//   if (event.target.closest(".button-2")) {
//     console.log("Клік по кнопці 2");
//   }
//   if (event.target.closest(".button-3")) {
//     console.log("Клік по кнопці 3");
//   }
//   if (event.target.closest(".button-4")) {
//     console.log("Клік по кнопці 4");
//   }

//   if (event.target.closest("#input")) {
//     console.log("Це інпут");
//   }
// });

// Приклад з меню

// const menuBody = document.querySelector(".menu");

// document.addEventListener("click", menu);

// function menu(event) {
//   if (event.target.closest(".menu__button")) {
//     menuBody.classList.toggle("_active");
//   }
//   if (!event.target.closest(".menu")) {
//     menuBody.classList.remove("_active");
//   }
// }

// ! Дії браузера та скасування дії

/*
Багато елементів HTML мають стандартну (вбудовану) поведінку, яку браузер виконує автоматично:
- Клік по посиланню (`<a>`) переводить на нову сторінку
- Відправка форми (`<form>`) перезавантажує сторінку
- Клік правою кнопкою миші відкриває контекстне меню
- Натискання на чекбокс змінює його стан
- Перетягування тексту виділяє його

Іноді нам потрібно запобігти цій стандартній поведінці і реалізувати власну логіку. Для цього використовується метод `event.preventDefault()`.
*/

//* ## Метод preventDefault() - скасування дії браузера

/*
Метод `preventDefault()` скасовує стандартну дію браузера для події, якщо вона скасовувана (має властивість `cancelable: true`).
*/

// const link = document.querySelector(".link");

// link.addEventListener("click", function (event) {
//   console.log("Наши действия");
//   // скасувати дію браузера (перехід за посиланням)
//   event.preventDefault();
// });

/*
Необов'язкова опція passive: true для addEventListener
сигналізує браузеру, що обробник не збирається виконувати
preventDefault(). Чому це може бути корисно?
Є деякі події, як touchmove на мобільних
пристроях (коли користувач переміщає палець по екрану),
яке за замовчуванням починає прокручування, але ми можемо скасувати
це дія, використовуючи preventDefault() в обробнику.
Тому, коли браузер виявить таку подію,
він повинен для початку запустити всі обробники і після,
якщо preventDefault не викликається ніде, він може розпочати прокручування.
Це може викликати непотрібні затримки в інтерфейсі користувача.
Опція passive: true повідомляє браузеру, що обробник
не збирається скасовувати прокрутку. Тоді браузер починає її негайно,
забезпечуючи максимально плавний інтерфейс, паралельно опрацьовуючи подію.
Для деяких браузерів(Firefox, Chrome) опція passive за замовчуванням
включена в true для таких подій, як touchstart і touchmove.
*/
/*
const link = document.querySelector('.link');

link.addEventListener("click", function (event) {
	console.log('Наши действия');
	// скасувати дію браузера (перехід за посиланням)
	event.preventDefault();
}, { "passive": true });
*/

// ! Події миші

/*
Події миші (Mouse Events) - це група подій, які виникають при взаємодії користувача з мишею. Вони дозволяють відстежувати рух курсора, натискання кнопок миші та інші дії, пов'язані з мишею.
*/

//* ### Кліки

/*
- **click** - виникає, коли користувач натискає і відпускає ліву кнопку миші на елементі
- **dblclick** - виникає при подвійному кліку лівою кнопкою миші
- **contextmenu** - виникає при кліку правою кнопкою миші (перед відкриттям контекстного меню)
*/

// const button = document.querySelector(".button");

// button.addEventListener("mousemove", function (event) {
//   console.log(`Координаты: ${event.clientX} : ${event.clientY}`);
// });

//* ### Натискання та відпускання кнопок

/*
- **mousedown** - виникає, коли користувач натискає кнопку миші на елементі
- **mouseup** - виникає, коли користувач відпускає кнопку миші
*/

//* ### Рух миші
/*
- **mousemove** - виникає при русі миші над елементом
- **mouseover** - виникає, коли курсор миші входить в межі елемента
- **mouseout** - виникає, коли курсор миші виходить за межі елемента
- **mouseenter** - виникає, коли курсор миші входить в межі елемента (не спливає)
- **mouseleave** - виникає, коли курсор миші виходить за межі елемента (не спливає)
*/

//* ### Колесо миші
/*
- **wheel** - виникає при прокручуванні колеса миші
*/

//* ## Порядок подій миші
/*
При взаємодії з елементом за допомогою миші події відбуваються в такому порядку:

1. **mousedown** - натискання кнопки миші
2. **mouseup** - відпускання кнопки миші
3. **click** - якщо натискання і відпускання відбулося на одному елементі
4. **dblclick** - якщо відбулося два кліки підряд за короткий проміжок часу
*/

// const button = document.querySelector(".button");

// button.addEventListener("mousedown", function (event) {
//   console.log(`Нажата кнопка ${event.which}`);
// });

// button.addEventListener("click", function (event) {
//   console.log("Нажата основная кнопка мыши");
// });

// button.addEventListener("contextmenu", function (event) {
//   event.preventDefault();
//   console.log("Контекстное меню");
// });

// document.addEventListener("contextmenu", function (event) {
//   event.preventDefault();
// });

// Координаты: clientX/Y, pageX/Y

// const blockForMouse = document.querySelector(".block-for-mouse");

// blockForMouse.addEventListener("mousemove", function (event) {
//   blockForMouse.innerHTML = `clientX - ${event.clientX} <br> clientY - ${event.clientY}`;
// });

//------------------

// Наведение мыши: mouseover/out, mouseenter/leave

//События mouseover/mouseout, relatedTarget

/*
Событие mouseover происходит в момент, когда курсор оказывается
над элементом, а событие mouseout – в момент,
когда курсор уходит с элемента.
*/

// const blockForMouse = document.querySelector(".block-for-mouse");

// blockForMouse.addEventListener("mouseover", function (event) {
//   blockForMouse.innerHTML = `Курсор над элементом`;
// });
// blockForMouse.addEventListener("mouseout", function (event) {
//   blockForMouse.innerHTML = `Курсор уходит с элемента`;
// });

/*
Эти события являются особенными, потому что у них имеется свойство
relatedTarget. Оно «дополняет» target. Когда мышь переходит
с одного элемента на другой, то один из них будет target,
а другой relatedTarget.

Для события mouseover:
event.target – это элемент, на который курсор перешёл.
event.relatedTarget – это элемент,
с которого курсор ушёл(relatedTarget → target).

Для события mouseout наоборот:
event.target – это элемент, с которого курсор ушёл.
event.relatedTarget – это элемент,
на который курсор перешёл(target → relatedTarget).
*/

// const blockForMouse = document.querySelector(".block-for-mouse");

// blockForMouse.addEventListener("mouseover", function (event) {
//   console.log(event.target);
//   console.log(event.relatedTarget);
// });
// blockForMouse.addEventListener("mouseout", function (event) {
//   console.log(event.target);
//   console.log(event.relatedTarget);
// });

/*
const blockForMouse = document.querySelector('.block-for-mouse');

blockForMouse.addEventListener("mouseover", function (event) {
	console.log(`Курсор над элементом`);
});
blockForMouse.addEventListener("mouseout", function (event) {
	console.log(`Курсор уходит с элемента`);
});
*/

// События mouseenter и mouseleave
/*
Пара важных отличий:
1) Переходы внутри элемента, на его потомки и с них, не считаются.
2) События mouseenter / mouseleave не всплывают.
*/
/*
const blockForMouse = document.querySelector('.block-for-mouse');

blockForMouse.addEventListener("mouseenter", function (event) {
	console.log(`Курсор над элементом`);
});
blockForMouse.addEventListener("mouseleave", function (event) {
	console.log(`Курсор уходит с элемента`);
});
*/

//Делегирование событий наведения мыши
// const blockForMouse = document.querySelector(".block-for-mouse");
// blockForMouse.addEventListener("mouseover", function (event) {
//   let target = event.target.closest("span");
//   // переход не на <span> - игнорировать
//   if (!target) return;
//   target.style.cssText = `background-color: #77608d;`;
// });
// blockForMouse.addEventListener("mouseout", function (event) {
//   let target = event.target.closest("span");
//   // переход не на <span> - игнорировать
//   if (!target) return;
//   target.style.cssText = ``;
// });

//===================================================

// Клавиатура

/*
Основные события при работе с клавиатурой это:
	keydown – происходит при нажатии клавиши
	keyup – при отпускании клавиши
*/

// event.code и event.key

// document.addEventListener("keydown", function (event) {
//   console.log(event);
//   console.log(`Нажата клавиша ${event.code} (${event.key})`);

//   if (event.code === "KeyZ" && (event.altKey || event.metaAlt)) {
//     console.log("Отмена действия!");
//   }
// });
// document.addEventListener("keyup", function (event) {
//   console.log(`Отжата клавиша ${event.code} (${event.key})`);
// });

/*
Если пользователь работает с разными языками, то при переключении
на другой язык символ изменится с "G" на совершенно другой.
Получившееся станет новым значением event.key,
тогда как event.code останется тем же: "KeyG".
*/

// document.addEventListener("keydown", function (event) {
//   if (event.code == "KeyZ" && (event.ctrlKey || event.metaKey)) {
//     console.log("Отмена действия!");
//   }
// });

/*
Автоповтор
При долгом нажатии клавиши возникает автоповтор: keydown срабатывает
снова и снова, и когда клавишу отпускают, то отрабатывает keyup.
Так что ситуация, когда много keydown и один keyup, абсолютно нормальна.
Для событий, вызванных автоповтором, у объекта события
свойство event.repeat равно true.
*/
/*
document.addEventListener("keydown", function (event) {
	console.log(`Нажата клавиша ${event.code} (${event.key})`);
	console.log(event.repeat);
});
*/

// Пример
// const txtItem = document.querySelector(".textarea__item");
// const txtItemLimit = txtItem.getAttribute("maxlength");
// const txtCounter = document.querySelector(".textarea__counter span");
// txtCounter.innerHTML = txtItemLimit;

// txtItem.addEventListener("keyup", txtSetCounter);
// txtItem.addEventListener("keydown", function (event) {
//   if (event.repeat) txtSetCounter();
// });

// function txtSetCounter() {
//   const txtCounterResult = txtItemLimit - txtItem.value.length;
//   txtCounter.innerHTML = txtCounterResult;
// }

/*
document.addEventListener('keyup', function (event) {
	if (event.code === 'Escape') {
		menuBody.classList.remove('_active');
	}
});
*/

//===================================================

// Прокрутка (скролл)

// window.addEventListener("scroll", function (event) {
//   //кол-во прокрученных пикселей по вертикали
//   // scrollY или pageYOffset (устарел)
//   // кол-во прокрученных пикселей по горизонтали
//   // scrollX или pageXOffset (устарел)

//   console.log(`${scrollY}px`);
// });

// Предотвращение прокрутки
/*
Нельзя предотвратить прокрутку, используя event.preventDefault()
в обработчике scroll,  потому что он срабатывает после того,
как прокрутка уже произошла.

Но можно предотвратить прокрутку, используя event.preventDefault()
на событии, которое вызывает прокрутку, например,
на событии keydown для клавиш pageUp и pageDown.

Способов инициировать прокрутку много, более надёжный
способ – использовать CSS, свойство overflow: hidden;.
*/

/*
Использование

Событие прокрутки scroll позволяет реагировать на прокрутку страницы
или элемента. Есть много хороших вещей, которые при этом можно сделать.

- Показать / скрыть дополнительные элементы управления или информацию,
основываясь на том, в какой части документа находится пользователь.
Например анимация при скроле или ленивая подгрузка
- Подгрузить данные, когда пользователь прокручивает страницу вниз
до конца. Бесконечный скрол.

По ссылкам в описании есть видео с примерами реализации этого
функционала с помощью события scroll. Но, более интересным решением
данных задач будет использование IntersectionObserver, который позволяет
веб-приложениям асинхронно следить за изменением пересечения
элемента с его родителем или областью видимости документа.

Подробно об IntersectionObserver я расскажу в отдельном видео

*/

// window.addEventListener("scroll", function (event) {
//   if (window.scrollY >= 100) {
//     scroll.classList.add("_active");
//   } else {
//     scroll.classList.remove("_active");
//   }
// });

//===================================================

// События загрузки страницы
/*
1) DOMContentLoaded – браузер полностью загрузил HTML,
	было построено DOM - дерево, но внешние ресурсы,
	такие как картинки <img> и стили, могут быть ещё не загружены.
2) load – браузер загрузил HTML и внешние ресурсы (картинки, стили и т.д.)
3) beforeunload / unload – пользователь покидает страницу.
*/

/*
document.readyState - состояние загрузки

Есть три возможных значения:
"loading" – документ загружается.
"interactive" – документ был полностью прочитан.
"complete" – документ был полностью прочитан
и все ресурсы(такие как изображения) были тоже загружены.
*/

// Событие DOMContentLoaded срабатывает на объекте document
// document.addEventListener("DOMContentLoaded", () => {});

// Событие load срабатывает на объекте window
// window.addEventListener("load", readyLoad);

// function readyDom() {
// 	const image = document.querySelector('.image');
// 	console.log(document.readyState);
// 	console.log('DOM загружен!');
// 	console.log(image.offsetWidth);
// }
// function readyLoad() {
// 	console.log(document.readyState);
// 	const image = document.querySelector('.image');
// 	console.log('Страница загружена!');
// 	console.log(image.offsetWidth);
// }

/*
// Событие beforeunload срабатывает на объекте window
window.addEventListener("beforeunload", beforeUnLoad);

function beforeUnLoad(event) {
	// Отмените событие, как указано в стандарте.
	event.preventDefault();
	// Chrome требует установки возвратного значения.
	event.returnValue = '';
}


// Событие unload срабатывает на объекте window
window.addEventListener("unload", function (e) {
	// Отправка статистики в фоновом режиме и т.д.
	// navigator.sendBeacon(url, data)
	// https://w3c.github.io/beacon/.
});
*/
