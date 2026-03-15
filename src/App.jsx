import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HollandTest from './pages/Holland/HollandTest';
import BirkmanTest from './pages/Birkman/BirkmanTest';
import TCITest from './pages/TCI/TCITest';
import ChaTest from './pages/Cha/ChaTest';
import GangdongBirkman from './pages/GangdongBirkman/GangdongBirkman';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/holland" replace />} />
        <Route path="/holland" element={<HollandTest />} />
        <Route path="/birkman" element={<BirkmanTest />} />
        <Route path="/tci" element={<TCITest />} />
        <Route path="/cha" element={<ChaTest />} />
        <Route path="/gangdong" element={<GangdongBirkman />} />
      </Routes>
    </BrowserRouter>
  );
}
