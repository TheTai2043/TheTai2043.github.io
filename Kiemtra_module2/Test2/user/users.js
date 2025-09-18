// Lấy users từ localStorage hoặc dùng mảng mặc định
let users = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 1,
    first_name: "Lorilee",
    last_name: "Adame",
    email: "ladame0@guardian.co.uk",
    password: "12345678",
  },
  {
    id: 2,
    first_name: "Gannon",
    last_name: "Manwell",
    email: "gmanwell1@naver.com",
    password: "12345678",
  },
  {
    id: 3,
    first_name: "Christiana",
    last_name: "Dowtry",
    email: "cdowtry2@mapy.cz",
    password: "12345678",
  },
  {
    id: 4,
    first_name: "Warden",
    last_name: "Ansteys",
    email: "wansteys3@yahoo.com",
    password: "12345678",
  },
  {
    id: 5,
    first_name: "Claybourne",
    last_name: "Barbosa",
    email: "cbarbosa4@si.edu",
    password: "12345678",
  },
  {
    id: 6,
    first_name: "Zita",
    last_name: "Triner",
    email: "ztriner5@youku.com",
    password: "12345678",
  },
  {
    id: 7,
    first_name: "Orsa",
    last_name: "Pilcher",
    email: "opilcher6@surveymonkey.com",
    password: "12345678",
  },
  {
    id: 8,
    first_name: "Lyn",
    last_name: "Fockes",
    email: "lfockes7@answers.com",
    password: "12345678",
  },
  {
    id: 9,
    first_name: "Harv",
    last_name: "Olifaunt",
    email: "holifaunt8@jalbum.net",
    password: "12345678",
  },
  {
    id: 10,
    first_name: "Nikita",
    last_name: "Duncanson",
    email: "nduncanson9@harvard.edu",
    password: "12345678",
  },
];

// Lưu lại localStorage để lần sau load trực tiếp
localStorage.setItem("users", JSON.stringify(users));

/* ========== HÀM RENDER ========== */
function renderUsers(data) {
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.classList.add("no-data");
    td.textContent = "Không tìm thấy user phù hợp.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  data.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td class="email-cell">${user.email}</td>
        <td>${user.password}</td>
      `;
    tbody.appendChild(tr);
  });
}

/* ========== MAIN ========== */
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchEmail");

  // Render tất cả users lần đầu
  renderUsers(users);

  // Tìm kiếm theo email
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    const filtered = users.filter((u) =>
      u.email.toLowerCase().includes(keyword)
    );
    renderUsers(filtered);
  });
});
