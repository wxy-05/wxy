// src/App.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SpotPrice from './components/SpotPrice';
import WarehousePrice from './components/WarehousePrice';
import Inventory from './components/Inventory';
import MyAccount from './components/MyAccount';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'spot':
        return <SpotPrice />;
      case 'warehouse':
        return <WarehousePrice setCurrentPage={setCurrentPage} />;
      case 'inventory':
        return <Inventory />;
      case 'account':
        return <MyAccount />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-300 to-cyan-100">
      <div className="max-w-xl mx-auto relative min-h-screen pb-16">
        <div
          className={`transition-all duration-300 ease-in-out ${isPageTransitioning
            ? 'opacity-0 transform translate-x-4'
            : 'opacity-100 transform translate-x-0'
            }`}
        >
          {renderPage()}
        </div>
        <div className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto">
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}

export default App;