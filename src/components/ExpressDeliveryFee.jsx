import React from 'react';

function ExpressDeliveryFee({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center">
            <div className="bg-white w-full min-h-screen animate-slide-up">
                <div className="flex items-center justify-between p-4 border-b">
                    <button onClick={onClose} className="text-gray-600">
                        <span className="text-2xl">‹</span>
                    </button>
                    <h1 className="text-lg font-medium">快递运费</h1>
                    <div className="w-8"></div>
                </div>

                <div className="p-6">
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg">运费额度（元）<span className="text-blue-500 ml-1">说明</span></h2>
                                    <p className="text-4xl font-bold mt-2">0.00</p>
                                </div>
                            </div>

                            <div className="flex justify-between mt-6 text-center">
                                <div className="flex-1">
                                    <p className="text-gray-600">已占用快递费</p>
                                    <p className="font-bold mt-1">¥0</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-600">可用快递费</p>
                                    <p className="font-bold mt-1">¥0.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-4">
                        <button className="flex-1 py-2 px-4 rounded-full bg-gray-100 text-gray-600">
                            占用明细
                        </button>
                        <button className="flex-1 py-2 px-4 rounded-full bg-gray-100 text-gray-600">
                            快递查询
                        </button>
                        <button className="flex-1 py-2 px-4 rounded-full bg-gray-100 text-gray-600">
                            变更记录
                        </button>
                    </div>

                    <div className="mt-8 text-center text-gray-400">
                        已经到底了
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-4 flex gap-4">
                    <button className="flex-1 py-3 rounded-full bg-cyan-500 text-white font-medium">
                        提现
                    </button>
                    <button className="flex-1 py-3 rounded-full bg-cyan-500 text-white font-medium">
                        充值运费
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExpressDeliveryFee; 