import React, { useState } from 'react';

function ProductDetail({ product, onClose }) {
    const [selectedSizes, setSelectedSizes] = useState({});
    const [quantities, setQuantities] = useState({});

    // 使用模擬數據，如果沒有提供 product
    const mockProduct = {
        code: "DV2918-001",
        name: "Nike Air Zoom G.T. Cut 3 EP 低帮 篮球鞋 男女同款",
        image: "/assets/images/puma.jpg",
        sizes: {
            "38.5": { lowest: 1099, final: 1199 },
            "39": { lowest: 1099, final: 1199 },
            "40": { lowest: 1099, final: 1199 },
            "40.5": { lowest: 1099, final: 1199 },
            "41": { lowest: 1099, final: 1199 },
            "42": { lowest: 1099, final: 1199 },
            "42.5": { lowest: 1099, final: 1199 },
            "43": { lowest: 1099, final: 1199 },
            "44": { lowest: 1099, final: 1199 },
            "44.5": { lowest: 1099, final: 1199 },
            "45": { lowest: 1099, final: 1199 },
            "45.5": { lowest: 1099, final: 1199 }
        }
    };

    // 如果沒有提供 product，使用模擬數據
    const actualProduct = product || mockProduct;

    const sizeRanges = [
        ['38.5', '39', '40'],
        ['40.5', '41', '42'],
        ['42.5', '43', '44'],
        ['44.5', '45', '45.5'],
        ['46', '47', '47.5']
    ];

    const handleSizeClick = (size) => {
        // 修改選中邏輯，不再是切換布爾值，而是增加數量
        if (!actualProduct?.sizes[size]?.final) return; // 如果沒有價格數據，不允許選擇

        // 更新數量
        setQuantities(prev => {
            const newQuantities = { ...prev };
            if (!newQuantities[size]) {
                newQuantities[size] = 1;
            } else {
                newQuantities[size] += 1;
            }
            return newQuantities;
        });

        // 同時更新選中狀態
        setSelectedSizes(prev => ({
            ...prev,
            [size]: true
        }));
    };

    const handleQuantityChange = (size, change) => {
        setQuantities(prev => {
            const newValue = Math.max(0, (prev[size] || 0) + change);
            const newQuantities = { ...prev };

            if (newValue === 0) {
                delete newQuantities[size];
                // 如果數量為0，也移除選中狀態
                setSelectedSizes(prevSizes => {
                    const newSizes = { ...prevSizes };
                    delete newSizes[size];
                    return newSizes;
                });
            } else {
                newQuantities[size] = newValue;
            }

            return newQuantities;
        });
    };

    const calculateTotals = () => {
        let totalQuantity = 0;
        let totalPrice = 0;
        Object.entries(quantities).forEach(([size, quantity]) => {
            if (quantity > 0) {
                totalQuantity += quantity;
                const sizePrice = actualProduct?.sizes[size]?.final || 0;
                totalPrice += sizePrice * quantity;
            }
        });
        return { totalQuantity, totalPrice };
    };

    const { totalQuantity, totalPrice } = calculateTotals();

    return (
        <div className="fixed inset-0 bg-white z-50">
            <div className="min-h-screen pb-16">
                {/* 顶部导航栏 */}
                <div className="bg-white flex items-center px-4 py-3 border-b">
                    <button onClick={onClose} className="text-black text-xl mr-4">
                        ←
                    </button>
                    <span className="text-lg font-medium flex-1 text-center mr-4">共鞋计算器</span>
                    <div className="flex space-x-4">
                        <button className="text-xl">⋯</button>
                        <button className="text-xl">○</button>
                    </div>
                </div>

                {/* 商品信息 */}
                <div className="p-4 flex items-start space-x-4 border-b">
                    <img src={actualProduct?.image || '/placeholder.png'} alt={actualProduct?.name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <h2 className="text-sm font-medium">{actualProduct?.code || 'DV2918-001'}</h2>
                            <button className="text-gray-400">□</button>
                        </div>
                        <p className="text-sm text-gray-600">{actualProduct?.name || 'Nike Air Zoom G.T. Cut 3 EP 低帮 篮球鞋 男女同款'}</p>
                    </div>
                </div>

                {/* 标签栏 */}
                <div className="flex space-x-2 p-2 overflow-x-auto whitespace-nowrap border-b">
                    <div className="inline-flex items-center px-3 py-1 bg-cyan-50 text-cyan-500 rounded-full text-xs">
                        <span className="mr-1">●</span>
                        识货最低 3.5%
                    </div>
                    <div className="inline-flex items-center px-3 py-1 bg-cyan-50 text-cyan-500 rounded-full text-xs">
                        <span className="mr-1">●</span>
                        识货优选 3.5%
                    </div>
                    <div className="inline-flex items-center px-3 py-1 bg-cyan-50 text-cyan-500 rounded-full text-xs">
                        <span className="mr-1">●</span>
                        国内 3.5%
                    </div>
                </div>

                {/* 尺码表格 */}
                <div className="grid grid-cols-3 gap-px bg-gray-100">
                    {sizeRanges.flat().map((size) => {
                        const sizeData = actualProduct?.sizes[size] || {};
                        const isAvailable = sizeData.final != null;
                        const isSelected = selectedSizes[size];
                        const quantity = quantities[size] || 0;

                        return (
                            <div
                                key={size}
                                className={`${isSelected ? 'bg-gray-900 text-white' : 'bg-gray-50'} p-3 relative`}
                                onClick={() => isAvailable && handleSizeClick(size)}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm">{size}</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="grid grid-cols-2 text-xs">
                                        <span className="text-gray-500">最低价</span>
                                        <span className="text-gray-500">到手价</span>
                                    </div>
                                    <div className="grid grid-cols-2 text-xs">
                                        <span>¥{sizeData.lowest || '-'}</span>
                                        <span>¥{sizeData.final || '-'}</span>
                                    </div>
                                </div>
                                {/* 顯示選中數量 */}
                                {quantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {quantity}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* 底部數據表格 */}
                <div className="p-4">
                    <p className="text-xs text-gray-500 mb-4">
                        使用：1.查询；2.选择尺码；3.隐藏尺码，编辑数量与要价
                    </p>
                    <div className="border-t border-b py-2">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-center bg-cyan-50">
                                    <th className="font-normal text-gray-500 py-2">尺码</th>
                                    <th className="font-normal text-gray-500 py-2">数量</th>
                                    <th className="font-normal text-gray-500 py-2">识货优选</th>
                                    <th className="font-normal text-gray-500 py-2">识货意向</th>
                                    <th className="font-normal text-gray-500 py-2">国内</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(quantities)
                                    .filter(([_, quantity]) => quantity > 0)
                                    .map(([size, quantity]) => (
                                        <tr key={size} className="text-center border-t">
                                            <td className="py-2">{size}</td>
                                            <td className="py-2">
                                                <div className="flex items-center justify-center space-x-4">
                                                    <button
                                                        className="text-gray-500"
                                                        onClick={() => handleQuantityChange(size, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{quantity}</span>
                                                    <button
                                                        className="text-gray-500"
                                                        onClick={() => handleQuantityChange(size, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-2">0</td>
                                            <td className="py-2">0</td>
                                            <td className="py-2">{actualProduct?.sizes[size]?.final || '-'}</td>
                                        </tr>
                                    ))}
                            </tbody>
                            <tfoot>
                                <tr className="text-center bg-cyan-50 border-t">
                                    <td className="py-2 text-xs">(总){Object.keys(quantities).length}</td>
                                    <td className="py-2 text-xs">(总){totalQuantity}</td>
                                    <td className="py-2 text-xs">(均)0</td>
                                    <td className="py-2 text-xs">(均)0</td>
                                    <td className="py-2 text-xs">(均){totalQuantity > 0 ? (totalPrice / totalQuantity).toFixed(2) : '0.00'}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 flex justify-between">
                        <span>识货价格更新时间：03-27 06:23</span>
                        <button className="text-cyan-500">更新</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail; 