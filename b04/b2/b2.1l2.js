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
  $.validator.addMethod(
    "pwStrong",
    function (v, e) {
      return this.optional(e) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d]).+$/.test(v);
    },
    "có ít nhất 1 chữ hoa, 1 chữ thường, 1 số",
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
        minlength: 8,
        pwStrong: true,
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
        minlength: ">8 ký tự",
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
