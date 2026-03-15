/*
+) Tất cả yêu cầu validate cơ bản như Bài 2.1 (submit, blur, xóa lỗi khi input).

+) Đếm ký tự realtime cho ô Ghi chú: Hiển thị số ký tự đã nhập, tối
đa (VD: 45/200). Khi vượt quá → số đếm đổi màu đỏ và hiện thông báo lỗi.

+) Tính tổng tiền tự động: Khi người dùng chọn sản phẩm hoặc thay đổi số
lượng, tự động tính và hiển thị tổng tiền (giá mỗi sản phẩm do sinh viên
tự định nghĩa trong một object). Dùng sự kiện change trên <select> và input
trên số lượng.

+) Xác nhận trước khi submit: Khi form hợp lệ, hiển thị một <div> tóm tắt thông
tin đơn hàng (tên SP, số lượng, tổng tiền, ngày giao) và hỏi "Xác nhận đặt
hàng?" với 2 nút "Xác nhận" và "Hủy". Chỉ khi bấm "Xác nhận" mới hiển thị
thông báo thành công.


Tên sản phẩm: Dropdown <select>, bắt buộc chọn (không để "-- Chọn sản phẩm --")
Số lượng: Số nguyên, từ 1 đến 99
Ngày giao hàng: Kiểu date, ko được là ngày quá khứ, ko quá 30 ngày từ hôm nay
Địa chỉ giao: Không trống, ≥ 10 ký tự
Ghi chú: Không bắt buộc, nhưng nếu nhập thì không quá 200 ký tự
Pthức thanh toán: Radio button: COD / Chuyển khoản / Ví điện tử — bắt buộc chọn
*/

const products = [
  { name: "pants", price: 200000 },
  { name: "clothes", price: 150000 },
  { name: "hat", price: 80000 },
  { name: "shoes", price: 500000 },
  { name: "belt", price: 120000 },
];

$(document).ready(function () {
  $.validator.addMethod(
    "dateStrong",
    function (value, element) {
      const inputDate = new Date(value);
      const today = new Date();
      let future = new Date();
      inputDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      future.setHours(0, 0, 0, 0);
      future.setDate(future.getDate() + 30);
      return (
        this.optional(element) || (inputDate <= future && inputDate >= today)
      );
    },
    "ko được là ngày quá khứ, ko quá 30 ngày từ hôm nay",
  );
  $("form").validate({
    rules: {
      name: {
        required: true,
      },
      quantity: {
        digits: true,
        range: [1, 99],
      },
      date: {
        dateStrong: true,
      },
      address: {
        required: true,
        minlength: 10,
      },
      note: {
        maxlength: 200,
      },
      radio: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "bắt buộc chọn",
      },
      quantity: {
        digits: "Số nguyên",
        range: "từ 1 đến 99",
      },
      address: {
        required: "bắt buộc chọn",
        minlength: ">=10 ký tự",
      },
      note: {
        maxlength: " không quá 200 ký tự",
      },
      radio: {
        required: "bắt buộc chọn",
      },
    },
    submitHandler: function () {
      const value = {
        name: dropdown.value,
        quantity: Number(document.querySelector("#quantity").value.trim()),
        date: document.querySelector("#date").value,
        price: `${Number(total()).toLocaleString("vi-VN")}đ`,
      };
      renderSuccess(value);
    },
  });
});

/*
+) Xác nhận trước khi submit: Khi form hợp lệ, hiển thị một <div> tóm tắt thông
tin đơn hàng (tên SP, số lượng, tổng tiền, ngày giao) và hỏi "Xác nhận đặt
hàng?" với 2 nút "Xác nhận" và "Hủy". Chỉ khi bấm "Xác nhận" mới hiển thị
thông báo thành công.
*/

const renderSuccess = (value) => {
  const infor = document.querySelector("#infor");
  infor.innerHTML = `<div>
  XÁC NHẬN ĐẶT HÀNG? <br>
  tên sp: ${value.name}, <br>
  số lượng: ${value.quantity},<br>
  tổng tiền: ${value.price}, <br>
  ngày giao hàng: ${value.date}<br>
  <button id="cfBtn">Xác nhận</button>
  <button id="cancelBtn">Hủy</button>
  </div>`;
  document.querySelector("#cfBtn").onclick = () => {
    alert("đặt hàng thành công");
    infor.innerHTML = "";
  };
  document.querySelector("#cancelBtn").onclick = () => {
    alert("đã hủy đơn hàng");
    infor.innerHTML = "";
  };
};

// Đếm ký tự realtime cho ô Ghi chú: Hiển thị số ký tự đã nhập, tối
//đa (VD: 45/200). Khi vượt quá → số đếm đổi màu đỏ và hiện thông báo lỗi.
const noteInput = document.querySelector("#note");
const countC = () => {
  noteInput.classList.remove("error-bd");
  const noteValue = noteInput.value;
  const number = document.querySelector("#count");
  number.innerHTML = `${noteValue.length}/200`;
  if (noteValue.length > 200) {
    noteInput.classList.add("error-bd");
  }
};
noteInput.addEventListener("input", countC);

/*
+) Tính tổng tiền tự động: Khi người dùng chọn sản phẩm hoặc thay đổi số
lượng, tự động tính và hiển thị tổng tiền (giá mỗi sản phẩm do sinh viên
tự định nghĩa trong một object). Dùng sự kiện change trên <select> và input
trên số lượng.
*/
const dropdown = document.querySelector("select");
const quantityInput = document.querySelector("#quantity");
const totalPrice = document.querySelector("#totalPrice");
//function xử lý login, function render nên tách riêng, ko nên gộp chung vô 1 function
const total = () => {
  const productName = dropdown.value;
  const quantity = Number(quantityInput.value.trim());

  const a = products.find((item) => item.name === productName);
  if (a && quantity > 0) return quantity * a.price;
  return 0;
};

quantityInput.addEventListener("input", () => {
  totalPrice.innerHTML = `${Number(total()).toLocaleString("vi-VN")}đ`;
});
dropdown.addEventListener("change", () => {
  totalPrice.innerHTML = `${Number(total()).toLocaleString("vi-VN")}đ`;
});
