import React, { useState } from 'react';

function WarehouseOrderDetail({ onClose }) {
    const [activeTab, setActiveTab] = useState('全部');

    const tabs = ['全部', '待发货', '已发货', '已收货', '已取消'];

    const mockOrders = {
        '全部': [
            {
                orderId: '202505302676042553222',
                status: '交易完成',
                product: {
                    name: 'PUMA Speedcat OG 耐磨 低帮 训练鞋 生活休闲鞋 男女同款 红色',
                    sku: '398846-02',
                    size: '38 (US: 6)',
                    price: 587.00,
                    estimatedPrice: 549.12,
                    trackingNumber: '75556404068436',
                    colorStatus: '无'
                }
            },
            {
                orderId: '202505290190969496048',
                status: '交易失败',
                product: {
                    name: '彪马SUEDE 拼接复古低帮运动休闲板鞋 381183-01 375876-01 398846',
                    sku: '398846-02',
                    size: '38 (US: 6)',
                    price: 587.00,
                    estimatedPrice: 549.12,
                    trackingNumber: '--',
                    colorStatus: '无'
                },
                failureReason: '该订单存在售后，退款成功，退款成功'
            },
            {
                orderId: '202505240126040701965',
                status: '交易完成',
                product: {
                    name: 'PUMA Speedcat 系列低帮 生活休闲鞋 男女同款398846-01',
                    sku: '398846-01',
                    size: '39 (US: 7)',
                    price: 572.00,
                    estimatedPrice: 534.96,
                    trackingNumber: '789095989821039',
                    colorStatus: '无'
                }
            }
        ],
        '待发货': [],
        '已发货': [],
        '已收货': [],
        '已取消': []
    };

    const renderEmptyState = () => (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-88px)] bg-white">
            <p className="text-gray-400 mb-4">已经到底了</p>
        </div>
    );

    const renderOrders = (orders) => {
        if (!orders || orders.length === 0) {
            return renderEmptyState();
        }

        return (
            <div className="pb-16">
                {orders.map((order) => (
                    <div key={order.orderId} className="bg-white mb-2 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">订单号：{order.orderId}</span>
                            <span className="text-sm text-gray-500">{order.status}</span>
                        </div>

                        <div className="flex gap-4">
                            <img
                                src="/assets/images/puma.jpg"
                                alt={order.product.name}
                                className="w-24 h-24 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="text-sm mb-1">{order.product.name}</h3>
                                <p className="text-sm text-gray-500 mb-1">货号：{order.product.sku}</p>
                                <p className="text-sm text-gray-500 mb-1">尺码：{order.product.size}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">¥ {order.product.price}</span>
                                    <span className="text-sm text-gray-500">预计到手：¥ {order.product.estimatedPrice}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 pt-2 border-t">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">快递单号：{order.product.trackingNumber}</span>
                                <span className="text-sm text-gray-500">颜色标记：{order.product.colorStatus}</span>
                            </div>
                            {order.failureReason && (
                                <p className="text-sm text-red-500 mt-1">{order.failureReason}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-100">
            {/* Header */}
            <div className="sticky top-0 bg-white">
                <div className="flex items-center px-4 py-3 border-b">
                    <button onClick={onClose} className="text-black text-xl mr-4">←</button>
                    <h1 className="text-lg font-medium flex-1 text-center">鞋多多入仓订单</h1>
                    <div className="w-8"></div>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`flex-1 py-2 text-sm text-center ${activeTab === tab ? 'bg-gray-900 text-white' : ''
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {renderOrders(mockOrders[activeTab])}
        </div>
    );
}

export default WarehouseOrderDetail; 