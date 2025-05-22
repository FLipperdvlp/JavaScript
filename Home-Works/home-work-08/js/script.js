document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('user-form');
  const nameInput = document.getElementById('user-name');
  const ageInput = document.getElementById('user-age');
  const emailInput = document.getElementById('user-email');
  const usersList = document.querySelector('.users-list');

  let users = JSON.parse(localStorage.getItem('users')) || [];

  function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function renderUsers() {
    usersList.innerHTML = '';

    users.forEach((user, index) => {
      const li = document.createElement('li');
      li.className = 'list-item d-flex justify-content-between align-items-start border p-3 mb-2 rounded bg-light text-dark';

      li.innerHTML = `
        <div class="user-data-container">
          <div class="user-data"><strong>Name:</strong> ${user.name}</div>
          <div class="user-data"><strong>Age:</strong> ${user.age}</div>
          <div class="user-data"><strong>Email:</strong> ${user.email}</div>
        </div>
        <button class="user-delete-button btn btn-danger btn-sm" data-index="${index}" title="Delete user">&times;</button>
      `;

      usersList.appendChild(li);
    });
  }

  function addUser(name, age, email) {
    users.push({ name, age, email });
    saveUsers();
    renderUsers();
  }

  function deleteUser(index) {
    users.splice(index, 1);
    saveUsers();
    renderUsers();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const email = emailInput.value.trim();

    if (name && age && email) {
      addUser(name, age, email);
      form.reset();
    }
  });

  usersList.addEventListener('click', (e) => {
    if (e.target.classList.contains('user-delete-button')) {
      const index = parseInt(e.target.dataset.index, 10);
      deleteUser(index);
    }
  });

  renderUsers();
});