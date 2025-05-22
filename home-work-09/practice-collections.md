// === Завдання 1: Основи Map ===
console.log("Завдання 1:");

const map = new Map();
map.set("name", "iPhone");
map.set(42, "число");
map.set(true, "булеве значення");
const objKey = { id: 1 };
map.set(objKey, "об'єкт");

// 1.2 Отримання значень
console.log(map.get("name"));
console.log(map.get(42)); 
console.log(map.get(true)); 
console.log(map.get(objKey)); 

// 1.3 Перевірка існування ключів
console.log(map.has("name")); 
console.log(map.has("price")); 
console.log(map.has(true));
console.log(map.has({ id: 1 })); 

// 1.4 Функція для виводу всіх пар
function printMap(m) {
  for (const [key, value] of m) {
    console.log(`Key (тип: ${typeof key}): ${value}`);
  }
}
printMap(map);


// === Завдання 2: Практичне використання Map ===
console.log("\nЗавдання 2:");

const users = [
  { id: 1, role: "admin", name: "John" },
  { id: 2, role: "user", name: "Jane" },
  { id: 3, role: "admin", name: "Mike" },
  { id: 4, role: "user", name: "Anna" },
];

function groupByRole(users) {
  const roleMap = new Map();
  for (const user of users) {
    if (!roleMap.has(user.role)) {
      roleMap.set(user.role, []);
    }
    roleMap.get(user.role).push(user);
  }
  return roleMap;
}

const grouped = groupByRole(users);
console.log(grouped);


const numbers = [1, 2, 2, 3, 3, 4, 5, 5, 6];
const uniqueNumbers = new Set(numbers);
console.log(uniqueNumbers);

// 3.2 Функції для множин
function union(setA, setB) {
  return new Set([...setA, ...setB]);
}

function intersection(setA, setB) {
  return new Set([...setA].filter(x => setB.has(x)));
}

function difference(setA, setB) {
  return new Set([...setA].filter(x => !setB.has(x)));
}

const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);
console.log("Union:", union(set1, set2)); 
console.log("Intersection:", intersection(set1, set2)); 
console.log("Difference:", difference(set1, set2)); 

// 3.3 Підмножина
function isSubset(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.every(item => set2.has(item));
}
console.log(isSubset([1, 2], [1, 2, 3, 4])); // true
console.log(isSubset([1, 2, 5], [1, 2, 3, 4])); // false


// === Завдання 4: Практичне використання Set ===
console.log("\nЗавдання 4:");

const posts = [
  { id: 1, tags: ["javascript", "tutorial"] },
  { id: 2, tags: ["javascript", "react"] },
  { id: 3, tags: ["tutorial", "react"] },
];

const allTags = posts.flatMap(post => post.tags);
const uniqueTags = new Set(allTags);
console.log(uniqueTags);

const emails = [
  "user@gmail.com",
  "admin@gmail.com",
  "user@gmail.com",
  "test@yahoo.com",
  "admin@gmail.com",
];

const uniqueEmails = new Set(emails);
console.log(uniqueEmails); 
