import React from 'react';

function WarehouseOrderDetailView({ onClose, orderData }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-gray-100">
            {/* 顶部导航栏 */}
            <div className="flex items-center px-4 py-3 bg-white">
                <button onClick={onClose} className="text-black text-xl mr-4">←</button>
                <span className="text-xl font-bold flex-1">待发货</span>
            </div>

            {/* 订单状态 */}
            <div className="bg-white p-4 mb-2">
                <div className="flex items-center justify-between mb-4">
                    <p>订单编号：{orderData?.orderNumber}</p>
                    <button className="text-gray-400">复制</button>
                </div>
                <div className="flex justify-between items-center">
                    <p>待发货</p>
                    <p className="text-cyan-500">鞋多多 {orderData?.warehouse}入库</p>
                </div>
            </div>

            {/* 进度条 */}
            <div className="bg-white p-4 mb-2">
                <div className="flex justify-between items-center relative">
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2"></div>
                    <div className="relative z-10">
                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white">✓</div>
                        <p className="text-xs mt-1">生成单</p>
                    </div>
                    <div className="relative z-10">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">2</div>
                        <p className="text-xs mt-1">已发货</p>
                    </div>
                    <div className="relative z-10">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">3</div>
                        <p className="text-xs mt-1">已收货</p>
                    </div>
                    <div className="relative z-10">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">4</div>
                        <p className="text-xs mt-1">发货中</p>
                    </div>
                </div>
            </div>

            {/* 入库费用 */}
            <div className="bg-white p-4 mb-2">
                <div className="flex justify-between items-center">
                    <h3>入库费用</h3>
                    <p className="text-red-500">¥ {orderData?.fee || 0}</p>
                </div>
            </div>

            {/* 入库单信息 */}
            <div className="bg-white p-4">
                <h3 className="mb-4">入库单信息</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <p className="text-gray-500">入库单号：</p>
                        <p>{orderData?.orderNumber}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-500">创建时间：</p>
                        <p>{orderData?.createTime}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-500">用户备注：</p>
                        <p className="text-gray-400">暂无备注，您可以备注一些注意事项方便仓库人员验收</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-500">地址：</p>
                        <p className="text-right flex-1 ml-4">{orderData?.address}</p>
                    </div>
                </div>
            </div>

            {/* 预约明细 */}
            <div className="bg-white p-4 mt-2">
                <h3 className="mb-4">预约明细</h3>
                {orderData?.items?.map((item, index) => (
                    <div key={index} className="flex items-start border-b last:border-b-0 py-3">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="ml-3 flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">货号: {item.sku}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {Object.entries(item.selectedSizes).map(([size, quantity]) => (
                                    <div key={size} className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        {size} × {quantity}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 底部按钮 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
                <div className="flex space-x-4">
                    <button className="flex-1 py-2 bg-gray-100 rounded-lg">预约明细</button>
                    <button className="flex-1 py-2 bg-gray-100 rounded-lg">到货明细</button>
                    <button className="flex-1 py-2 bg-gray-100 rounded-lg">到货箱子明细</button>
                </div>
            </div>
        </div>
    );
}

export default WarehouseOrderDetailView; 