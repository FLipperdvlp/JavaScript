# Детальна JavaScript реалізація (app.js)

### 1. Налаштування констант та глобальних змінних

```javascript
// API URL для отримання даних користувачів
const API_URL = "https://jsonplaceholder.typicode.com/users";
const USERS_PER_PAGE = 4; // Кількість користувачів на сторінці

// Глобальні змінні для керування станом
let users = []; // Масив усіх користувачів
let currentPage = 1; // Поточна сторінка
let totalPages = 1; // Загальна кількість сторінок
let editingUserId = null; // ID користувача, якого редагуємо
```

### 2. Завантаження користувачів

```javascript
// Функція для завантаження користувачів з API
async function loadUsers() {
  try {
    const response = await fetch(API_URL);
    users = await response.json();
    totalPages = Math.ceil(users.length / USERS_PER_PAGE);
    showUsers(); // Показуємо користувачів після завантаження
  } catch (error) {
    console.error("Помилка завантаження:", error);
  }
}

// Запускаємо завантаження при старті
document.addEventListener("DOMContentLoaded", loadUsers);
```

### 3. Відображення користувачів

```javascript
function showUsers() {
  const start = (currentPage - 1) * USERS_PER_PAGE;
  const end = start + USERS_PER_PAGE;
  const currentUsers = users.slice(start, end);

  const usersGrid = document.getElementById("usersGrid");
  usersGrid.innerHTML = currentUsers
    .map(
      (user) => `
            <div class="col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.name}</h5>
                        <p class="card-text">
                            <i class="fas fa-envelope"></i> ${user.email}<br>
                            <i class="fas fa-building"></i> ${user.company.name}<br>
                            <i class="fas fa-map-marker-alt"></i> ${user.address.city}
                        </p>
                        <div class="btn-group">
                            <button class="btn btn-primary btn-sm" onclick="editUser(${user.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    )
    .join("");

  showPagination();
}
```

### 4. Пагінація

```javascript
function showPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = `
        <button class="btn btn-secondary" onclick="changePage(${
          currentPage - 1
        })" 
                ${currentPage === 1 ? "disabled" : ""}>
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="btn btn-secondary">
            ${currentPage} / ${totalPages}
        </button>
        <button class="btn btn-secondary" onclick="changePage(${
          currentPage + 1
        })"
                ${currentPage === totalPages ? "disabled" : ""}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
}

function changePage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    showUsers();
  }
}
```

### 5. Керування модальним вікном

```javascript
function showModal() {
  document.getElementById("userModal").style.display = "flex";
  document.getElementById("modalTitle").textContent = editingUserId
    ? "Редагувати користувача"
    : "Додати користувача";
}

function hideModal() {
  document.getElementById("userModal").style.display = "none";
  document.getElementById("userForm").reset();
  editingUserId = null;
}
```

### 6. Редагування користувача

```javascript
function editUser(id) {
  editingUserId = id;
  const user = users.find((u) => u.id === id);

  if (user) {
    const form = document.getElementById("userForm");
    form.name.value = user.name;
    form.email.value = user.email;
    form.company.value = user.company.name;
    form.address.value = `${user.address.street}, ${user.address.city}`;
    showModal();
  }
}
```

### 7. Видалення користувача

```javascript
function deleteUser(id) {
  if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          users = users.filter((user) => user.id !== id);
          if (
            users.length <= (currentPage - 1) * USERS_PER_PAGE &&
            currentPage > 1
          ) {
            currentPage--;
          }
          showUsers();
        }
      })
      .catch((error) => console.error("Помилка видалення:", error));
  }
}
```

### 8. Обробка форми

```javascript
function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: { name: formData.get("company") },
    address: {
      street: formData.get("address").split(",")[0] || "",
      city: formData.get("address").split(",")[1] || "",
    },
  };

  if (editingUserId) {
    // Оновлення існуючого користувача
    fetch(`${API_URL}/${editingUserId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        users = users.map((user) =>
          user.id === editingUserId
            ? { ...updatedUser, id: editingUserId }
            : user
        );
        hideModal();
        showUsers();
      })
      .catch((error) => console.error("Помилка оновлення:", error));
  } else {
    // Створення нового користувача
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((newUser) => {
        users.unshift({ ...newUser, id: Date.now() }); // Використовуємо timestamp як ID
        totalPages = Math.ceil(users.length / USERS_PER_PAGE);
        currentPage = 1;
        hideModal();
        showUsers();
      })
      .catch((error) => console.error("Помилка створення:", error));
  }
}
```

### Можливі розширення функціоналу

#### 1. Покращення інтерфейсу користувача

1. **Пошук користувачів**:

   - Додати поле пошуку
   - Реалізувати фільтрацію за ім'ям, email або компанією
   - Додати автодоповнення при пошуку

2. **Сортування**:

   - Додати можливість сортування за різними полями (ім'я, email, компанія)

3. **Розширена пагінація**:
   - Додати вибір кількості користувачів на сторінці
   - Додати швидкий перехід на першу/останню сторінку
   - Показувати загальну кількість користувачів

#### 2. Технічні вдосконалення

1. **Оптимізація продуктивності**:
   - Реалізувати кешування даних
