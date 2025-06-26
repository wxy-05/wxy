import React, { useState } from 'react';
import DatePicker from './DatePicker';

function ProxyPickup({ onBack }) {
    const [selectedWarehouse, setSelectedWarehouse] = useState('武汉仓区');
    const [selectedDate, setSelectedDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateConfirm = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="fixed inset-0 z-50 bg-white">
            {/* 頂部導航欄 */}
            <div className="flex items-center px-4 py-3 border-b">
                <button onClick={onBack} className="text-black text-xl mr-4">←</button>
                <span className="text-xl font-bold flex-1 text-center">共鞋</span>
                <div className="flex space-x-2">
                    <button className="text-xl">⋯</button>
                    <button className="text-xl">—</button>
                    <button className="text-xl">○</button>
                </div>
            </div>

            {/* 步驟指示器 */}
            <div className="p-4">
                <div className="text-sm text-gray-600 mb-2">第一步，强从处理方式</div>
                <div className="flex space-x-4">
                    <div
                        className={`flex-1 p-4 rounded-lg cursor-pointer ${selectedWarehouse === '武汉仓区' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-100'
                            }`}
                        onClick={() => setSelectedWarehouse('武汉仓区')}
                    >
                        <div className="text-center">武汉仓区</div>
                    </div>
                    <div
                        className={`flex-1 p-4 rounded-lg cursor-pointer ${selectedWarehouse === '上海仓区' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-100'
                            }`}
                        onClick={() => setSelectedWarehouse('上海仓区')}
                    >
                        <div className="text-center">上海仓区</div>
                    </div>
                    <div
                        className={`flex-1 p-4 rounded-lg cursor-pointer ${selectedWarehouse === '广州仓' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-100'
                            }`}
                        onClick={() => setSelectedWarehouse('广州仓')}
                    >
                        <div className="text-center">广州仓</div>
                    </div>
                </div>
            </div>

            {/* 第二步 */}
            <div className="p-4">
                <div className="text-sm text-gray-600 mb-2">第二步，选择前往提货物提货日期，需要与提货出库单提货日期对应</div>
                <button
                    className="w-full bg-cyan-500 text-white py-3 rounded-lg"
                    onClick={() => setShowDatePicker(true)}
                >
                    {selectedDate || '点击选择时间'}
                </button>
            </div>

            {/* 第三步 */}
            <div className="p-4">
                <div className="text-sm text-gray-600 mb-2">第三步，选择得物出库单</div>
                <button
                    className="w-full bg-cyan-500 text-white py-3 rounded-lg"
                    onClick={() => {/* 處理選擇/更新列表 */ }}
                >
                    选择/更新列表
                </button>
            </div>

            {/* 第四步 */}
            <div className="p-4">
                <div className="text-sm text-gray-600 mb-2">第四步，核对并更换提货出库单目信息</div>
                <div className="bg-gray-100 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">提货人</span>
                        <span>李多多</span>
                        <button className="text-gray-400">复制</button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">提货车牌号</span>
                        <span>鄂WGH897</span>
                        <button className="text-gray-400">复制</button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">联系方式</span>
                        <span>15515550619</span>
                        <button className="text-gray-400">复制</button>
                    </div>
                </div>
            </div>

            {/* 底部按鈕 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
                <button
                    className="w-full bg-black text-white py-3 rounded-lg"
                    onClick={() => {/* 處理確認創建 */ }}
                >
                    确认创建
                </button>
            </div>

            {/* 日期選擇器 */}
            <DatePicker
                isVisible={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onConfirm={handleDateConfirm}
            />
        </div>
    );
}

export default ProxyPickup; 