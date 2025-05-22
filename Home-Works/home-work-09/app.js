// ===== Завдання 1 =====
const products = [
    { id: 1, name: "Ноутбук", price: 25000, category: "Електроніка" },
    { id: 2, name: "Книга", price: 300, category: "Книги" },
    { id: 3, name: "Смартфон", price: 15000, category: "Електроніка" },
  ];
  
  // 1.1
  const productNames = products.map(product => product.name);
  
  // 1.2
  const updatedPrices = products.map(product => ({
    ...product,
    price: product.price * 1.1
  }));
  
  // 1.3
  const htmlList = products.map(product => 
    `<li>${product.name} - ${product.price} грн (${product.category})</li>`
  );
  
  // ===== Завдання 2 =====
  const transactions = [
    { id: 1, amount: 100, type: "доходи", category: "Зарплата" },
    { id: 2, amount: 50, type: "витрати", category: "Продукти" },
    { id: 3, amount: 200, type: "доходи", category: "Фріланс" },
    { id: 4, amount: 75, type: "витрати", category: "Розваги" },
  ];
  
  // 2.1
  const incomeTransactions = transactions.filter(t => t.type === "доходи");
  
  // 2.2
  const over70Transactions = transactions.filter(t => t.amount > 70);
  
  // 2.3
  const bigExpenses = transactions.filter(t => t.type === "витрати" && t.amount > 50);
  
  // ===== Завдання 3 =====
  // 3.1
  const totalExpenses = transactions
    .filter(t => t.type === "витрати")
    .reduce((sum, t) => sum + t.amount, 0);
  
  // 3.2
  const amountByCategory = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  
  // 3.3
  const maxTransaction = transactions.reduce((max, t) =>
    t.amount > max.amount ? t : max, transactions[0]);
  
  // ===== Завдання 4 =====
  const team = [
    { name: "Іван", experience: 5, skills: ["JavaScript", "React", "Node.js"] },
    { name: "Марія", experience: 3, skills: ["Python", "Data Science"] },
    { name: "Петро", experience: 7, skills: ["Java", "Spring", "Hibernate"] },
  ];
  
  // 4.1
  const hasSenior = team.some(member => member.experience > 5);
  
  // 4.2
  const allExperienced = team.every(member => member.experience > 2);
  
  // 4.3
  const knowsReact = team.some(member => member.skills.includes("React"));
  
  // ===== Завдання 5 =====
  const library = [
    { title: "1984", author: "Джордж Орвелл", year: 1949 },
    { title: "Гаррі Поттер", author: "Джоан Роулінг", year: 1997 },
    { title: "Кобзар", author: "Тарас Шевченко", year: 1840 },
  ];
  
  // 5.1
  const sortedByYear = [...library].sort((a, b) => a.year - b.year);
  
  // 5.2
  const sortedByTitle = [...library].sort((a, b) => a.title.localeCompare(b.title));
  
  // 5.3
  const sortedByAuthor = [...library].sort((a, b) =>
    a.author.split(" ").pop().localeCompare(b.author.split(" ").pop())
  );
  
  // ===== Завдання 6 =====
  const users = [
    { id: 1, name: "Іван", role: "admin", active: true },
    { id: 2, name: "Марія", role: "user", active: false },
    { id: 3, name: "Петро", role: "user", active: true },
  ];
  
  // 6.1
  const userById = users.find(user => user.id === 2);
  
  // 6.2
  const firstActive = users.find(user => user.active);
  
  // 6.3
  const hasAdmin = users.some(user => user.role === "admin");