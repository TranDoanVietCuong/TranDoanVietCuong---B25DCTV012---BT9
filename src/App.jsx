import { useMemo, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import SearchBox from "./components/SearchBox";
import ThemeButton from "./components/ThemeButton";
import useFetch from "./hooks/useFetch";

const API_URL =
  "https://6ad834c795e98f36aef300aa.mockapi.io/api/v1/students";

export default function App() {
  const {
    data: students,
    loading,
    error,
    refetch,
  } = useFetch(API_URL);

  const [keyword, setKeyword] = useState("");
  const [actionError, setActionError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const filteredStudents = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) {
      return students;
    }

    return students.filter((student) =>
      student.name?.toLowerCase().includes(normalizedKeyword)
    );
  }, [students, keyword]);

  const addStudent = async (student) => {
    setSubmitting(true);
    setActionError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      refetch();
      return true;
    } catch (err) {
      setActionError(`Không thể thêm sinh viên: ${err.message}`);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteStudent = async (student) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa sinh viên "${student.name}" không?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(student.id);
    setActionError("");

    try {
      const response = await fetch(`${API_URL}/${student.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      refetch();
    } catch (err) {
      setActionError(`Không thể xóa sinh viên: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Lập trình Web • Buổi 9</p>

          <h1>Quản lý sinh viên</h1>

          <p className="subtitle">
            Function Component & React Hooks
          </p>
        </div>

        <ThemeButton />
      </header>

      <section className="layout">
        <StudentForm
          onAdd={addStudent}
          submitting={submitting}
        />

        <section className="student-panel">
          <div className="panel-heading">
            <div>
              <h2>Danh sách sinh viên</h2>
              <p>{students.length} sinh viên</p>
            </div>
          </div>

          <SearchBox
            keyword={keyword}
            onChange={setKeyword}
          />

          {actionError && (
            <p className="error-box">
              {actionError}
            </p>
          )}

          {loading && (
            <p className="status-message">
              Đang tải dữ liệu...
            </p>
          )}

          {!loading && error && (
            <div className="error-box">
              <p>
                Lỗi tải dữ liệu: {error}
              </p>

              <button
                type="button"
                onClick={refetch}
              >
                Thử lại
              </button>
            </div>
          )}

          {!loading && !error && (
            <StudentList
              students={filteredStudents}
              onDelete={deleteStudent}
              deletingId={deletingId}
            />
          )}
        </section>
      </section>
    </main>
  );
}
