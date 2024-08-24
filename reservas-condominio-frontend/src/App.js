import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';  // Asegúrate de que la ruta y el nombre sean correctos
import RegisterPage from './components/RegisterPage';
import ReservationsPage from './components/ReservationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
