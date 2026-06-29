import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LanguageProvider }
from "./context/LanguageContext";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Diagnosis from "./pages/Diagnosis";
import History from "./pages/History";

function App() {
  return (
    <LanguageProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/diagnosis/:domain"
            element={<Diagnosis />}
          />

          <Route
            path="/history"
            element={<History />}
          />

        </Routes>

      </BrowserRouter>

    </LanguageProvider>
  );
}

export default App;