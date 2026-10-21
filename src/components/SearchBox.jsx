export default function SearchBox({ keyword, onChange }) {
  return (
    <div className="search-box">
      <label htmlFor="search">Tìm kiếm theo tên</label>
      <input
        id="search"
        value={keyword}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Nhập tên sinh viên..."
      />
    </div>
  );
}
