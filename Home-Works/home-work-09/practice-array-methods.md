// ===============================
// Завдання 1: map
// ===============================
const products = [
  { id: 1, name: "Ноутбук", price: 25000, category: "Електроніка" },
  { id: 2, name: "Книга", price: 300, category: "Книги" },
  { id: 3, name: "Смартфон", price: 15000, category: "Електроніка" },
];

// 1.1 Назви продуктів
const productNames = products.map(p => p.name);

// 1.2 Ціни +10%
const increasedPrices = products.map(p => ({ ...p, price: p.price * 1.1 }));

// 1.3 HTML-розмітка
const productHTML = products.map(p =>
  `<li>${p.name} — ${p.price} грн (${p.category})</li>`
).join('\n');

// ===============================
// Завдання 2: filter
// ===============================
const transactions = [
  { id: 1, amount: 100, type: "доходи", category: "Зарплата" },
  { id: 2, amount: 50, type: "витрати", category: "Продукти" },
  { id: 3, amount: 200, type: "доходи", category: "Фріланс" },
  { id: 4, amount: 75, type: "витрати", category: "Розваги" },
];

// 2.1 Фільтр доходів
const incomes = transactions.filter(t => t.type === "доходи");

// 2.2 Сума > 70
const largeTransactions = transactions.filter(t => t.amount > 70);

// 2.3 Витрати > 50
const filteredExpenses = transactions.filter(t => t.type === "витрати" && t.amount > 50);

// ===============================
// Завдання 3: reduce
// ===============================
// 3.1 Загальна сума витрат
const totalExpenses = transactions
  .filter(t => t.type === "витрати")
  .reduce((sum, t) => sum + t.amount, 0);

// 3.2 Сума по категоріях
const sumByCategory = transactions.reduce((acc, t) => {
  acc[t.category] = (acc[t.category] || 0) + t.amount;
  return acc;
}, {});

// 3.3 Найбільша транзакція
const maxTransaction = transactions.reduce((max, t) =>
  t.amount > max.amount ? t : max
);

// ===============================
// Завдання 4: some, every
// ===============================
const team = [
  { name: "Іван", experience: 5, skills: ["JavaScript", "React", "Node.js"] },
  { name: "Марія", experience: 3, skills: ["Python", "Data Science"] },
  { name: "Петро", experience: 7, skills: ["Java", "Spring", "Hibernate"] },
];

// 4.1 Є з досвідом > 5 років?
const hasSenior = team.some(member => member.experience > 5);

// 4.2 Всі мають досвід > 2 років?
const allExperienced = team.every(member => member.experience > 2);

// 4.3 Хтось знає React?
const knowsReact = team.some(member => member.skills.includes("React"));

// ===============================
// Завдання 5: sort
// ===============================
const library = [
  { title: "1984", author: "Джордж Орвелл", year: 1949 },
  { title: "Гаррі Поттер", author: "Джоан Роулінг", year: 1997 },
  { title: "Кобзар", author: "Тарас Шевченко", year: 1840 },
];

// 5.1 За роком
const sortedByYear = [...library].sort((a, b) => a.year - b.year);

// 5.2 За назвою
const sortedByTitle = [...library].sort((a, b) => a.title.localeCompare(b.title));

// 5.3 За прізвищем автора
const sortedByAuthorSurname = [...library].sort((a, b) => {
  const aSurname = a.author.split(" ").pop();
  const bSurname = b.author.split(" ").pop();
  return aSurname.localeCompare(bSurname);
});

// ===============================
// Завдання 6: find, some
// ===============================
const users = [
  { id: 1, name: "Іван", role: "admin", active: true },
  { id: 2, name: "Марія", role: "user", active: false },
  { id: 3, name: "Петро", role: "user", active: true },
];

// 6.1 Знайти користувача з id:2
const userById = users.find(u => u.id === 2);

// 6.2 Перший активний користувач
const firstActiveUser = users.find(u => u.active);

// 6.3 Чи є адмін?
const hasAdmin = users.some(u => u.role === "admin");

// ===============================
// Завдання 7: Комплексне
// ===============================
const schoolSystem = {
  schools: [
    {
      id: 1,
      name: "Школа №1",
      classes: [
        {
          id: 1,
          name: "5-A",
          students: [
            { id: 1, name: "Іван", grades: [10, 9, 8] },
            { id: 2, name: "Марія", grades: [11, 10, 9] },
            { id: 3, name: "Петро", grades: [8, 8, 7] },
            { id: 4, name: "Олена", grades: [10, 9, 9] },
          ],
        },
        {
          id: 2,
          name: "6-B",
          students: [
            { id: 5, name: "Олександр", grades: [8, 8, 7] },
            { id: 6, name: "Олена", grades: [10, 9, 9] },
            { id: 7, name: "Марія", grades: [11, 10, 9] },
            { id: 8, name: "Іван", grades: [10, 9, 8] },
          ],
        },
        {
          id: 3,
          name: "7-C",
          students: [
            { id: 9, name: "Олександр", grades: [8, 8, 7] },
            { id: 10, name: "Олена", grades: [10, 9, 9] },
            { id: 11, name: "Марія", grades: [11, 10, 9] },
            { id: 12, name: "Іван", grades: [10, 9, 8] },
          ],
        },
      ],
    },
  ],
};

// 7.1 Середній бал по школі
const allStudents = schoolSystem.schools.flatMap(school =>
  school.classes.flatMap(cls => cls.students)
);
const totalGrades = allStudents.flatMap(s => s.grades);
const averageSchoolGrade = totalGrades.reduce((a, b) => a + b, 0) / totalGrades.length;

// 7.2 Список учнів з середнім балом
const studentsWithAverage = allStudents.map(s => ({
  name: s.name,
  average: s.grades.reduce((a, b) => a + b, 0) / s.grades.length
}));

// 7.3 Клас з найвищим середнім балом
const classes = schoolSystem.schools[0].classes;
const classWithAverages = classes.map(cls => {
  const grades = cls.students.flatMap(s => s.grades);
  const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
  return { name: cls.name, average: avg };
});
const topClass = classWithAverages.reduce((max, c) =>
  c.average > max.average ? c : max
);

// 7.4 Звіт по класах
const report = classWithAverages;

// ===============================
// Вивід для перевірки
// ===============================
console.log("1.1 Назви продуктів:", productNames);
console.log("1.2 Збільшені ціни:", increasedPrices);
console.log("1.3 HTML розмітка:\n", productHTML);

console.log("2.1 Доходи:", incomes);
console.log("2.2 Сума > 70:", largeTransactions);
console.log("2.3 Витрати > 50:", filteredExpenses);

console.log("3.1 Загальні витрати:", totalExpenses);
console.log("3.2 Сума по категоріях:", sumByCategory);
console.log("3.3 Найбільша транзакція:", maxTransaction);

console.log("4.1 Є з досвідом > 5:", hasSenior);
console.log("4.2 Всі досвідчені:", allExperienced);
console.log("4.3 Хтось знає React:", knowsReact);

console.log("5.1 За роком:", sortedByYear);
console.log("5.2 За назвою:", sortedByTitle);
console.log("5.3 За прізвищем автора:", sortedByAuthorSurname);

console.log("6.1 Користувач з id 2:", userById);
console.log("6.2 Перший активний:", firstActiveUser);
console.log("6.3 Є адмін:", hasAdmin);

console.log("7.1 Середній бал по школі:", averageSchoolGrade.toFixed(2));
console.log("7.2 Учні з середніми балами:", studentsWithAverage);
console.log("7.3 Клас з найвищим середнім:", topClass);
console.log("7.4 Звіт по класах:", report);
