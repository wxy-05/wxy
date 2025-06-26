import React, { useState } from 'react';
import SettlementFilter from './SettlementFilter';

const tabs = [
    '冻结中',
    '可结算',
    '待结算',
    '结算失败',
    '结算成功',
];

function SettlementDetail({ onClose }) {
    const [activeTab, setActiveTab] = useState('可结算');
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className="fixed inset-0 z-50 bg-gray-50 overflow-auto">
            {/* 顶部导航栏 */}
            <div className="flex items-center px-4 py-3 border-b bg-white bg-opacity-90">
                <button onClick={onClose} className="text-black text-xl mr-4">←</button>
                <span className="text-xl font-bold flex-1 text-center">结算单</span>
                <div className="flex items-center space-x-4">
                    <button className="text-xl">⋯</button>
                    <button className="text-xl">○</button>
                </div>
            </div>
            {/* 横向tab栏和筛选 */}
            <div className="flex items-center border-b bg-white bg-opacity-90 px-2 relative">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-3 text-base font-medium ${activeTab === tab ? 'text-black' : 'text-gray-400'}`}
                        style={{ borderBottom: activeTab === tab ? '3px solid #222' : '3px solid transparent' }}
                    >
                        {tab}
                    </button>
                ))}
                <div className="absolute right-0 top-0 h-full flex items-center pr-2">
                    <button className="bg-white bg-opacity-80 px-2 py-1 rounded flex items-center text-gray-400 border border-gray-200 ml-2" onClick={() => setShowFilter(true)}>
                        筛选 <span className="ml-1">🧹</span>
                    </button>
                </div>
            </div>
            {/* 内容区 */}
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <span className="text-cyan-400 text-lg mt-8">已经到底了</span>
            </div>
            {showFilter && <SettlementFilter onClose={() => setShowFilter(false)} />}
        </div>
    );
}

export default SettlementDetail; 