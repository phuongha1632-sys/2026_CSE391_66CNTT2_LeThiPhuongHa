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
      return this.optional(element) || /^0[0-9]+$/.test(value);
    },
    "phải đúng định dạng, bắt đầu bằng 0",
  );
  $.validator.addMethod(
    "pwStrong",
    function (value, tag) {
      return (
        this.optional(tag) || /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/.test(value)
      );
    },
    " có ít nhất 1 chữ hoa, 1 chữ thường, 1 số",
  );
  $("#form").validate({
    rules: {
      name: {
        required: true,
        nameStrong: true,
        minlength: 3,
      },
      email: {
        email: true,
        required: true,
      },
      tel: {
        telStrong: true,
        required: true,
        minlength: 10,
      },
      pw: {
        pwStrong: true,
        required: true,
        minlength: 8,
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
        required: "không được để trống",
        minlength: "≥ 3 ký tự,",
      },
      email: {
        required: "không được để trống",
        email: "phải đúng định dạng email",
      },
      tel: {
        required: "không được để trống",
        minlength: "10 chữ số",
      },
      pw: {
        required: "không được để trống",
        minlength: "ít nhất 8 ký tự",
      },
      repw: {
        equalTo: "phải khớp với mật khẩu",
      },
      gender: {
        required: "phải chọn giới tính",
      },
      checkbox: {
        required: "phải đồng ý policy",
      },
    },
  });
});
