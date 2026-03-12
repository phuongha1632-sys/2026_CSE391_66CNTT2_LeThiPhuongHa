/*<!--
Thay đổi thuộc tính src của một thẻ <img>.
• Sử dụng dot notation để gán giá trị cho các properties.
• Thêm và xóa class cho phần tử bằng classList.add / remove.
• Sử dụng classList.toggle để bật/tắt một trạng thái.
• Kiểm tra sự tồn tại của class bằng classList.contains
    -->
*/
const img = document.querySelector("img");
const btn = document.querySelector("#change");
btn.addEventListener("click", (e) => {
  const current = img.getAttribute("src");
  if (current == "../images/chef-1.png")
    img.src = "../images/chef-2.png"; //dot notation
  else img.setAttribute("src", "../images/chef-1.png"); //setAttribute
});

//• Thêm và xóa class cho phần tử bằng classList.add / remove.
const greetingBlock = document.querySelector("#greeting-block");
const greetingNone = document.querySelector("#greeting-none");

const greeting = document.querySelector("#greeting");
greetingBlock.addEventListener("click", (e) => {
  greeting.classList.remove("d-none");
});
greetingNone.addEventListener("click", (e) => {
  greeting.classList.add("d-none");
});

//• Sử dụng classList.toggle để bật/tắt một trạng thái.

const modeBtn = document.querySelector("#mode");
const container = document.querySelector(".container-fluid");
modeBtn.addEventListener("click", (e) => {
  container.classList.toggle("black-mode");
  /*if(container.classList.contains("black-mode")        • Kiểm tra sự tồn tại của class bằng classList.contains
  container.classList.remove("black-mode")
    
  else
    container.classList.add("black-mode")

    */
});
