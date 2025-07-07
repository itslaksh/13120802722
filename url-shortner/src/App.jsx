import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import URLForm from "./components/URLForm.jsx";
import RedirectHandler from "./components/RedirectHandler.jsx";
import { useEffect } from "react";
import { log } from "./utils/log.js";

function App() {
  useEffect(() => {
    log("frontend", "info", "api", "Frontend logging initialized");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLForm />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;

