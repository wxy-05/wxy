import React, { useState } from 'react';

const years = Array.from({ length: 10 }, (_, i) => 2021 + i);
const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

function SettlementFilter({ onClose }) {
    const [showPicker, setShowPicker] = useState(false);
    const [pickerType, setPickerType] = useState('');
    const [pickerValue, setPickerValue] = useState({ year: '2025', month: '06', day: '18' });
    const [form, setForm] = useState({
        orderNo: '',
        settleNo: '',
        payStart: '',
        payEnd: '',
        applyStart: '',
        applyEnd: '',
    });

    // 打开时间选择器
    const openPicker = (type) => {
        setPickerType(type);
        setShowPicker(true);
    };

    // 选择时间后回填
    const handlePickerConfirm = () => {
        const dateStr = `${pickerValue.year}-${pickerValue.month}-${pickerValue.day}`;
        setForm({
            ...form,
            [pickerType]: dateStr,
        });
        setShowPicker(false);
    };

    // 重置
    const handleReset = () => {
        setForm({ orderNo: '', settleNo: '', payStart: '', payEnd: '', applyStart: '', applyEnd: '' });
    };

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
            {/* 顶部导航栏 */}
            <div className="flex items-center px-4 py-3 border-b bg-white bg-opacity-90">
                <button onClick={onClose} className="text-black text-xl mr-4">←</button>
                <span className="text-xl font-bold flex-1 text-center">账单搜索</span>
                <div className="flex items-center space-x-4">
                    <button className="text-xl">⋯</button>
                    <button className="text-xl">○</button>
                </div>
            </div>
            {/* 表单内容 */}
            <div className="p-4 space-y-4">
                <div className="flex items-center border-b py-2">
                    <span className="w-24 text-gray-700">订单号</span>
                    <input className="flex-1 bg-transparent outline-none text-right placeholder-gray-400" placeholder="请输入订单编号" value={form.orderNo} onChange={e => setForm({ ...form, orderNo: e.target.value })} />
                </div>
                <div className="flex items-center border-b py-2">
                    <span className="w-24 text-gray-700">结算单号</span>
                    <input className="flex-1 bg-transparent outline-none text-right placeholder-gray-400" placeholder="请输入结算单号" value={form.settleNo} onChange={e => setForm({ ...form, settleNo: e.target.value })} />
                </div>
                <div className="flex items-center border-b py-2">
                    <span className="w-24 text-gray-700">打款时间</span>
                    <button className="flex-1 bg-gray-100 rounded px-2 py-2 text-left text-gray-400 mr-2" onClick={() => openPicker('payStart')}>{form.payStart || '请选择时间'}</button>
                    <span className="mx-1">—</span>
                    <button className="flex-1 bg-gray-100 rounded px-2 py-2 text-left text-gray-400" onClick={() => openPicker('payEnd')}>{form.payEnd || '请选择时间'}</button>
                </div>
                <div className="flex items-center border-b py-2">
                    <span className="w-24 text-gray-700">申请时间</span>
                    <button className="flex-1 bg-gray-100 rounded px-2 py-2 text-left text-gray-400 mr-2" onClick={() => openPicker('applyStart')}>{form.applyStart || '请选择时间'}</button>
                    <span className="mx-1">—</span>
                    <button className="flex-1 bg-gray-100 rounded px-2 py-2 text-left text-gray-400" onClick={() => openPicker('applyEnd')}>{form.applyEnd || '请选择时间'}</button>
                </div>
                <div className="flex gap-4 mt-6">
                    <button className="flex-1 py-3 bg-gray-100 rounded text-black font-bold">重置</button>
                    <button className="flex-1 py-3 bg-cyan-400 rounded text-white font-bold">开始筛选</button>
                </div>
            </div>
            {/* 普通下拉选择时间弹窗 */}
            {showPicker && (
                <div className="fixed inset-0 z-60 bg-black bg-opacity-40 flex flex-col justify-end">
                    <div className="bg-white rounded-t-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <button className="text-gray-400" onClick={handleReset}>重置</button>
                            <span className="font-bold">选择时间</span>
                            <button className="text-cyan-500" onClick={handlePickerConfirm}>确认</button>
                        </div>
                        <div className="flex justify-center gap-4">
                            <select value={pickerValue.year} onChange={e => setPickerValue({ ...pickerValue, year: e.target.value })} className="text-lg">
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            <select value={pickerValue.month} onChange={e => setPickerValue({ ...pickerValue, month: e.target.value })} className="text-lg">
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <select value={pickerValue.day} onChange={e => setPickerValue({ ...pickerValue, day: e.target.value })} className="text-lg">
                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SettlementFilter;
