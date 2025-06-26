import React, { useState } from 'react';

function DatePicker({ isVisible, onClose, onConfirm }) {
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedMonth, setSelectedMonth] = useState(6);
    const [selectedDay, setSelectedDay] = useState(24);

    const years = Array.from({ length: 10 }, (_, i) => 2024 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center">
            <div className="bg-white w-full rounded-t-2xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <button
                        className="text-gray-600 text-base"
                        onClick={onClose}
                    >
                        取消
                    </button>
                    <button
                        className="text-cyan-500 text-base"
                        onClick={() => {
                            onConfirm(`${selectedYear}年${String(selectedMonth).padStart(2, '0')}月${String(selectedDay).padStart(2, '0')}日`);
                            onClose();
                        }}
                    >
                        确认
                    </button>
                </div>

                <div className="flex justify-center items-center h-48 text-center">
                    <div className="flex-1 h-full overflow-hidden">
                        <div className="h-full overflow-y-auto snap-y snap-mandatory">
                            {years.map(year => (
                                <div
                                    key={year}
                                    className={`h-12 flex items-center justify-center snap-center ${year === selectedYear ? 'text-black text-lg' : 'text-gray-400'
                                        }`}
                                    onClick={() => setSelectedYear(year)}
                                >
                                    {year}年
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 h-full overflow-hidden">
                        <div className="h-full overflow-y-auto snap-y snap-mandatory">
                            {months.map(month => (
                                <div
                                    key={month}
                                    className={`h-12 flex items-center justify-center snap-center ${month === selectedMonth ? 'text-black text-lg' : 'text-gray-400'
                                        }`}
                                    onClick={() => setSelectedMonth(month)}
                                >
                                    {String(month).padStart(2, '0')}月
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 h-full overflow-hidden">
                        <div className="h-full overflow-y-auto snap-y snap-mandatory">
                            {days.map(day => (
                                <div
                                    key={day}
                                    className={`h-12 flex items-center justify-center snap-center ${day === selectedDay ? 'text-black text-lg' : 'text-gray-400'
                                        }`}
                                    onClick={() => setSelectedDay(day)}
                                >
                                    {String(day).padStart(2, '0')}日
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DatePicker; 