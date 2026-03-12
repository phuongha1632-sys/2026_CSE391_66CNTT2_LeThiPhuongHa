const btn = document.querySelector("#fetchBtn");
const list = document.querySelector("#userList");

// Hàm bất đồng bộ với async/await
async function fetchUsers() {
  try {
    // 2 & 4. Gọi API bằng Fetch và nhận dữ liệu JSON
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Kiểm tra lỗi kết nối (ví dụ: 404 hoặc 500)
    if (!response.ok) {
      throw new Error("Không thể kết nối đến server!");
    }

    const users = await response.json(); // Chuyển đổi dữ liệu sang JSON
    renderUsers(users); // Gọi hàm hiển thị
  } catch (error) {
    // 3. Quản lý lỗi bằng try/catch
    list.innerHTML = `<li style="color: red;">Lỗi: ${error.message}</li>`;
  }
}

// 5. Hiển thị dữ liệu lên DOM
function renderUsers(users) {
  list.innerHTML = ""; // Xóa dữ liệu cũ
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.name} - Email: ${user.email}`;
    list.appendChild(li);
  });
}

btn.addEventListener("click", fetchUsers);
