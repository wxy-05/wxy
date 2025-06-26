import React from 'react';

function TodoDetail({ onClose }) {
    return (
        <div className="fixed inset-0 z-50" style={{ backgroundImage: 'url(/assets/images/背景色.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex items-center px-4 py-3 border-b bg-white bg-opacity-80">
                <button onClick={onClose} className="text-black text-xl mr-4">
                    ←
                </button>
                <span className="text-2xl flex-1 font-bold">我的待办</span>
                <div className="flex items-center space-x-4">
                    <button className="text-xl">⋯</button>
                    <button className="text-xl">○</button>
                </div>
            </div>

            <div className="px-4 py-2 flex items-center space-x-4 border-b bg-white bg-opacity-80">
                <div className="flex items-center text-lg font-bold">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                    <span>急需处理</span>
                    <span className="ml-1">0</span>
                </div>
                <div className="flex items-center text-lg font-bold">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                    <span>需查看</span>
                    <span className="ml-1">0</span>
                </div>
                <button className="ml-auto">
                    <span className="text-cyan-500">▼</span>
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center flex-col p-8" style={{ minHeight: '60vh' }}>
                <img src="/assets/images/暂无待办.png" alt="暂无待办" className="w-72 h-72 object-contain mb-4 opacity-80" />
            </div>
        </div>
    );
}

export default TodoDetail;
