const form = document.querySelector("#todoForm");
const input = document.querySelector("#taskInput");
const ul = document.querySelector("#todoList");

// 1 & 3. Xử lý Submit Form và ngăn tải lại trang
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Ngăn reload

  // Thêm task mới
  const li = document.createElement("li");
  li.innerHTML = `${input.value} <button class="delete-btn">Xóa</button>`;
  ul.appendChild(li);

  input.value = ""; // Xóa trắng ô input
});

// 5. Event Delegation: Gắn 1 listener vào UL thay vì từng LI
ul.addEventListener("click", (e) => {
  // 4. Kiểm tra lan truyền sự kiện (bubbling)
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    console.log("Đã xóa task thành công!");
  }
});

// 2. Keyboard Event: Nhấn phím 'Enter' trong ô input cũng để thêm việc
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("Phím Enter được nhấn để submit!");
  }
});
