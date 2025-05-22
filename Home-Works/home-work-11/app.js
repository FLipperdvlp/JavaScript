const usersGrid = document.getElementById("usersGrid");
const pagination = document.getElementById("pagination");
const userModal = document.getElementById("userModal");
const userForm = document.getElementById("userForm");
const modalTitle = document.getElementById("modalTitle");
const searchInput = document.createElement("input");

let users = [];
let currentPage = 1;
const itemsPerPage = 6;

searchInput.placeholder = "Search by name, email, or company...";
searchInput.className = "form-control mb-4";
searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderUsers();
});
document.querySelector(".container").insertBefore(searchInput, usersGrid);

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  users = data;
  renderUsers();
}
fetchUsers();

function renderUsers() {
  const query = searchInput.value.toLowerCase();
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.company.name.toLowerCase().includes(query)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageUsers = filtered.slice(start, start + itemsPerPage);

  usersGrid.innerHTML = pageUsers
    .map(
      (user) => `
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text"><i class="fas fa-envelope"></i> ${user.email}</p>
            <p class="card-text"><i class="fas fa-building"></i> ${user.company.name}</p>
            <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${user.address.street}, ${user.address.city}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = `btn btn-outline-primary ${i === currentPage ? "active" : ""}`;
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderUsers();
    };
    pagination.appendChild(btn);
  }
}

function showModal(user = null) {
  userModal.style.display = "flex";
  userForm.reset();
  if (user) {
    modalTitle.textContent = "Edit User";
    userForm.name.value = user.name;
    userForm.email.value = user.email;
    userForm.company.value = user.company.name;
    userForm.address.value = `${user.address.street}, ${user.address.city}`;
    document.getElementById("userId").value = user.id;
  } else {
    modalTitle.textContent = "Add User";
    document.getElementById("userId").value = "";
  }
}

function hideModal() {
  userModal.style.display = "none";
}

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("userId").value;
  const newUser = {
    id: id ? +id : Date.now(),
    name: userForm.name.value,
    email: userForm.email.value,
    company: { name: userForm.company.value },
    address: parseAddress(userForm.address.value),
  };

  if (id) {
    users = users.map((u) => (u.id == id ? newUser : u));
  } else {
    users.push(newUser);
  }

  hideModal();
  renderUsers();
});

function parseAddress(addrStr) {
  const [street = "", city = ""] = addrStr.split(",").map((x) => x.trim());
  return { street, city };
}

function editUser(id) {
  const user = users.find((u) => u.id === id);
  showModal(user);
}

function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    users = users.filter((u) => u.id !== id);
    renderUsers();
  }
}