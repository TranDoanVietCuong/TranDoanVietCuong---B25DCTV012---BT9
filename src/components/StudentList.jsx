export default function StudentList({ students, onDelete, deletingId }) {
  if (students.length === 0) {
    return <p className="empty-message">Chưa có sinh viên</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Ngành</th>
            <th>GPA</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.major}</td>
              <td>{Number(student.gpa).toFixed(2)}</td>
              <td>
                <button
                  className="delete-button"
                  type="button"
                  disabled={deletingId === student.id}
                  onClick={() => onDelete(student)}
                >
                  {deletingId === student.id ? "Đang xóa..." : "Xóa"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
