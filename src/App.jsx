import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HollandTest from './pages/Holland/HollandTest';
import BirkmanTest from './pages/Birkman/BirkmanTest';
import TCITest from './pages/TCI/TCITest';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/holland" replace />} />
        <Route path="/holland" element={<HollandTest />} />
        <Route path="/birkman" element={<BirkmanTest />} />
        <Route path="/tci" element={<TCITest />} />
      </Routes>
    </BrowserRouter>
  );
}
