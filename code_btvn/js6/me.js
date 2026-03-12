/*
Thao tác nội dung và cấu trúc DOM:
• Thay đổi văn bản tiêu đề bằng textContent.
• Chèn thêm mã HTML vào một div bằng innerHTML.
• Sử dụng createElement để tạo một thẻ <li> mới.
• Append phần tử vừa tạo vào danh sách <ul>.
• Thử xóa một phần tử bằng phương thức remove().
*/

const title = document.querySelector("h1");
const changeBtn = document.querySelector("#changeBtn");
changeBtn.addEventListener("click", (e) => {
  title.textContent = "Tiêu đề mới nè";
});

const insert = document.querySelector("#insert");
insert.innerHTML = `<div class="decorate">mới chèn bằng innerHTML</div>`;

const removeBtn = document.querySelector("#removeBtn");
const remove = document.querySelector(".remove");
removeBtn.addEventListener("click", (e) => {
  remove.remove();
});

const newE = document.createElement("li");
newE.textContent = "Sử";
const ul = document.querySelector("ul");
ul.appendChild(newE);
