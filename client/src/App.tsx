import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Programs from "./pages/Programs";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>
      <header>
        <h1 className="logo">JS Monorepo</h1>
      </header>

      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
          <li>
            <Link to="/programs">Séries</Link>
          </li>
          <li>
            <a
              href="https://github.com/WildCodeSchool/create-js-monorepo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>

      <main className="text-box">
        <Routes>
          <Route path="/" element={<h2>Bienvenue sur JS Monorepo</h2>} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/programs" element={<Programs />} />
        </Routes>
      </main>

      <footer>
        Développé par la&nbsp;
        <a
          href="https://www.wildcodeschool.com/"
          className="wcs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wild Code School
        </a>
      </footer>
    </>
  );
}

export default App;
