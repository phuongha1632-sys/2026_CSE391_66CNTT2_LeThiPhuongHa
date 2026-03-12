/*
Khi bấm nút "Thêm":
Kiểm tra: họ tên không trống, điểm hợp lệ (số từ 0–10). Nếu sai → hiện alert.
Tạo một hàng <tr> mới với đầy đủ thông tin, trong đó cột Xếp loại được tính tự động theo quy tắc:
≥ 8.5 → Giỏi | ≥ 7.0 → Khá | ≥ 5.0 → Trung bình | < 5.0 → Yếu
Hàng có điểm dưới 5.0 phải được tô màu nền vàng để nổi bật.
Sau khi thêm, xóa trắng ô nhập và đưa con trỏ về ô họ tên.
Mỗi hàng có nút "Xóa" — khi bấm, hàng đó bị xóa khỏi bảng và danh sách.
Bên dưới bảng hiển thị dòng thống kê: tổng số sinh viên và điểm trung bình của cả lớp (cập nhật sau mỗi lần thêm/xóa).
Cho phép nhấn Enter ở ô Điểm để thêm (thay vì phải dùng chuột bấm nút). */

const nameInput = document.querySelector("#name");
const markInput = document.querySelector("#mark");
const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
let student = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!nameInput || !markInput) return;
  const value = {
    name: nameInput.value.trim(),
    mark: Number(markInput.value.trim()),
    xep: xepLoai(Number(markInput.value.trim())),
  };
  const errors = {};
  if (value.name === "") errors.name = "Ten ko duoc de trong";
  if (value.mark < 0 || value.mark > 10) errors.mark = "Diem ko hop le (0-10)";

  if (Object.keys(errors).length > 0) {
    alert(Object.values(errors).join(", "));
    return;
  }
  student.push(value);
  renderList(student);
  nameInput.value = "";
  markInput.value = "";
  nameInput.focus();
});

const xepLoai = (diem) => {
  if (diem >= 8.5) {
    return "Giỏi";
  } else if (diem >= 7) {
    return "Khá";
  } else if (diem >= 5) {
    return "Trung bình";
  } else {
    return "Yếu";
  }
};

const renderList = (list = []) => {
  let totalStudent = "";
  list.forEach((item, index) => {
    totalStudent += ` <tr>
                  <td>${index + 1}</td>
                  <td>${item.name}</td>
                  <td class="mark">${item.mark}</td>
                  ${item.mark < 5 ? `<td class="yellow-bg">${item.xep}</td>` : `<td>${item.xep}</td>`}
                  <td>
                    <button class="remove" data-index=${student.indexOf(item)}>Xoa</button>   
                  </td>
                </tr>`; //tránh lấy nhầm index khi render sau search (student.indexOf(item))
  });
  tbody.innerHTML = totalStudent;
  tke();
};

//Bên dưới bảng hiển thị dòng thống kê: tổng số sinh viên và điểm trung bình của cả lớp (cập nhật sau mỗi lần thêm/xóa).
const infor = document.querySelector("#infor");

const tke = () => {
  const diem = document.querySelectorAll(".mark");
  const slg = tbody.children.length;
  let total = 0;
  diem.forEach((a) => {
    total += Number(a.textContent);
  });
  const avg = slg == 0 ? 0 : (total /= slg);
  infor.innerHTML = ` <div id="infor" class="d-flex justify-center item-center pt-30">
              so sinh vien: ${slg} <br />
              diem trung binh: ${avg}
            </div>`;
};

tbody.addEventListener("click", (e) => {
  if (!e.target.classList.contains("remove")) return;
  const stt = e.target.dataset.index;
  student.splice(stt, 1);
  renderList(student);
});

/*
- Tìm kiếm realtime: Thêm ô tìm kiếm phía trên bảang. Khi người dùng gõ vào (input event), bảng lập tức chỉ hiển thị các
hàng có tên chứa chuỗi tìm kiếm (không phân biệt hoa thường). Nếu không tìm thấy kết quả → hiển thị dòng chữ "Không có kết quả".

- Lọc theo xếp loại: Thêm <select> với các tùy chọn: Tất cả / Giỏi / Khá / Trung bình / Yếu. Khi thay đổi (change event),
bảng chỉ hiển thị sinh viên thuộc xếp loại được chọn.

- Sắp xếp: Khi người dùng click vào tiêu đề cột "Điểm", danh sách được sắp xếp tăng dần; click lần nữa thì giảm dần. Tiêu
đề cột hiển thị mũi tên ▲ / ▼ để chỉ chiều sắp xếp hiện tại.

- Kết hợp: Tìm kiếm, lọc và sắp xếp có thể hoạt động đồng thời (ví dụ: tìm tên "Nguyễn" trong nhóm "Khá" sắp xếp theo điểm tăng dần).
*/

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");
const sortForm = document.querySelector("#dropDown");
const search = (e) => {
  if (e) e.preventDefault();
  if (!searchForm || !searchInput) return;
  const value = String(searchInput.value.trim()).toLowerCase();
  const sortValue = sortForm.value;

  const result = student.filter((item) => {
    const sortName = String(item.name).toLowerCase().includes(value);
    const hang = sortValue === "Tất cả" || item.xep === sortValue; //nếu chọn select Tất cả, thì true|| tùythuộc = true, thì dù student có hạng ntn vẫn chọn (true)
    //vd nếu chọn select khá, flase||khá, thì chỉ chọn những student.hang==khá
    return sortName && hang;
  });
  if (result.length == 0) {
    tbody.innerHTML = `
<tr>
  <td colspan="5" class="text-center">Không có kết quả</td>
</tr>
`;
    return;
  }
  renderList(result);
};

searchForm.addEventListener("input", search);
searchForm.addEventListener("submit", search);

//sắp xếp
const sortIcon = document.querySelector("#sortIcon");
sortIcon.addEventListener("click", (e) => {
  sortIcon.classList.toggle("change-icon");
  if (sortIcon.classList.contains("change-icon")) {
    student.sort((a, b) => b.mark - a.mark);
  } else student.sort((a, b) => a.mark - b.mark);

  search();
});
