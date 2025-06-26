// src/components/SalesData.jsx
import React, { useState } from 'react';
import SalesDetail from './SalesDetail';

function SalesData() {
  // 获取当前时间并格式化
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${month}-${day} ${hours}:${minutes}`;

  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3>当月销售数据</h3>
          <button className="text-gray-400 text-xl" onClick={() => setShowDetail(true)}>›</button>
        </div>
        <p className="text-xs text-gray-500">统计至：{currentTime}</p>
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span>订单量</span>
            <span className="font-bold">0</span>
          </div>
          <div className="text-xs text-cyan-500">上月 2</div>
          <div className="flex justify-between mt-2">
            <span>销售额</span>
            <span className="font-bold">¥0</span>
          </div>
          <div className="text-xs text-cyan-500">上月 ¥1159</div>
        </div>
      </div>
      {showDetail && <SalesDetail onClose={() => setShowDetail(false)} />}
    </>
  );
}

export default SalesData;