import { useTheme } from "../context/ThemeContext";

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-button" type="button" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Chế độ tối" : "☀️ Chế độ sáng"}
    </button>
  );
}
