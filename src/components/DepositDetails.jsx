import React from 'react';

function DepositDetails({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-white">
            {/* Header */}
            <div className="flex items-center px-4 py-3 border-b">
                <button onClick={onClose} className="text-black text-xl mr-4">←</button>
                <span className="text-xl font-bold flex-1 text-center">出价保证金</span>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Balance Card */}
                <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">可用保证金</span>
                        <span className="text-2xl font-bold">¥0.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>已占用保证金</span>
                        <span>¥0</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>可用保证金</span>
                        <span>¥0.00</span>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <div className="font-medium">提现出价保证金</div>
                                <div className="text-sm text-gray-500">2023-06-17 20:35:22</div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium">-¥10</div>
                                <div className="text-sm text-gray-500">已经到账了</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <div className="font-medium">充值出价保证金</div>
                                <div className="text-sm text-gray-500">2023-05-25 18:17:07</div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium">-¥10</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 grid grid-cols-2 gap-4 bg-white border-t">
                <button className="bg-cyan-500 text-white py-3 rounded-lg text-lg">
                    提现
                </button>
                <button className="bg-black text-white py-3 rounded-lg text-lg">
                    充值保证金
                </button>
            </div>
        </div>
    );
}

export default DepositDetails; 