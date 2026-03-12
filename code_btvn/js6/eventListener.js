const title = document.querySelector("h1");
title.textContent = "Cac mon hoc trong thang 3";
const change = document.querySelector("ul");
const changeBtn = document.querySelector("#change-btn");
changeBtn.addEventListener("click", (e) => {
  change.innerHTML = `<li class="list-item decorate">Anh</li>`;
});
const returnBtn = document.querySelector("#return-btn");
returnBtn.addEventListener("click", (e) => {
  change.innerHTML = `<li class="list-item">Toán</li>
        <li class="list-item">Văn</li>
        <li class="list-item">Anh</li>
        <li class="list-item">Lý</li>`;
});

//gán nhiều eventListener cho 1 đối tượng thì các event đều được thực hiện theo thứ tự
changeBtn.addEventListener("click", () => {
  title.textContent = "Danh sách đã thay đổi";
});

/* click lần nữa: toggle màu nền */
changeBtn.addEventListener("click", () => {
  change.classList.toggle("active");
});

/* mouseenter */
changeBtn.addEventListener("mouseenter", () => {
  console.log("Chuột vừa đi vào nút change");
});
changeBtn.addEventListener("mouseenter", () => {
  console.log("Chuột vừa điiiii vào nút change");
});

/* mouseleave */
changeBtn.addEventListener("mouseleave", () => {
  console.log("Chuột vừa rời khỏi nút change");
});

const a = document.querySelector("#infor");
[changeBtn, returnBtn].forEach((item) => {
  item.addEventListener("mouseenter", (e) => {
    a.textContent = `Ơ, bạn vừa hover ${e.target.id} button`;
  });
  item.addEventListener("mouseleave", (e) => {
    a.textContent = "";
  });
});
const color = document.querySelector("#color");
color.addEventListener("click", (e) => {
  list.classList.toggle("overlay");
});
