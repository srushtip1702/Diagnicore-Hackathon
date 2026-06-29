import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Diagnosis from "./pages/Diagnosis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/diagnosis/:domain"
          element={<Diagnosis />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;