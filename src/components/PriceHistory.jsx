import React, { useState } from 'react';

function PriceHistory({ onClose }) {
    const [selectedTab, setSelectedTab] = useState('全部');

    const tabs = [
        { id: '全部', count: 0 },
        { id: '已出价', count: 0 },
        { id: '已失效', count: 0 }
    ];

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
            {/* Header */}
            <div className="flex items-center px-4 py-3 bg-white">
                <button onClick={onClose} className="text-black text-xl mr-4">←</button>
                <span className="text-xl font-bold flex-1 text-center">出价记录</span>
                <div className="flex items-center space-x-4">
                    <button className="text-xl">⋯</button>
                    <button className="text-xl">─</button>
                    <button className="text-xl">○</button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 bg-white">
                <div className="flex items-center bg-white rounded-lg px-4 py-2 border">
                    <span className="text-gray-400 text-xl mr-2">🔍</span>
                    <input
                        className="flex-1 outline-none text-gray-600"
                        placeholder="请输入商品名称或者货号"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b bg-white px-4">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex-1 text-center py-3 cursor-pointer transition-colors duration-200 ${selectedTab === tab.id
                                ? 'border-b-2 border-black font-medium text-black'
                                : 'text-gray-500'
                            }`}
                    >
                        {tab.id} <span>{tab.count}</span>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <img
                    src="/assets/images/暂无数据.png"
                    alt="暂无数据"
                    className="w-96 h-96 object-contain"
                />
            </div>
        </div>
    );
}

export default PriceHistory; 