import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Analytics from "./pages/Analytics";
import Competitors from "./pages/Competitors";
import Reviews from "./pages/Reviews";

function App() {
  return (
      <Router>
          <header className="bg-dark text-white p-3 mb-4">
              <div className="container d-flex justify-content-between align-items-center">
                  <h1 className="h4 mb-0">PPR reviews analytics</h1>
                  <nav>
                      <Link to="/" className="btn btn-outline-light me-2">Аналитика</Link>
                      <Link to="/reviews" className="btn btn-outline-light me-2">Отзывы</Link>
                      <Link to="/competitors" className="btn btn-outline-light">Конкуренты</Link>
                  </nav>
              </div>
          </header>

          <main className="container">
              <Routes>
                  <Route path="/" element={<Analytics />} />
                  <Route path="/competitors" element={<Competitors />} />
                  <Route path="/reviews" element={<Reviews />} />
              </Routes>
          </main>
      </Router>
  );
}

export default App;
