// src/components/PriceCalculator.jsx
import React, { useState, useEffect } from 'react';
import { supabase, testConnection } from '../lib/supabase';
import ProductDetail from './ProductDetail';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PriceCalculator() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('multi');
  const [activeRate, setActiveRate] = useState('3.5');
  const [price, setPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setShowProductDetail(false);
    setError(null);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      console.log('Searching for:', searchQuery.trim());

      // 创建模拟数据
      const mockProduct = {
        code: searchQuery.toUpperCase(),
        name: 'Nike Air Zoom G.T. Cut 3 EP 低帮 篮球鞋 男女同款',
        image: '/placeholder.png',
        sizes: {
          '38.5': { lowest: null, final: null },
          '39': { lowest: 689, final: 634.5 },
          '40': { lowest: null, final: null },
          '40.5': { lowest: 624, final: 592.8 },
          '41': { lowest: 649, final: 562.2 },
          '42': { lowest: 619, final: 535.8 },
          '42.5': { lowest: 619, final: 535.8 },
          '43': { lowest: 629, final: 544.6 },
          '44': { lowest: 629, final: 544.6 },
          '44.5': { lowest: 639, final: 553.4 },
          '45': { lowest: 619, final: 535.8 },
          '45.5': { lowest: null, final: null },
          '46': { lowest: 729, final: 652.6 },
          '47': { lowest: null, final: null },
          '47.5': { lowest: 959, final: 836.0 }
        }
      };

      // 然后查询数据
      console.log('Querying data...');
      const searchCode = searchQuery.trim().toUpperCase();
      console.log('Search code:', searchCode);

      const { data, error: queryError } = await supabase
        .from('products')
        .select('*')
        .eq('code', searchCode)
        .single();

      if (queryError) {
        console.error('Query error:', queryError);
        if (queryError.code === 'PGRST116') {
          console.log('No data found, using mock data');
          setSelectedProduct(mockProduct);
          setShowProductDetail(true);
          return;
        }
        throw queryError;
      }

      console.log('Query result:', data);

      if (data) {
        setSelectedProduct(data);
      } else {
        console.log('No data found, using mock data');
        setSelectedProduct(mockProduct);

        // 尝试保存模拟数据
        try {
          const { error: insertError } = await supabase
            .from('products')
            .insert([mockProduct]);

          if (insertError) {
            console.error('Insert error:', insertError);
          }
        } catch (insertErr) {
          console.error('Failed to save mock data:', insertErr);
        }
      }

      setShowProductDetail(true);
    } catch (err) {
      console.error('Error details:', err);
      setError('查询失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const warehouseStats = {
    gmv: 0,
    orderCount: 0,
    sku: '0/0',
    bidCount: 0,
    skuCount: 0,
    bidValue: 0,
    topLowCount: 0,
    topLowPercent: 0,
    allLowCount: 0,
    allLowPercent: 0,
  };
  const chartData = [
    { date: '06.12', sales: 0, clicks: 0, amount: 0 },
    { date: '06.13', sales: 0, clicks: 0, amount: 0 },
    { date: '06.14', sales: 0, clicks: 0, amount: 0 },
    { date: '06.15', sales: 0, clicks: 0, amount: 0 },
    { date: '06.16', sales: 200, clicks: 0, amount: 1 },
    { date: '06.17', sales: 260, clicks: 0, amount: 1 },
  ];

  const renderWarehouseCalculator = () => {
    return (
      <div className="bg-white flex-1">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <span className="text-gray-600 mr-2">平台推广费率%</span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded bg-cyan-500 text-white">5%</button>
              <button className="px-3 py-1 rounded border border-gray-300">10%</button>
            </div>
            <button className="ml-auto text-cyan-500">详情</button>
          </div>

          <div className="bg-cyan-100 rounded-lg p-4 mb-4">
            <div className="flex flex-col space-y-2 text-lg">
              <div className="flex justify-between">
                <span>今日GMV</span>
                <span className="font-bold">¥{warehouseStats.gmv}</span>
              </div>
              <div className="flex justify-between">
                <span>今日订单数量</span>
                <span className="font-bold">{warehouseStats.orderCount}</span>
              </div>
              <div className="flex justify-between">
                <span>动销及售罄sku</span>
                <span className="font-bold">{warehouseStats.sku}</span>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between text-center mb-2">
              <div className="flex-1">
                <div className="text-xl font-bold">{warehouseStats.bidCount}</div>
                <div className="text-xs text-gray-500">出价数量</div>
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold">{warehouseStats.skuCount}</div>
                <div className="text-xs text-gray-500">sku数量</div>
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold">¥{warehouseStats.bidValue}</div>
                <div className="text-xs text-gray-500">出价总市值</div>
              </div>
            </div>
            <div className="flex justify-between text-center">
              <div className="flex-1">
                <div className="text-lg font-bold">{warehouseStats.topLowPercent}%</div>
                <div className="text-xs text-gray-500">top最低价数量及占比</div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold">/{warehouseStats.allLowPercent}%</div>
                <div className="text-xs text-gray-500">全网最低价数量及占比</div>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 rounded-lg p-4 mb-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend formatter={(value) => {
                  if (value === 'sales') return '销售额';
                  if (value === 'clicks') return '点击数';
                  if (value === 'amount') return '销量';
                  return value;
                }} />
                <Line type="monotone" dataKey="sales" stroke="#4F6EF7" name="销售额" />
                <Line type="monotone" dataKey="clicks" stroke="#7ED957" name="点击数" />
                <Line type="monotone" dataKey="amount" stroke="#FFB300" name="销量" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="flex items-center border-b pb-3">
              <input
                type="number"
                placeholder="请输入价格"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 outline-none"
              />
              <span className="text-gray-400">¥</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">平台推广费 5%</span>
                <span>¥{price ? (price * 0.05).toFixed(1) : '0'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">转账服务费 0.6%</span>
                <span>¥{price ? (price * 0.006).toFixed(1) : '0'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">技术服务费</span>
                <span>¥2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">入库-质检+上架</span>
                <span>¥1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">出库操作费</span>
                <span>¥2</span>
              </div>
              <div className="border-t border-b py-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">快递运输费</span>
                  <span>¥3.5</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">物流加固箱</span>
                  <span>¥1.5</span>
                </div>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>费用合计</span>
                <span>¥{price ? (price * 0.056 + 10).toFixed(1) : '0'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">预计单件收入</span>
                <span>¥{price ? (price - (price * 0.056 + 10)).toFixed(1) : '0'}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>总收入</span>
                <span>¥{price ? (price - (price * 0.056 + 10)).toFixed(1) : '0'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMultiChannelCalculator = () => {
    return (
      <div className="p-4">
        <div className="flex">
          <input
            type="text"
            placeholder="输入货名或货号"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-2 px-4 border rounded-l focus:outline-none focus:border-cyan-500"
          />
          <button
            className={`bg-black text-white px-8 py-2 rounded-r ${loading ? 'opacity-50' : ''}`}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? '查询中...' : '查询'}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
    );
  };

  if (showProductDetail) {
    return <ProductDetail product={selectedProduct} onClose={handleClose} />;
  }

  return (
    <>
      <div
        className="bg-gray-900 h-full w-full rounded-lg flex flex-col items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <span className="text-3xl mb-2">🧮</span>
        <span className="text-white">出价计算器</span>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-100 z-50">
          <div className="min-h-screen pb-16">
            {/* 顶部导航栏 */}
            <div className="bg-gray-900 flex items-center px-4 py-3">
              <button onClick={handleClose} className="text-white text-xl mr-4">
                ←
              </button>
              <span className="text-lg font-medium flex-1 text-center mr-4 text-white">共鞋</span>
              <div className="flex space-x-4">
                <button className="text-xl text-white">⋯</button>
                <button className="text-xl text-white">○</button>
              </div>
            </div>

            {/* 技术服务费率 */}
            <div className="bg-gray-900 px-4 pb-4">
              <div className="border border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white text-sm">技术服务费率%</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className={`px-3 py-1 rounded ${activeRate === '3.5' ? 'bg-cyan-500 text-white' : 'text-white border border-gray-600'}`}
                      onClick={() => setActiveRate('3.5')}
                    >
                      3.5
                    </button>
                    <button
                      className={`px-3 py-1 rounded ${activeRate === '4.0' ? 'bg-cyan-500 text-white' : 'text-white border border-gray-600'}`}
                      onClick={() => setActiveRate('4.0')}
                    >
                      4.0
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="text-white bg-transparent border border-gray-600 px-4 py-1.5 text-sm rounded">
                    批发文本识别
                  </button>
                </div>
              </div>
            </div>

            {/* 选项卡 */}
            <div className="flex border-b bg-white">
              <button
                className={`flex-1 py-3 text-center relative ${activeTab === 'multi' ? 'text-cyan-500' : 'text-gray-600'}`}
                onClick={() => setActiveTab('multi')}
              >
                多渠道计算器
                {activeTab === 'multi' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500"></div>
                )}
              </button>
              <button
                className={`flex-1 py-3 text-center relative ${activeTab === 'price' ? 'text-cyan-500' : 'text-gray-600'}`}
                onClick={() => setActiveTab('price')}
              >
                出价入仓计算器
                {activeTab === 'price' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500"></div>
                )}
              </button>
            </div>

            {/* 根据选项卡显示不同内容 */}
            {activeTab === 'multi' ? (
              <div className="p-4">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="输入货名或货号"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 py-2 px-4 border rounded-l focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    className={`bg-black text-white px-8 py-2 rounded-r ${loading ? 'opacity-50' : ''}`}
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? '查询中...' : '查询'}
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>
            ) : (
              renderWarehouseCalculator()
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PriceCalculator;