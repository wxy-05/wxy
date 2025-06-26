import React from 'react';

function InventorySearch({ onBack }) {
    return (
        <div className="h-screen bg-gray-100">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 flex items-center h-12 bg-white px-4 z-50">
                <button onClick={onBack} className="text-xl">
                    ←
                </button>
                <h1 className="flex-1 text-center text-lg">鞋多多 武汉仓-申请入库</h1>
                <div className="flex space-x-2">
                    <button className="text-xl">⋯</button>
                    <button className="text-xl">—</button>
                    <button className="text-xl">○</button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="pt-12 p-4">
                <div className="bg-gray-200 rounded-lg flex items-center p-2">
                    <span className="text-gray-400 mr-2">🔍</span>
                    <input
                        type="text"
                        placeholder="请输入商品名称或者货号"
                        className="bg-transparent outline-none flex-1 text-sm"
                    />
                </div>
            </div>

            {/* No Search History */}
            <div className="flex flex-col items-center justify-center mt-40">
                <img
                    src="/assets/images/暂无搜索记录.png"
                    alt="No search history"
                    className="w-96 h-96 object-contain"
                />
            </div>
        </div>
    );
}

export default InventorySearch; 