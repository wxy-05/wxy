// src/components/TodoList.jsx
import React, { useState } from 'react';
import TodoDetail from './TodoDetail';

function TodoList() {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">我的待办</h2>
          <button
            onClick={() => setShowDetail(true)}
            className="text-gray-400 text-xl"
          >
            ›
          </button>
        </div>
        <div className="text-center py-8">
          <img
            src="public/assets/images/微信截图_20250618160720.png"
            alt="暂无待办"
            className="w-32 h-32 mx-auto mb-2 w-full h-full"
          />
          <p className="text-cyan-500">
            当前暂无出价待办，太完美了，您简直太棒了！要不您在多入点货多些点价呗～爆单爆单爆单！
          </p>
        </div>
      </div>

      {showDetail && <TodoDetail onClose={() => setShowDetail(false)} />}
    </>
  );
}

export default TodoList;