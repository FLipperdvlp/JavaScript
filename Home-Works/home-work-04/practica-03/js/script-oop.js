// Task 1: Клас для перевірки паліндрому
class PalindromeChecker {
    static isPalindrome(str) {
        const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleaned === cleaned.split('').reverse().join('');
    }
}

// Task 2: Метод для конвертації температури
class TemperatureConverter {
    static celsiusToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }

    static fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5/9;
    }
}

// Task 3: Метод для обчислення факторіалу
class MathUtils {
    static factorial(n) {
        if (n < 0) return undefined;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

// Task 4: Клас для генерації паролів
class PasswordGenerator {
    static generate(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
}

// Task 5: Об'єкт для генерації градієнту
const GradientGenerator = {
    randomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    generateGradient() {
        const color1 = this.randomColor();
        const color2 = this.randomColor();
        return `linear-gradient(to right, ${color1}, ${color2})`;
    }
}

// Task 6: Метод для підрахунку голосних і приголосних
class StringAnalyzer {
    static countVowelsAndConsonants(str) {
        const vowels = 'aeiouаеєиіїоуюя';
        const consonants = 'bcdfghjklmnpqrstvwxyzбвгґджзйклмнпрстфхцчшщ';
        let vowelCount = 0;
        let consonantCount = 0;
        for (let char of str.toLowerCase()) {
            if (vowels.includes(char)) {
                vowelCount++;
            } else if (consonants.includes(char)) {
                consonantCount++;
            }
        }
        return { vowels: vowelCount, consonants: consonantCount };
    }
}

// Task 7: Метод для перевірки простого числа
class PrimeChecker {
    static isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }
}