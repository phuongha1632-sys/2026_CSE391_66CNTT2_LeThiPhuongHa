const query = document.querySelector("div");
const queryAll = document.querySelectorAll(".list-item");
const getId = document.getElementById("list");
[query, queryAll, getId].forEach((item) => {
  console.log(item);
});
