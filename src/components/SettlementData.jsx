// src/components/SettlementData.jsx
import React, { useState } from 'react';
import SettlementDetail from './SettlementDetail';

function SettlementData() {
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
          <h3>结算单</h3>
          <button className="text-gray-400 text-xl" onClick={() => setShowDetail(true)}>›</button>
        </div>
        <p className="text-xs text-gray-500">统计至：{currentTime}</p>
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span>全部</span>
            <span className="font-bold">2</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>可结算</span>
            <span className="font-bold">0</span>
          </div>
        </div>
      </div>
      {showDetail && <SettlementDetail onClose={() => setShowDetail(false)} />}
    </>
  );
}

export default SettlementData;