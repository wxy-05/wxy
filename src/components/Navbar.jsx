// src/components/Navbar.jsx
import React from 'react';

function Navbar({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: 'home', icon: '🏠', label: '首页' },
    { id: 'spot', icon: '📦', label: '现货出价' },
    { id: 'warehouse', icon: '🏭', label: '入仓出价' },
    { id: 'inventory', icon: '📊', label: '库存' },
    { id: 'account', icon: '👤', label: '我的' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto flex justify-between px-4 py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex flex-col items-center ${
              currentPage === item.id ? 'text-cyan-500' : 'text-gray-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;