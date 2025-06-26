// src/components/Inventory.jsx
import React, { useState } from 'react';
import InventorySearch from './InventorySearch';
import WarehouseList from './WarehouseList';
import ProxyPickup from './ProxyPickup';

function Inventory() {
  const [activeTab, setActiveTab] = useState('入库');
  const [showSearch, setShowSearch] = useState(false);
  const [showWarehouseList, setShowWarehouseList] = useState(false);
  const [showProxyPickup, setShowProxyPickup] = useState(false);
  const [showProxyList, setShowProxyList] = useState(false);
  const [showOutboundApply, setShowOutboundApply] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('全新');
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    defect: 0,
    unInspected: 0,
    good: 0
  });

  if (showProxyPickup) {
    return <ProxyPickup onBack={() => setShowProxyPickup(false)} />;
  }

  if (showSearch) {
    return <InventorySearch onBack={() => setShowSearch(false)} />;
  }

  if (showWarehouseList) {
    return <WarehouseList onBack={() => setShowWarehouseList(false)} />;
  }

  if (showProxyList) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-white">
        {/* 頂部導航欄 */}
        <div className="flex items-center px-4 py-3 border-b bg-gradient-to-r from-cyan-500 to-blue-500">
          <button onClick={() => setShowProxyList(false)} className="text-white text-xl mr-4 hover:opacity-80 transition-opacity">←</button>
          <span className="text-xl font-bold flex-1 text-center text-white">代取列表</span>
          <div className="flex items-center space-x-4">
            <button className="text-white text-xl hover:opacity-80 transition-opacity">⋯</button>
            <button className="text-white text-xl hover:opacity-80 transition-opacity">─</button>
            <button className="text-white text-xl hover:opacity-80 transition-opacity">○</button>
          </div>
        </div>

        {/* 搜索欄 */}
        <div className="p-4 bg-white shadow-sm">
          <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100 focus-within:border-cyan-500 transition-colors">
            <span className="text-gray-400 mr-2">🔍</span>
            <input
              type="text"
              placeholder="請輸入代取單號"
              className="bg-transparent w-full outline-none"
            />
          </div>
        </div>

        {/* 標籤欄 */}
        <div className="flex border-b bg-white">
          <div className="flex-1 text-center py-3 text-cyan-500 border-b-2 border-cyan-500 font-medium">全部</div>
          <div className="flex-1 text-center py-3 text-gray-500 hover:text-gray-700 transition-colors">待取貨</div>
          <div className="flex-1 text-center py-3 text-gray-500 hover:text-gray-700 transition-colors">已取貨</div>
          <div className="flex-1 text-center py-3 text-gray-500 hover:text-gray-700 transition-colors">已取消</div>
        </div>

        {/* 空狀態 */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
          <img src="/assets/images/暂无数据.png" alt="暂无数据" className="w-72 h-72 object-contain opacity-80" />
          <p className="text-gray-500 mt-4">暫無代取訂單</p>
        </div>

        {/* 底部按鈕 */}
        <div className="p-4 bg-white border-t">
          <button
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => {
              setShowProxyList(false);
              setShowProxyPickup(true);
            }}
          >
            新增代取
          </button>
        </div>
      </div>
    );
  }

  if (showOutboundApply) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-cyan-50 to-white">
        {/* 顶部导航栏 */}
        <div className="flex items-center px-4 py-3 border-b bg-white shadow-sm">
          <button onClick={() => setShowOutboundApply(false)} className="text-black text-xl mr-4 hover:text-gray-600 transition-colors">←</button>
          <span className="text-xl font-bold flex-1 text-center">申请出库</span>
          <div className="flex items-center space-x-4">
            <button className="text-xl hover:text-gray-600 transition-colors">⋯</button>
            <button className="text-xl hover:text-gray-600 transition-colors">─</button>
            <button className="text-xl hover:text-gray-600 transition-colors">○</button>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="p-4">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 focus-within:border-cyan-500 transition-colors">
            <span className="text-gray-400 mr-2">🔍</span>
            <input
              type="text"
              placeholder="请输入商品名称或者货号"
              className="bg-transparent w-full outline-none"
            />
          </div>
        </div>

        {/* 可添加商品和已添加商品标签 */}
        <div className="px-4 flex space-x-6 text-sm mb-2">
          <div className="text-gray-600 font-medium">可添加商品</div>
          <div className="text-gray-600">
            已添加商品 <span className="text-cyan-500 font-medium">0</span>
          </div>
        </div>

        {/* 标签栏 */}
        <div className="flex border-b bg-white shadow-sm">
          {['全新', '未质检', '良品', '瑕疵'].map((condition) => (
            <div
              key={condition}
              className={`flex-1 text-center py-3 cursor-pointer transition-colors ${selectedCondition === condition
                ? 'text-cyan-500 border-b-2 border-cyan-500 font-medium'
                : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setSelectedCondition(condition)}
            >
              {condition}
            </div>
          ))}
        </div>

        {/* 空状态 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <img src="/assets/images/暂无搜索记录.png" alt="暂无搜索记录" className="w-72 h-72 object-contain opacity-80" />
          <p className="text-gray-500 mt-4">暫無搜索記錄</p>
        </div>
      </div>
    );
  }

  const renderInboundContent = () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      {[
        {
          title: '申请入库',
          icon: '📦',
          iconColor: 'text-cyan-500',
          onClick: () => setShowSearch(true)
        },
        {
          title: '申请代取',
          icon: '✈️',
          iconColor: 'text-orange-500',
          onClick: () => setShowProxyPickup(true)
        },
        {
          title: '入库单列表',
          icon: '📋',
          iconColor: 'text-cyan-500',
          onClick: () => setShowWarehouseList(true)
        },
        {
          title: '代取列表',
          icon: '📋',
          iconColor: 'text-orange-500',
          onClick: () => setShowProxyList(true)
        }
      ].map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`${item.iconColor} text-2xl mr-3`}>{item.icon}</span>
              <div>
                <p className="font-medium">{item.title}</p>
              </div>
            </div>
            <span className="text-gray-400 text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOutboundContent = () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      {[
        {
          title: '申请出库',
          icon: '📦',
          iconColor: 'text-cyan-500',
          onClick: () => setShowOutboundApply(true)
        },
        {
          title: '出库单列表',
          icon: '📋',
          iconColor: 'text-orange-500',
          onClick: () => { }
        }
      ].map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`${item.iconColor} text-2xl mr-3`}>{item.icon}</span>
              <div>
                <p className="font-medium">{item.title}</p>
              </div>
            </div>
            <span className="text-gray-400 text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderUnsupportedContent = () => (
    <div className="bg-white rounded-lg mt-4 p-8 flex flex-col items-center justify-center mx-4 shadow-sm">
      <img src="/assets/images/暂无数据.png" alt="暂不支持" className="w-72 h-auto mb-4 opacity-80" />
      <div className="text-gray-500 text-base">暂不支持该功能</div>
    </div>
  );

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-b from-cyan-50 to-white">
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center h-14 bg-white px-4 z-50 shadow-sm">
        <div></div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">共鞋</h1>
        <div className="w-8"></div>
      </div>

      <div className="pt-16">
        <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-lg font-bold mr-2">共鞋 武汉仓</span>
              <span className="opacity-80">▼</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center shadow-sm">
              <span className="text-gray-400 mr-2">🔍</span>
              <input
                type="text"
                placeholder="请输入商品名称或货号"
                className="bg-transparent w-full outline-none text-sm text-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm">
          <div className="flex">
            <button
              className={`flex-1 py-3 px-4 font-medium transition-colors ${activeTab === '入库'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setActiveTab('入库')}
            >
              入库
            </button>
            <button
              className={`flex-1 py-3 px-4 font-medium transition-colors ${activeTab === '出库'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setActiveTab('出库')}
            >
              出库
            </button>
            <button
              className={`flex-1 py-3 px-4 font-medium transition-colors ${activeTab === '库存'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setActiveTab('库存')}
            >
              库存
            </button>
          </div>
        </div>

        {activeTab === '入库' && renderInboundContent()}
        {activeTab === '出库' && renderOutboundContent()}
        {activeTab === '库存' && renderUnsupportedContent()}

        {/* 库存统计数据 */}
        <div className="mx-4 mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">库存统计</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">库存总数</span>
                <span className="text-lg font-medium text-cyan-500">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">全新</span>
                <span className="text-lg font-medium text-green-500">{stats.new}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">瑕疵</span>
                <span className="text-lg font-medium text-orange-500">{stats.defect}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">未质检</span>
                <span className="text-lg font-medium text-gray-500">{stats.unInspected}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">良品</span>
                <span className="text-lg font-medium text-blue-500">{stats.good}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 暂无数据展示 */}
        {(activeTab === '入库' || activeTab === '出库') && (
          <div className="mx-4 mt-6 bg-white rounded-xl p-8 flex flex-col items-center justify-center shadow-sm">
            <img src="/assets/images/微信截图_20250618170029.png" alt="暂无数据" className="w-72 h-auto mb-4 opacity-80" />
            <div className="text-gray-500 text-base">暂无数据</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;