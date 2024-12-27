import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import MonthlyView from './pages/MonthlyView';
import YearlyOverview from './pages/YearlyOverview';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/month/:monthName" element={<MonthlyView />} />
        <Route path="/yearly" element={<YearlyOverview />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;