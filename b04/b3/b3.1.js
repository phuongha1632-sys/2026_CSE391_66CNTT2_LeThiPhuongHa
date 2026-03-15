/*
+) Validate khi submit (event.preventDefault()): Kiểm tra lần lượt tất cả các trường.
Nếu có lỗi → hiển thị thông báo và dừng lại, không gửi form.

+) Validate realtime khi blur: Mỗi trường được kiểm tra ngay khi người dùng rời khỏi
ô đó (gắn sự kiện blur).

+) Xóa lỗi khi nhập lại: Khi người dùng bắt đầu gõ vào trường đang lỗi, thông báo lỗi
biến mất ngay (gắn sự kiện input).

+) Thành công: Khi tất cả hợp lệ → ẩn form, hiển thị thông báo "Đăng ký thành công! 🎉"
và tên người dùng vừa đăng ký



Họ và tên	Không trống, ≥ 3 ký tự, chỉ chứa chữ cái và khoảng trắng
Email	Không trống, đúng định dạng name@domain.com
Số điện thoại	Không trống, 10 chữ số, bắt đầu bằng 0
Mật khẩu	Không trống, ≥ 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 số
Xác nhận mật khẩu	Phải khớp với mật khẩu
Giới tính	Bắt buộc chọn 1 radio button
Điều khoản	Bắt buộc tick checkbox

*/

//validate
$(document).ready(function () {
  $.validator.addMethod(
    "nameStrong",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
    },
    "chỉ chứa chữ cái và khoảng trắng",
  );
  $.validator.addMethod(
    "telStrong",
    function (value, element) {
      return this.optional(element) || /^0[\d]+$/.test(value);
    },
    "bắt đầu bằng 0",
  );
  $("form").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
        nameStrong: true,
      },
      email: {
        required: true,
        email: true,
      },
      tel: {
        required: true,
        rangelength: [10, 10],
        number: true,
        telStrong: true,
      },
      pw: {
        required: true,
      },
      repw: {
        equalTo: "#pw",
      },
      gender: {
        required: true,
      },
      checkbox: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Không trống",
        minlength: ">3 ký tự",
      },
      email: {
        required: "Không trống",
        email: "phải đúng định dạng name@domain.com",
      },
      tel: {
        required: "Không trống",
        minlength: "10 ký tự",
        maxlength: "10 ký tự",
        number: "phải nhập chữ số",
      },
      pw: {
        required: "Không trống",
      },
      repw: {
        equalTo: "Phải khớp với mật khẩu",
      },
      gender: {
        required: "Không trống",
      },
      checkbox: {
        required: "Không trống",
      },
    },
    submitHandler: function (form) {
      const nameUser = $("#name").val();
      //#name và input[name="name"] và input[id="name"]
      $(form).html(`<h1>${nameUser} Đăng ký thành công! 🎉</h1>`);
    },
  });
});
/*
 +) Thành công: Khi tất cả hợp lệ → ẩn form, hiển thị thông báo "Đăng ký
thành công! 🎉" và tên người dùng vừa đăng ký

 */

/*
+) Thanh mức độ mạnh mật khẩu (Password Strength Bar): Hiển thị realtime mức
độ: Yếu (đỏ) / Trung bình (vàng) / Mạnh (xanh) dựa trên độ dài và độ phức tạp.
+) Hiển thị/ẩn mật khẩu: Nút toggle 👁 bên cạnh ô mật khẩu để chuyển đổi
type="password" ↔ type="text".
+) Đếm ký tự họ tên: Hiển thị số ký tự đang nhập / tối đa 50 (VD: 12/50).
*/
const pw = document.querySelector("input[id=pw]");
//Mật khẩu ≥ 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, total=4, >3 là mạnh
const validatePw = () => {
  pw.classList.remove("pw-strong", "pw-weak", "pw-medium");
  const pwValue = pw.value;
  let total = 0;
  const regexUpper = /[A-Z]/;
  const regexLower = /[a-z]/;
  const regexDigit = /\d/;
  if (regexDigit.test(pwValue)) total++;
  if (regexLower.test(pwValue)) total++;
  if (regexUpper.test(pwValue)) total++;
  if (pwValue.length >= 8) total++;
  let evaluation = "";
  if (total >= 3) evaluation = "mạnh";
  else if (total == 2) evaluation = "tbinh";
  else evaluation = "yếu";
  if (evaluation == "mạnh") pw.classList.add("pw-strong");
  else if (evaluation == "tbinh") pw.classList.add("pw-medium");
  else pw.classList.add("pw-weak");
  console.log(total);
};
pw.addEventListener("input", validatePw);

const eye = document.querySelector("#eye");
eye.addEventListener("click", () => {
  if (pw.type == "password") {
    pw.type = "text";
    eye.classList.toggle("line");
  } else if (pw.type == "text") {
    pw.type = "password";
    eye.classList.toggle("line");
  }
});

//+) Đếm ký tự họ tên: Hiển thị số ký tự đang nhập / tối đa 50 (VD: 12/50).
const nameInput = document.querySelector("input[name=name]");
const countName = () => {
  nameInput.classList.remove("red-bd");

  const count = document.querySelector("#count");
  const value = nameInput.value;
  count.innerHTML = `${value.length}/50`;
  if (value.length > 50) nameInput.classList.add("red-bd");
};
nameInput.addEventListener("input", countName);
