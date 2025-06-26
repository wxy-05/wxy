import React from 'react';

function WarehouseOrderConfirm({ onClose, onContinue, onViewDetail, orderNumber }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80">
                <div className="text-center mb-4">
                    <h3 className="text-lg font-medium">提示</h3>
                </div>
                <div className="text-center mb-6">
                    <p className="text-gray-600 mb-2">预约单创建成功</p>
                    <p className="text-gray-500 text-sm">{orderNumber}</p>
                </div>
                <div className="flex flex-col space-y-3">
                    <button
                        onClick={onContinue}
                        className="w-full py-2 bg-white border border-cyan-500 text-cyan-500 rounded-lg"
                    >
                        继续创建
                    </button>
                    <button
                        onClick={onViewDetail}
                        className="w-full py-2 bg-cyan-500 text-white rounded-lg"
                    >
                        查看详情
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WarehouseOrderConfirm; 