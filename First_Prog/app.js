// ! Запросіть у користувача дані за допомогою prompt() і виведіть результат за допомогою alert().

// 1. Запросіть у користувача 2 числа та виведіть середнє арифметичне цих чисел.

{
    let firstNumber = Number(prompt("Enter first number"));
    let secondNumber = parseInt(prompt("Enter second number"));
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        console.log("You entered not a number)");
    } else {
        let average = (firstNumber + secondNumber) / 2;
    console.log(`Average of ${firstNumber} and ${secondNumber} is ${average}`);
}
}


  // 2. Запросіть у користувача тризначне число та виведіть другу цифру цього числа. Для вирішення завдання використовуйте оператор % (залишок від ділення).
  function task_1(){

      let number = parseInt(prompt("Введіть тризначне число:"));
      if (number >= 100 && number <= 999) {
          let middleDigit = Math.floor((number % 100) / 10);
          alert("Друга цифра: " + middleDigit);
        } else {
            alert("Це не тризначне число!");
        }
    }
  // ! Завдання, в якому необхідно використати IF.

  // 3. Запросіть у користувача його вік та перевірте коректність введених даних (0–120 років). Виведіть відповідне повідомлення.
  function task_3()  {

      let age = parseInt(prompt("Введіть ваш вік:"));
      
      if (!isNaN(age)) {
          if (age >= 0 && age <= 120) {
                alert("Ваш вік: " + age + " років.");
            } else {
                alert("Введено некоректний вік (має бути від 0 до 120).");
            }
        }
    }
  // 4. Запросіть у користувача число. Виведіть інше повідомлення, якщо користувач ввів від’ємне число, і інше повідомлення, якщо користувач ввів додатнє число.
  function task_4(){
    let number = parseFloat(prompt("Введіть будь-яке число:"));
    if (!isNaN(number)) {
        let type;
        if (number > 0) {
            type = "positive";
        } else if (number < 0) {
            type = "negative";
        } else {
            type = "zero";
        }
    
        switch (type) {
            case "positive":
                alert("Це додатнє число.");
                break;
            case "negative":
                alert("Це від’ємне число.");
                break;
            case "zero":
                alert("Це нуль.");
                break;
        }
    }
    
    }
  // ! Завдання, в якому необхідно використати SWITCH.

  // 5. Реалізуйте калькулятор. Користувач вводить 2 числа та знак (+ - */). Залежно від введеного знака розв’яжіть приклад та виведіть результат.
    function task_5(){
        let num1 = parseFloat(prompt("Введіть перше число:"));
        let num2 = parseFloat(prompt("Введіть друге число:"));
        let sign = prompt("Введіть знак операції (+, -, *, /):");
        
        let result = 
            sign === "+" ? num1 + num2 :
            sign === "-" ? num1 - num2 :
            sign === "*" ? num1 * num2 :
            sign === "/" ? num1 / num2 :
            "Невідомий оператор";
        
        alert("Результат: " + result);
        

    }
  // ! Завдання, в якому необхідно використати тернарний оператор.

  // 6. Запросіть у користувача назву планети. Якщо користувач ввів «Земля» або «земля», то виведіть «Привіт, землянине!». В інших випадках виведіть «Привіт, інопланетянине!».
    function task_6(){
        let planet;
        while (true) {
            planet = prompt("Введіть назву планети:");
        
            if (planet === null) {
                alert("Ви скасували введення.");
                break;  
            }
        
            if (planet.toLowerCase() === "земля") {
                alert("Привіт, землянине!");
                break;  
            } else {
                alert("Привіт, інопланетянине!");
                break;  
            }
        }
    }
  // ! Для виведення даних використовуйте alert() або console.log(). Для введення даних використовуйте prompt() та confirm().
  // ! Завдання, в яких необхідно використати WHILE.

  // 7. Запросіть 2 числа і знайдіть всі спільні дільники.
    function task_7(){
        let num1 = parseInt(prompt("Введіть перше число:"));
        let num2 = parseInt(prompt("Введіть друге число:"));
        let min = Math.min(num1, num2);  
        let commonDivisors = [];
        for (let i = 1; i <= min; i++) {
            if (num1 % i === 0 && num2 % i === 0) {
                commonDivisors.push(i);  
            }
        }
        if (commonDivisors.length > 0) {
            alert("Спільні дільники: " + commonDivisors.join(", "));
        } else {
            alert("Спільних дільників немає.");
        }

    }
  // 8. Запросіть у користувача число і виведіть всі його дільники.
    function task_8(){
        let number = parseInt(prompt("Введіть число:"));
        let i = 1;
        let divisors = [];

        do {
            if (number % i === 0) {
                divisors.push(i); 
            }
            i++;  
        } while (i <= number);

        alert("Дільники числа " + number + ": " + divisors.join(", "));

    }
  // ! Завдання, в яких необхідно використати DO WHILE.

  // 9. Підрахуйте факторіал числа, введеного користувачем.
    function task_9(){
        let number = parseInt(prompt("Введіть число для обчислення факторіалу:"));
        let factorial = 1;
            
        if (number >= 0) {
            for (let i = 1; i <= number; i++) {
                factorial *= i;
            }
            alert("Факторіал числа " + number + " дорівнює " + factorial);
        } else {
            alert("Будь ласка, введіть невід'ємне число.");
        }

    }
  // ! Завдання, в яких потрібно використати FOR.
  // 10. Виведіть усі числа від 1 до 100, які кратні числу зазначеному користувачем.
  function task_10(){
      let number = parseInt(prompt("Введіть число:"));
      let multiples = [];

      if (number > 0) {
          for (let i = 1; i <= 100; i++) {
              if (i % number === 0) {
                  multiples.push(i);
              }
          }
          alert("Числа від 1 до 100, які кратні " + number + ": " + multiples.join(", "));
      } else {
          alert("Будь ласка, введіть позитивне число.");
      }

  }