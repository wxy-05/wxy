import React, { useState } from 'react';

function WarehouseOrderList({ onClose, orders = [], onUpdateOrderStatus }) {
    const [selectedTab, setSelectedTab] = useState('全部');
    const [selectedStatus, setSelectedStatus] = useState('待发货');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = ['全部', '寄售入库', '退货入库'];
    const statusTabs = {
        '待发货': '待发货2',
        '已发货': '已发货',
        '已收货': '已收货',
        '已取消': '已取消'
    };

    // 过滤订单
    const filteredOrders = orders.filter(order => {
        // 状态筛选
        const statusMatch = selectedStatus === '待发货' ?
            order.status === '待发货' :
            order.status === selectedStatus;

        // 类型筛选
        const typeMatch = selectedTab === '全部' || order.type === selectedTab;

        // 搜索筛选
        const searchMatch = !searchQuery || (
            order.items.some(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return statusMatch && typeMatch && searchMatch;
    });

    // 处理订单状态更新
    const handleStatusChange = (orderNumber, newStatus) => {
        if (onUpdateOrderStatus) {
            onUpdateOrderStatus(orderNumber, newStatus);
        }
    };

    // 获取状态对应的操作按钮
    const getStatusActions = (order) => {
        switch (order.status) {
            case '待发货':
                return (
                    <div className="space-x-2">
                        <button
                            className="px-4 py-1 border border-gray-300 rounded-full"
                            onClick={() => handleStatusChange(order.orderNumber, '已取消')}
                        >
                            取消发货
                        </button>
                        <button
                            className="px-4 py-1 bg-cyan-500 text-white rounded-full"
                            onClick={() => handleStatusChange(order.orderNumber, '已发货')}
                        >
                            确认发货
                        </button>
                    </div>
                );
            case '已发货':
                return (
                    <button
                        className="px-4 py-1 bg-cyan-500 text-white rounded-full"
                        onClick={() => handleStatusChange(order.orderNumber, '已收货')}
                    >
                        确认收货
                    </button>
                );
            case '已收货':
                return (
                    <span className="text-gray-500">已完成</span>
                );
            case '已取消':
                return (
                    <span className="text-red-500">已取消</span>
                );
            default:
                return null;
        }
    };

    // 获取状态标签的样式
    const getStatusStyle = (status) => {
        switch (status) {
            case '待发货':
                return 'bg-black text-white';
            case '已发货':
                return 'bg-cyan-500 text-white';
            case '已收货':
                return 'bg-green-500 text-white';
            case '已取消':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-gray-100">
            {/* 顶部导航栏 */}
            <div className="flex items-center px-4 py-3 bg-white">
                <button onClick={onClose} className="text-black text-xl mr-4">←</button>
                <span className="text-xl font-bold flex-1">入仓预约单列表</span>
                <div className="flex items-center space-x-2">
                    <button className="text-xl">⋯</button>
                    <button className="text-xl">─</button>
                    <button className="text-xl">○</button>
                </div>
            </div>

            {/* 仓库选择 */}
            <div className="bg-white px-4 py-2 flex items-center">
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-cyan-500">鞋多多 武汉仓 ▼</span>
                </div>
                <div className="flex-1 ml-4">
                    <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                        <span className="text-gray-400 mr-2">🔍</span>
                        <input
                            type="text"
                            placeholder="请输入商品名称或者货号"
                            className="bg-transparent w-full outline-none text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* 主要标签页 */}
            <div className="bg-white">
                <div className="flex border-b">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            className={`flex-1 text-center py-2 ${selectedTab === tab ? 'text-cyan-500 border-b-2 border-cyan-500' : ''
                                }`}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                    <div className="px-3 py-2 text-cyan-500">筛选</div>
                </div>
            </div>

            {/* 状态标签页 */}
            <div className="bg-white mb-2">
                <div className="flex">
                    {Object.entries(statusTabs).map(([status, label]) => (
                        <div
                            key={status}
                            className={`flex-1 text-center py-2 ${selectedStatus === status
                                    ? 'text-black font-medium border-b-2 border-black'
                                    : 'text-gray-500'
                                }`}
                            onClick={() => setSelectedStatus(status)}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* 订单列表 */}
            <div className="flex-1 overflow-auto px-4">
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div key={order.orderNumber} className="bg-white rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <span className={`text-xs px-2 py-1 rounded ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                    <span className="ml-2 text-cyan-500">鞋多多 {order.warehouse} {order.type}</span>
                                </div>
                                <button className="text-gray-400">〉</button>
                            </div>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-start border-b last:border-b-0 py-3">
                                    <img
                                        src={item.image || '/assets/images/puma.jpg'}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="ml-3 flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium">{item.sku}</h3>
                                            {order.status === '待发货' && (
                                                <button className="text-cyan-500">取消发货</button>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{item.name}</p>
                                        <div className="mt-2 text-sm text-gray-500">
                                            {Object.entries(item.selectedSizes).map(([size, quantity]) => (
                                                <p key={size}>{size} × {quantity}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-3 text-sm text-gray-500">
                                <p>预约单号：{order.orderNumber}</p>
                                <p>创建时间：{order.createTime}</p>
                                <p className="flex items-center">
                                    <span className="mr-1">收货地址：</span>
                                    <span className="flex-1">{order.address}</span>
                                </p>
                            </div>
                            <div className="mt-3 flex justify-between items-center">
                                <span>共{order.items.reduce((total, item) =>
                                    total + Object.values(item.selectedSizes).reduce((sum, qty) => sum + qty, 0), 0
                                )}件</span>
                                {getStatusActions(order)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 底部按钮 */}
            <div className="p-4 flex space-x-4">
                <button className="flex-1 py-3 bg-black text-white rounded-lg">新建预约单</button>
                <button className="flex-1 py-3 bg-cyan-500 text-white rounded-lg">快速入库设置</button>
            </div>
        </div>
    );
}

export default WarehouseOrderList; 