import { useEffect, useState } from 'react'
import './App.scss'
import Board from './features/board/Board'
import Button from './shared/ui/Button'

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "light";
});

  useEffect(() => {
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme)
  }
}, [])

useEffect(() => {
  localStorage.setItem("theme", theme)
}, [theme])

useEffect(() => {
  document.body.className = theme
}, [theme])

const toggleTheme = () => {
  setTheme(theme === "dark" ? "light" : "dark");
};

  return (
    <div className='motherDiv'>
      <div className="themeToggleWrapper">
        <Button variant="secondary" onClick={toggleTheme}>
          <span className="themeIcon">{theme === "dark" ? "☀️" : "🌙"}</span>
          <span className="themeText">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </Button>
      </div>
      <Board />
    </div>
  )
}

export default App
