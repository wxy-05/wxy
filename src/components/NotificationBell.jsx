// src/components/NotificationBell.jsx
import React from 'react';

function NotificationBell({ count }) {
  return (
    <div className="relative">
      <span className="text-2xl">🔔</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}

export default NotificationBell;