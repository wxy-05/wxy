import React, { useState } from 'react';

const mockChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const mockTableData = [
    { label: '暂无数据', value: '' },
    { label: '暂无数据', value: '' },
];

function SalesDetail({ onClose }) {
    const [channel, setChannel] = useState('现货');
    const [statType, setStatType] = useState('订单数量');

    return (
        <div className="fixed inset-0 z-50 bg-gray-50 overflow-auto">
            {/* 顶部导航栏 */}
            <div className="flex items-center px-4 py-3 border-b bg-white bg-opacity-90">
                <button onClick={onClose} className="text-black text-xl mr-4">←</button>
                <span className="text-xl font-bold flex-1 text-center">共鞋</span>
                <div className="flex items-center space-x-4">
                    <button className="text-xl">⋯</button>
                    <button className="text-xl">○</button>
                </div>
            </div>

            {/* 销售图表 */}
            <div className="p-4">
                <div className="flex items-center mb-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                    <span className="font-bold">销售图表</span>
                </div>
                <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center mb-2 space-x-2">
                        <span className="text-sm">统计范围</span>
                        <button className={`px-2 py-1 rounded border ${channel === '所有' ? 'bg-cyan-100 text-cyan-700 border-cyan-300' : 'border-gray-300 text-gray-500'}`} onClick={() => setChannel('所有')}>所有</button>
                        <button className={`px-2 py-1 rounded border ${channel === '现货' ? 'bg-cyan-100 text-cyan-700 border-cyan-300' : 'border-gray-300 text-gray-500'}`} onClick={() => setChannel('现货')}>现货</button>
                        <button className={`px-2 py-1 rounded border ${channel === '入仓' ? 'bg-cyan-100 text-cyan-700 border-cyan-300' : 'border-gray-300 text-gray-500'}`} onClick={() => setChannel('入仓')}>入仓</button>
                    </div>
                    <div className="bg-cyan-400 rounded-lg p-4 relative">
                        <div className="text-white text-lg font-bold mb-1">总金额</div>
                        <div className="text-white text-2xl font-bold mb-2">￥0</div>
                        <span className="absolute right-4 top-4 bg-cyan-200 text-cyan-700 px-2 py-0.5 rounded text-xs">2025-06</span>
                        {/* 简易柱状图 */}
                        <div className="flex items-end h-32 mt-4">
                            {mockChartData.map((v, i) => (
                                <div key={i} className="flex-1 mx-0.5">
                                    <div className="bg-white bg-opacity-30 w-full" style={{ height: `${v * 10 + 2}px` }}></div>
                                    <div className="text-xs text-white text-center mt-1">{i * 2}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 现货/入仓统计 */}
            <div className="px-4">
                <div className="flex items-center mb-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                    <span className="font-bold">共鞋现货/入仓</span>
                </div>
                <div className="bg-white rounded-lg p-4">
                    <div className="mb-2">
                        <span className="text-sm mr-2">统计渠道</span>
                        <button className="px-2 py-1 rounded border bg-cyan-100 text-cyan-700 border-cyan-300">淘宝</button>
                    </div>
                    <div className="mb-2">
                        <span className="text-sm mr-2">统计方式</span>
                        <button className={`px-2 py-1 rounded border ${statType === '销售金额' ? 'bg-cyan-100 text-cyan-700 border-cyan-300' : 'border-gray-300 text-gray-500'}`} onClick={() => setStatType('销售金额')}>销售金额</button>
                        <button className={`px-2 py-1 rounded border ${statType === '订单数量' ? 'bg-cyan-100 text-cyan-700 border-cyan-300' : 'border-gray-300 text-gray-500'}`} onClick={() => setStatType('订单数量')}>订单数量</button>
                        <button className={`px-2 py-1 rounded border ${statType === '出价数量' ? 'bg-cyan-100 text-cyan-700 border-cyan-300' : 'border-gray-300 text-gray-500'}`} onClick={() => setStatType('出价数量')}>出价数量</button>
                    </div>
                    <button className="bg-cyan-400 text-white px-8 py-1 rounded float-right mb-4">近七天</button>
                    {/* 圆环图和表格 */}
                    <div className="flex items-center mt-8">
                        <div className="flex-1 flex flex-col items-center">
                            <div className="w-40 h-40 rounded-full border-4 border-gray-200 flex items-center justify-center text-gray-400 text-xl">暂无数据</div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400">暂无数据</div>
                            <div className="text-gray-400 mt-2">暂无数据</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesDetail; 