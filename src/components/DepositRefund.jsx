import React from 'react';

function DepositRefund({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center">
            <div className="bg-white w-full min-h-screen animate-slide-up">
                <div className="flex items-center justify-between p-4 border-b">
                    <button onClick={onClose} className="text-gray-600">
                        <span className="text-2xl">‹</span>
                    </button>
                    <h1 className="text-lg font-medium">退貨保證金</h1>
                    <div className="w-8"></div>
                </div>

                <div className="p-6">
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg">保證金額度（元）<span className="text-blue-500 ml-1">說明</span></h2>
                                    <p className="text-4xl font-bold mt-2">0.00</p>
                                    <p className="text-sm text-gray-500 mt-1">保證金為負數時將停止提現和實時到賬</p>
                                </div>
                            </div>

                            <div className="flex justify-between mt-6 text-center">
                                <div className="flex-1">
                                    <p className="text-gray-600">已占用保證金</p>
                                    <p className="font-bold mt-1">¥0</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-600">可用保證金</p>
                                    <p className="font-bold mt-1">¥0.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-4">
                        <button className="flex-1 py-2 px-4 rounded-full bg-gray-100 text-gray-600">
                            提現
                        </button>
                        <button className="flex-1 py-2 px-4 rounded-full bg-gray-100 text-gray-600">
                            充值保證金
                        </button>
                    </div>

                    <div className="mt-8 text-center text-gray-400">
                        已經到底了
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepositRefund; 