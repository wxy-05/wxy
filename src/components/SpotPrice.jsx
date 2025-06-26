// src/components/SpotPrice.jsx
import React, { useState } from 'react';
import TodoDetail from './TodoDetail';
import ReactECharts from 'echarts-for-react';

function SpotPrice() {
  const [showDetail, setShowDetail] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen pb-16 relative" style={{ background: 'url(/assets/images/背景色.png) center center / cover no-repeat' }}>
      <div className="p-4 backdrop-blur-sm bg-white/30 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center text-gray-800">共鞋</h1>
      </div>

      <div className="px-4 space-y-4">
        <div className="backdrop-blur-md bg-white/80 rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center mb-2">
            <h2 className="text-lg flex-1 font-semibold text-gray-800">现货出价待办</h2>
            <button className="text-gray-400 text-xl ml-2 hover:text-gray-600 transition-colors" onClick={() => setShowDetail(true)}>›</button>
          </div>
          <div className="flex justify-center">
            <img src="/assets/images/微信截图_20250618170029.png" alt="暂无待办" className="w-80 h-32 object-contain opacity-80" />
          </div>
          <p className="text-center text-cyan-600 mt-2 font-medium">现货出价暂无待办</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { title: '出价记录', value: '0', subtitle: '出价数量' },
            { title: '现货订单', value: '0', subtitle: '待发货' },
            { title: '入仓订单', value: '0', subtitle: '订单数量' }
          ].map((item, index) => (
            <div key={index} className="backdrop-blur-md bg-white/80 rounded-xl p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/90 flex flex-col items-center relative">
              <p className="text-gray-700">{item.title}</p>
              <p className="text-2xl font-bold text-gray-800 my-1">{item.value}</p>
              <p className="text-xs text-gray-500">{item.subtitle}</p>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xl hover:text-gray-600 transition-colors" onClick={() => setShowModal(true)}>›</button>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl mt-2 font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:opacity-90"
          onClick={() => setShowModal(true)}
        >
          + 新增出价
        </button>

        <div className="backdrop-blur-md bg-white/80 rounded-xl p-4 space-y-3 shadow-lg">
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

        <div className="backdrop-blur-md bg-white/80 rounded-xl p-4 shadow-lg">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            {[
              { value: '0', label: '出价数量' },
              { value: '0', label: 'sku数量' },
              { value: '¥0', label: '出价总市值' }
            ].map((item, index) => (
              <div key={index} className="text-center px-2">
                <p className="text-black text-xl font-bold">{item.value}</p>
                <p className="text-gray-600 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-200 mt-4">
            <div className="text-center px-2">
              <p className="text-black text-lg font-bold">0%</p>
              <p className="text-gray-600 text-xs">top最低价数量及占比</p>
            </div>
            <div className="text-center px-2">
              <p className="text-black text-lg font-bold">/%</p>
              <p className="text-gray-600 text-xs">全网最低价数量及占比</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/80 rounded-xl p-4 shadow-lg">
          <ReactECharts
            style={{ height: '260px' }}
            option={{
              tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 8,
                borderColor: '#eee',
                textStyle: { color: '#333' }
              },
              legend: {
                data: ['销售额', '点击数', '销量'],
                right: 20,
                top: 10,
                icon: 'circle',
                textStyle: { fontSize: 12, color: '#666' }
              },
              grid: { left: 40, right: 20, bottom: 30, top: 40 },
              xAxis: {
                type: 'category',
                data: ['06.12', '06.13', '06.14', '06.15', '06.16', '06.17'],
                axisLine: { lineStyle: { color: '#ddd' } },
                axisLabel: { color: '#666', fontSize: 12 }
              },
              yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisLabel: { color: '#666', fontSize: 12 },
                splitLine: { lineStyle: { color: '#eee' } }
              },
              series: [
                {
                  name: '销售额',
                  type: 'line',
                  data: [0, 0, 0, 0, 80, 210],
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 6,
                  lineStyle: { color: '#06b6d4', width: 3 },
                  itemStyle: { color: '#06b6d4' },
                  emphasis: { focus: 'series' }
                },
                {
                  name: '点击数',
                  type: 'line',
                  data: [0, 0, 0, 0, 1, 2],
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 6,
                  lineStyle: { color: '#0ea5e9', width: 3 },
                  itemStyle: { color: '#0ea5e9' },
                  emphasis: { focus: 'series' }
                },
                {
                  name: '销量',
                  type: 'line',
                  data: [0, 0, 0, 0, 1, 1],
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 6,
                  lineStyle: { color: '#3b82f6', width: 3 },
                  itemStyle: { color: '#3b82f6' },
                  emphasis: { focus: 'series' }
                }
              ]
            }}
          />
        </div>
      </div>

      {showDetail && <TodoDetail onClose={() => setShowDetail(false)} />}

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-[90vw] max-w-xl mx-auto p-6 flex flex-col items-center transform transition-all duration-300">
            <div className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">-该功能受限-</div>
            <div className="text-gray-700 text-lg leading-relaxed text-center mb-6">
              现货出价为特邀制，需入仓稳定经营2个月及以上，并且在共鞋仓稳定有货进出的商家，满足要求的商家，运营会与您联系，特邀您使用现货出价功能。
            </div>
            <div className="flex w-full border-t divide-x mt-2">
              <button
                className="flex-1 py-4 text-xl text-gray-700 font-normal rounded-bl-2xl hover:bg-gray-50 transition-colors"
                onClick={() => setShowModal(false)}
              >
                关闭弹窗
              </button>
              <button
                className="flex-1 py-4 text-xl text-cyan-500 font-normal rounded-br-2xl hover:bg-gray-50 transition-colors"
                onClick={() => setShowModal(false)}
              >
                前往入仓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpotPrice;