const products = [
  { name: "quan", price: 200000 },
  { name: "ao", price: 150000 },
  { name: "mu", price: 80000 },
  { name: "giay", price: 500000 },
  { name: "dep", price: 120000 },
];
$(document).ready(function () {
  $.validator.addMethod(
    "dateStrong",
    function (value, element) {
      if (!value) return false;

      const selected = new Date(value);
      const today = new Date();
      const max = new Date();

      selected.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      max.setHours(0, 0, 0, 0);
      max.setDate(today.getDate() + 30);

      return selected >= today && selected <= max;
    },
    "Ngày phải từ hôm nay đến tối đa 30 ngày tới",
  );
  $("#form").validate({
    rules: {
      quantity: {
        range: [1, 99],
        digits: true, //số nguyên, ko âm
      },
      name: {
        required: true,
      },
      address: {
        required: true,
        minlength: 10,
      },
      note: {
        maxlength: 200,
      },
      date: {
        dateStrong: true,
      },
      radio: {
        required: true,
      },
    },
    messages: {
      quantity: {
        range: "từ 1 đến 99",
        digits: "Số nguyên",
      },
      name: {
        required: "bắt buộc chọn",
      },
      address: {
        required: "Không trống",
        minlength: ">10 ký tự",
      },
      note: {
        maxlength: " không quá 200 ký tự",
      },
      radio: {
        required: "bắt buộc chọn",
      },
    },
    submitHandler: function (form) {
      const nameValue = nameProduct.value.trim();
      const slg = quantity.value.trim();
      const date = document.querySelector("#date").value;
      const tong = total();
      const cf = confirm(`
          Xác nhận đặt hàng

          tên sản phẩm: ${nameValue}
          số lượng: ${slg}
          tổng tiền: ${tong}đ
          ngày giao: ${date}
          `);
      if (cf) {
        alert("đặt hàng thành công");
        form.submit();
      } else alert("đã hủy đơn đặt hàng");
    },
  });
});
//Xác nhận trước khi submit: Khi form hợp lệ, hiển thị một <div> tóm tắt thông tin đơn
// hàng (tên SP, số lượng, tổng tiền, ngày giao) và hỏi "Xác nhận đặt hàng?" với 2
// nút "Xác nhận" và "Hủy". Chỉ khi bấm "Xác nhận" mới hiển thị thông báo thành công.

//Tính tổng tiền tự động: Khi chọn sản phẩm hoặc thay đổi số lượng, tự động tính và hiển thị tổng tiền
// (giá mỗi sản phẩm do sinh viên tự định nghĩa trong một object). Dùng sự kiện change trên <select> và input trên số lượng.
const nameProduct = document.querySelector("#dropdown");
const quantity = document.querySelector("#quantity");
const totalPrice = document.querySelector("#totalPrice");
const total = () => {
  const option = nameProduct.value;
  const slg = quantity.value.trim();
  const product = products.find((item) => {
    return item.name == option;
  });
  if (product) return slg * product.price;
  return `0`;
};

nameProduct.addEventListener("change", () => {
  totalPrice.textContent = `${Number(total()).toLocaleString("vi-VN")}đ`;
});
quantity.addEventListener("input", () => {
  totalPrice.textContent = `${Number(total()).toLocaleString("vi-VN")}đ`;
});

//Đếm ký tự realtime cho ô Ghi chú: Hiển thị số ký tự đã nhập / tối đa (VD: 45/200).
// Khi vượt quá → số đếm đổi màu đỏ và hiện thông báo lỗi.
const note = document.querySelector("#note");
note.addEventListener("input", (e) => {
  const quan = note.value.trim();
  const count = document.querySelector("#count");
  count.textContent = `${quan.length}/200`;
});
