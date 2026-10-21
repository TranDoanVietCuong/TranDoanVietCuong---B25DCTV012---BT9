import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  major: "CNTT",
  gpa: "",
};

export default function StudentForm({ onAdd, submitting }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const gpa = Number(form.gpa);

    if (form.name.trim().length < 3) {
      nextErrors.name = "Họ tên tối thiểu 3 ký tự";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = "Email không hợp lệ";
    }

    if (form.gpa === "" || Number.isNaN(gpa) || gpa < 0 || gpa > 4) {
      nextErrors.gpa = "GPA phải nằm trong khoảng từ 0 đến 4";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const ok = await onAdd({
      name: form.name.trim(),
      email: form.email.trim(),
      major: form.major,
      gpa: Number(form.gpa),
    });

    if (ok) {
      setForm(initialForm);
      setErrors({});
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <h2>Thêm sinh viên</h2>

      <label>
        Họ tên
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nguyễn Văn An"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="an@ptit.edu.vn"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </label>

      <label>
        Ngành
        <select name="major" value={form.major} onChange={handleChange}>
          <option value="CNTT">CNTT</option>
          <option value="ATTT">ATTT</option>
          <option value="AI">AI</option>
          <option value="DTVT">DTVT</option>
        </select>
      </label>

      <label>
        GPA
        <input
          name="gpa"
          type="number"
          min="0"
          max="4"
          step="0.01"
          value={form.gpa}
          onChange={handleChange}
          placeholder="3.20"
        />
        {errors.gpa && <span className="field-error">{errors.gpa}</span>}
      </label>

      <button className="primary-button" type="submit" disabled={submitting}>
        {submitting ? "Đang thêm..." : "Thêm sinh viên"}
      </button>
    </form>
  );
}
