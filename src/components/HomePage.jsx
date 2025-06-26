// src/components/HomePage.jsx
import React from 'react';
import NotificationBell from './NotificationBell';
import TodoList from './TodoList';
import PriceCalculator from './PriceCalculator';
import SalesData from './SalesData';
import SettlementData from './SettlementData';

function HomePage() {
  return (
    <div className="min-h-screen pb-16" style={{ background: 'url(/assets/images/背景色.png) center center / cover no-repeat' }}>
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center h-16 bg-white px-6 shadow-md z-50">
        <NotificationBell count={6} />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">共鞋</h1>
        <div className="w-8"></div>
      </div>

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        {/* 轮播图区域 */}
        <div className="carousel rounded-2xl overflow-hidden shadow-lg mb-6">
          <div className="carousel-inner relative">
            <img src="/assets/images/首页轮播1.png" alt="轮播图1" className="w-full h-[200px] object-cover" />
            <img src="/assets/images/首页轮播2.png" alt="轮播图2" className="w-full h-[200px] object-cover" />
            <img src="/assets/images/首页轮播3.png" alt="轮播图3" className="w-full h-[200px] object-cover" />
            <img src="/assets/images/首页轮播4.png" alt="轮播图4" className="w-full h-[200px] object-cover" />
          </div>
        </div>

        <div className="space-y-6">
          {/* 系统公告 */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              <h2 className="text-xl font-bold text-blue-800">系统公告</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              6月8日(周日) 早9-11点
              共鞋图修改出价结构，新增渠道 届时会暂停所有的出价新增及修改
            </p>
          </div>

          {/* 待办事项 */}
          <div className="bg-white rounded-xl shadow-sm">
            <TodoList />
          </div>

          {/* 活动和计算器区域 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-black rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <img src="/assets/images/生成蓝色风格图片.png" alt="活动图片" className="w-full h-[200px] object-cover" />
            </div>
            <div className="bg-black rounded-lg h-[200px]">
              <PriceCalculator />
            </div>
          </div>

          {/* 销售和结算数据 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <SalesData />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <SettlementData />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;