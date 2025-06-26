import React, { useState } from 'react';

function WarehouseList({ onBack }) {
    const [activeTab, setActiveTab] = useState('待发货');

    const tabs = ['全部', '寄售入库', '退货入库', '筛选'];
    const statusTabs = ['待发货', '已发货', '已收货', '已取消'];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 bg-white z-50">
                <div className="flex items-center h-12 px-4">
                    <button onClick={onBack} className="p-2">
                        <span className="text-xl">←</span>
                    </button>
                    <h1 className="flex-1 text-center text-lg font-medium">入库单列表</h1>
                    <div className="w-8"></div>
                </div>

                {/* Search Bar */}
                <div className="px-4 py-2 bg-white">
                    <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                        <span className="text-gray-400 mr-2">🔍</span>
                        <input
                            type="text"
                            placeholder="请输入入库单名称或编号"
                            className="bg-transparent outline-none flex-1 text-sm"
                        />
                    </div>
                </div>

                {/* Main Tabs */}
                <div className="px-4 py-2 bg-white border-b">
                    <div className="flex justify-between">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`text-sm ${tab === '全部' ? 'text-blue-500' : 'text-gray-600'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="bg-white border-b">
                    <div className="flex">
                        {statusTabs.map((tab) => (
                            <button
                                key={tab}
                                className={`flex-1 py-2 text-sm ${tab === activeTab ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="pt-44 pb-16">
                <div className="bg-gray-100 min-h-[calc(100vh-11rem)]">
                    {/* Add your content here */}
                </div>
            </div>

            {/* Bottom Text */}
            <div className="fixed bottom-0 left-0 right-0 py-4 text-center text-gray-400 bg-gray-100">
                已经到底了
            </div>
        </div>
    );
}

export default WarehouseList; 