const container = document.querySelector(".container");
const LoginLink = document.querySelector(".SignInLink");
const RegsiterLink = document.querySelector(".SignUpLink");
RegsiterLink.addEventListener("click", () => {
  container.classList.add("active");
});
LoginLink.addEventListener("click", () => {
  container.classList.remove("active");
});

let users = JSON.parse(localStorage.getItem("users")) || [];
// Lưu vào localStorage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("registerEmail").value.trim();
    let password = document.getElementById("registerPassword").value.trim();

    if (!firstName || !lastName || !email || !password) {
      alert("Hãy nhập đầy đủ thông tin");
      return;
    }

    let checkEmail = users.find((u) => u.email === email);
    if (checkEmail) {
      alert("Email này đã có tài khoản");
      return;
    }

    let newId = users.length ? users[users.length - 1].id + 1 : 1;
    let newUser = {
      id: newId,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };
    users.push(newUser);
    saveUsers();

    alert("Đăng ký thành công!");
    this.reset();
  });

// =======================
// Đăng nhập
// =======================
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

  let user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Đăng nhập thành công. Xin chào " + user.first_name + "!");
    window.location.href = "../Posts/posts.html";
  } else {
    alert("Sai email hoặc mật khẩu");
  }
});
