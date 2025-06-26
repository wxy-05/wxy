// src/components/WarehousePrice.jsx
import React, { useState, useEffect } from 'react';
import TodoDetail from './TodoDetail';
import PriceQuotation from './PriceQuotation';
import PriceHistory from './PriceHistory';
import WarehouseOrderDetail from './WarehouseOrderDetail';
import WarehouseOrderConfirm from './WarehouseOrderConfirm';
import WarehouseOrderDetailView from './WarehouseOrderDetailView';
import WarehouseOrderList from './WarehouseOrderList';
import { supabase, testConnection, testProductSearch } from '../lib/supabase';
import { mockProduct } from '../lib/mockData';

function ApplyWarehouseModal({ onClose, selectedWarehouse, onOrderCreated }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // 组件加载时测试数据库连接
  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log('正在检查数据库连接...');
        await testConnection();
        console.log('数据库连接成功！');
        setError(null);
      } catch (err) {
        console.error('数据库连接检查失败:', err);
        setError(err.message || '数据库连接失败，请检查配置');
      }
    };
    checkConnection();
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log('搜索输入:', query);

    if (query.length < 3) {
      setSearchResults(null);
      return;
    }

    setLoading(true);
    try {
      // 使用模拟数据而不是真实 API 调用
      if (query.toLowerCase().includes('dv2918')) {
        console.log('使用模拟数据');
        setSearchResults([mockProduct]);
        setError(null);
      } else {
        // 尝试从 API 获取数据
        console.log('开始搜索商品...');
        const { data, error } = await supabase
          .from('productstwo')
          .select('*')
          .or(`sku.ilike.%${query}%,name.ilike.%${query}%`)
          .limit(10);

        console.log('搜索响应:', { data, error });

        if (error) {
          console.error('搜索出错:', error);
          throw new Error(`搜索失败: ${error.message}`);
        }

        setSearchResults(data || []);
        setError(null);
      }
    } catch (err) {
      console.error('搜索错误详情:', err);
      setError(err.message || '搜索失败，请稍后重试');
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  // 增加碼數數量
  const handleIncreaseSize = (e, productId, size) => {
    e.stopPropagation(); // 防止事件冒泡

    setSelectedSizes(prev => {
      const newSizes = JSON.parse(JSON.stringify(prev)); // 深拷貝

      if (!newSizes[productId]) {
        newSizes[productId] = {};
      }

      if (!newSizes[productId][size]) {
        newSizes[productId][size] = 1;
      } else {
        newSizes[productId][size] += 1;
      }

      return newSizes;
    });

    setTotalItems(prev => prev + 1);
  };

  // 減少碼數數量
  const handleDecreaseSize = (e, productId, size) => {
    e.stopPropagation(); // 防止事件冒泡

    setSelectedSizes(prev => {
      const newSizes = JSON.parse(JSON.stringify(prev)); // 深拷貝

      if (!newSizes[productId] || !newSizes[productId][size]) {
        return prev;
      }

      if (newSizes[productId][size] > 1) {
        newSizes[productId][size] -= 1;
      } else {
        delete newSizes[productId][size];
        if (Object.keys(newSizes[productId]).length === 0) {
          delete newSizes[productId];
        }
      }

      return newSizes;
    });

    setTotalItems(prev => prev - 1);
  };

  const generateOrderNumber = () => {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    return `PCH${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${timestamp}`;
  };

  const handleCreateOrder = () => {
    const orderNumber = generateOrderNumber();
    const orderData = {
      orderNumber,
      warehouse: selectedWarehouse,
      createTime: new Date().toLocaleString(),
      fee: 0,
      address: `鞋多多，15515550619，湖北省，武汉市，黄陂区，临空港经济技术开发区4栋二单元六楼`,
      items: searchResults.map(product => ({
        ...product,
        selectedSizes: selectedSizes[product.id] || {}
      }))
    };
    setCurrentOrder(orderData);
    setShowConfirm(true);
    // 通知父組件更新待辦事項
    if (onOrderCreated) {
      onOrderCreated(orderData);
    }
  };

  const handleContinueCreate = () => {
    setShowConfirm(false);
    setSelectedSizes({});
    setTotalItems(0);
    setSearchQuery('');
    setSearchResults(null);
  };

  const handleViewDetail = () => {
    setShowConfirm(false);
    setShowOrderDetail(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{
      background: 'url(/assets/images/背景色.png) center center / cover no-repeat',
      backdropFilter: 'blur(10px)'
    }}>
      {/* 顶部导航栏 */}
      <div className="flex items-center px-4 py-3 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <button onClick={onClose} className="text-black text-xl mr-4">←</button>
        <span className="text-xl font-bold flex-1 text-center">鞋多多 {selectedWarehouse}-申请入库</span>
        <div className="flex items-center space-x-4">
          <div className="relative">
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <button className="text-xl">⋯</button>
          </div>
          <button className="text-xl">─</button>
          <button className="text-xl">○</button>
        </div>
      </div>

      {/* 搜索框 */}
      <div className="p-4">
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-xl w-full px-4 py-3 shadow-lg">
          <span className="text-gray-400 text-xl mr-2">🔍</span>
          <input
            className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400"
            placeholder="请输入商品名称或者货号"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* 可添加商品和已添加商品标签 */}
      <div className="px-4 flex space-x-4 text-sm font-medium">
        <div className="text-gray-700">可添加商品</div>
        <div className="text-gray-700">
          已添加商品 <span className="text-cyan-600">{totalItems}</span>
        </div>
      </div>

      {/* 搜索结果或暂无记录 */}
      <div className="flex-1 overflow-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow">{error}</p>
          </div>
        ) : searchResults && searchResults.length > 0 ? (
          <div className="space-y-4 py-4">
            {searchResults.map((product) => (
              <div key={product.id} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <div className="flex items-start">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg mr-4 shadow-md" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-800">{product.name}</h3>
                      <span className="text-cyan-600 text-sm hover:text-cyan-700 transition-colors cursor-pointer">查看销量</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">货号: {product.sku}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      更新时间: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                      <span className="ml-2 text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer">更新</span>
                    </p>
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {product.sizes && Object.entries(product.sizes).map(([size, data]) => (
                        <div
                          key={size}
                          className={`relative text-center p-2 rounded-lg cursor-pointer transition-all duration-200
                            ${selectedSizes[product.id]?.[size]
                              ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg transform scale-105'
                              : 'bg-gray-50 hover:bg-gray-100 hover:shadow'}
                          `}
                          onClick={(e) => handleIncreaseSize(e, product.id, size)}
                        >
                          <p className="font-medium">{size}</p>
                          <p className="text-xs opacity-75">
                            US: {data.us} UK: {data.uk}
                          </p>
                          {selectedSizes[product.id]?.[size] > 0 && (
                            <div className="absolute -top-2 -right-2 flex items-center space-x-1">
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg transition-colors"
                                onClick={(e) => handleDecreaseSize(e, product.id, size)}
                              >
                                -
                              </button>
                              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                {selectedSizes[product.id][size]}
                              </span>
                            </div>
                          )}
                          <p className="text-xs mt-1">库存: {data.stock}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !searchQuery ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <img src="/assets/images/暂无搜索记录.png" alt="暂无搜索记录" className="w-96 h-96 object-contain mb-4 opacity-80" />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow">未找到相关商品</p>
          </div>
        )}
      </div>

      {/* 底部导航栏 */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">共计 {totalItems} 个商品</span>
          </div>
          <button
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleCreateOrder}
          >
            创建预约单
          </button>
        </div>
      )}

      {/* 确认弹窗 */}
      {showConfirm && (
        <WarehouseOrderConfirm
          orderNumber={currentOrder.orderNumber}
          onContinue={handleContinueCreate}
          onViewDetail={handleViewDetail}
          onClose={() => setShowConfirm(false)}
        />
      )}

      {/* 订单详情 */}
      {showOrderDetail && (
        <WarehouseOrderDetailView
          orderData={currentOrder}
          onClose={() => {
            setShowOrderDetail(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}

function WarehousePrice({ setCurrentPage }) {
  const [showModal, setShowModal] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [showPriceQuotation, setShowPriceQuotation] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showOrderList, setShowOrderList] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(() => {
    // 从 localStorage 读取选中的仓库
    return localStorage.getItem('selectedWarehouse') || '武汉仓';
  });
  const [pendingOrders, setPendingOrders] = useState(() => {
    // 从 localStorage 读取订单数据
    const savedOrders = localStorage.getItem('warehouseOrders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // 当订单数据改变时，保存到 localStorage
  useEffect(() => {
    localStorage.setItem('warehouseOrders', JSON.stringify(pendingOrders));
  }, [pendingOrders]);

  // 当选中的仓库改变时，保存到 localStorage
  useEffect(() => {
    localStorage.setItem('selectedWarehouse', selectedWarehouse);
  }, [selectedWarehouse]);

  const handleOrderCreated = (orderData) => {
    // 确保订单数据包含所有必要的字段
    const newOrder = {
      ...orderData,
      status: '待发货',
      type: '寄售入库',
      items: orderData.items.map(item => ({
        ...item,
        image: item.image || '/assets/images/puma.jpg'
      }))
    };
    setPendingOrders(prev => {
      // 检查是否已存在相同订单号
      const exists = prev.some(order => order.orderNumber === newOrder.orderNumber);
      if (!exists) {
        return [...prev, newOrder];
      }
      return prev;
    });
  };

  const handleUpdateOrderStatus = (orderNumber, newStatus) => {
    setPendingOrders(prev => prev.map(order => {
      if (order.orderNumber === orderNumber) {
        // 添加状态更新时间
        return {
          ...order,
          status: newStatus,
          statusUpdateTime: new Date().toLocaleString(),
        };
      }
      return order;
    }));
  };

  const handleViewOrderDetail = () => {
    setShowOrderList(true);
  };

  // 获取待办事项订单
  const getPendingOrders = () => {
    return pendingOrders.filter(order => order.status === '待发货');
  };

  // 清除所有订单数据（可选，用于测试）
  const handleClearAllOrders = () => {
    if (window.confirm('确定要清除所有订单数据吗？')) {
      setPendingOrders([]);
      localStorage.removeItem('warehouseOrders');
    }
  };

  const handleWarehouseSelect = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  return (
    <div className="pb-16" style={{
      background: 'url(/assets/images/背景色.png) center center / cover no-repeat',
      minHeight: '100vh'
    }}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">共鞋</h1>
      </div>

      <div className="px-4 space-y-4">
        <div className="flex justify-between">
          <div
            className={`${selectedWarehouse === '武汉仓'
              ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg'
              : 'bg-white/90 backdrop-blur-sm text-gray-800'
              } rounded-xl p-4 flex-1 mr-2 cursor-pointer transition-all duration-300 hover:shadow-xl`}
            onClick={() => handleWarehouseSelect('武汉仓')}
          >
            <p className="font-medium">共鞋 武汉仓</p>
            <p className="text-2xl font-bold mt-2">{pendingOrders.filter(order => order.warehouse === '武汉仓' && order.status === '待发货').length}</p>
            <p className="text-sm mt-1">在仓数量:{pendingOrders.filter(order => order.warehouse === '武汉仓' && ['已发货', '已收货'].includes(order.status)).length}</p>
          </div>
          <div
            className={`${selectedWarehouse === '天津仓'
              ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg'
              : 'bg-white/90 backdrop-blur-sm text-gray-800'
              } rounded-xl p-4 flex-1 ml-2 cursor-pointer transition-all duration-300 hover:shadow-xl`}
            onClick={() => handleWarehouseSelect('天津仓')}
          >
            <p className="font-medium">共鞋 天津仓</p>
            <p className="text-2xl font-bold mt-2">{pendingOrders.filter(order => order.warehouse === '天津仓' && order.status === '待发货').length}</p>
            <p className="text-sm mt-1">在仓数量:{pendingOrders.filter(order => order.warehouse === '天津仓' && ['已发货', '已收货'].includes(order.status)).length}</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">入仓出价待办</h2>
            <button onClick={handleViewOrderDetail} className="text-gray-400 text-xl transition-transform hover:scale-110">›</button>
          </div>
          {getPendingOrders().length > 0 ? (
            <div className="space-y-4">
              {getPendingOrders().map((order) => (
                <div key={order.orderNumber} className="flex items-start border-b pb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800">{order.items[0].name}</h3>
                      <span
                        className="text-cyan-600 cursor-pointer hover:text-cyan-700 transition-colors"
                        onClick={handleViewOrderDetail}
                      >
                        查看详情
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">订单号: {order.orderNumber}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      创建时间: {order.createTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center flex-col items-center">
              <img src="/assets/images/微信截图_20250618170029.png" alt="暂无待办" className="w-96 h-auto opacity-80" />
              <p className="text-center text-gray-500 mt-4">暂无待办</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { title: '待出价数量', value: pendingOrders.filter(order => ['已发货', '已收货'].includes(order.status)).length, subtext: '前往出价', onClick: () => setShowPriceQuotation(true) },
            { title: '出价记录', value: 0, subtext: '全部', onClick: () => setShowPriceHistory(true) },
            { title: '入仓订单', value: pendingOrders.filter(order => ['已发货', '已收货'].includes(order.status)).length, subtext: '订单数量', onClick: () => setShowOrderDetail(true) }
          ].map((item, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center relative shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-gray-700">{item.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">{item.value}</p>
              <p className="text-xs text-gray-500 mt-1">{item.subtext}</p>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xl transition-transform hover:scale-110"
                onClick={item.onClick}
              >›</button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => setShowApply(true)}
          >
            + 新增入仓
          </button>
          <button
            className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => setCurrentPage('inventory')}
          >
            库存操作
          </button>
        </div>

        {/* 统计数据区块 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg space-y-3">
          {[
            { label: '今日GMV', value: '¥0' },
            { label: '今日订单数量', value: '0' },
            { label: '动销及售罄sku', value: '0/0' }
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="text-gray-700">{item.label}</p>
              <p className="font-medium text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            {[
              { label: '出价数量', value: '0' },
              { label: 'sku数量', value: '0' },
              { label: '出价总市值', value: '¥0' }
            ].map((item, index) => (
              <div key={index} className="text-center px-2">
                <p className="text-gray-800 text-xl font-bold">{item.value}</p>
                <p className="text-gray-600 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-200 mt-4">
            {[
              { label: 'top最低价数量及占比', value: '0%' },
              { label: '全量最低价数量及占比', value: '/%' }
            ].map((item, index) => (
              <div key={index} className="text-center px-2">
                <p className="text-gray-800 text-lg font-bold">{item.value}</p>
                <p className="text-gray-600 text-xs mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popups */}
      {showModal && (
        <TodoDetail onClose={() => setShowModal(false)} />
      )}
      {showApply && (
        <ApplyWarehouseModal
          onClose={() => setShowApply(false)}
          selectedWarehouse={selectedWarehouse}
          onOrderCreated={handleOrderCreated}
        />
      )}
      {showPriceQuotation && (
        <PriceQuotation onClose={() => setShowPriceQuotation(false)} />
      )}
      {showPriceHistory && (
        <PriceHistory onClose={() => setShowPriceHistory(false)} />
      )}
      {showOrderDetail && (
        <WarehouseOrderDetail onClose={() => setShowOrderDetail(false)} />
      )}
      {showOrderList && (
        <WarehouseOrderList
          orders={pendingOrders}
          onClose={() => setShowOrderList(false)}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          selectedWarehouse={selectedWarehouse}
        />
      )}
    </div>
  );
}

export default WarehousePrice;