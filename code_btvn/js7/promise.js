const statusEl = document.querySelector("#status");
const orderBtn = document.querySelector("#orderBtn");

// 1. Tự tạo Promise mô phỏng lấy dữ liệu (Fake API)
const fetchOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    statusEl.innerText = "Đang lấy dữ liệu...";
    setTimeout(() => {
      if (orderId > 0) {
        resolve({ id: orderId, product: "Laptop", status: "Đã xác nhận" });
      } else {
        reject("Lỗi: Mã đơn hàng không hợp lệ!");
      }
    }, 2000);
  });
};

// 3. Chuỗi Chain Promises
orderBtn.addEventListener("click", () => {
  fetchOrder(101)
    .then((order) => {
      console.log("Bước 1: Lấy đơn hàng", order);
      return order.product; // Trả về giá trị cho bước .then() kế tiếp
    })
    .then((productName) => {
      console.log("Bước 2: Xử lý sản phẩm", productName);
      return `Sản phẩm ${productName} đang được đóng gói`;
    })
    .then((message) => {
      statusEl.innerText = message;
    })
    // 4. Xử lý lỗi tập trung
    .catch((error) => {
      statusEl.innerText = error;
      console.error(error);
    });
});

// 5. Chuyển đổi Callback truyền thống sang Promise
// Giả sử có hàm cũ: function checkInventory(cb) { ... }
const checkInventory = () => {
  return new Promise((resolve, reject) => {
    const hasStock = true;
    if (hasStock) resolve("Còn hàng");
    else reject("Hết hàng");
  });
};
