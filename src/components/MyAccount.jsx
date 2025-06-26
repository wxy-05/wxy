// src/components/MyAccount.jsx
import React, { useState, useEffect } from 'react';
import DepositDetails from './DepositDetails';
import IdentityVerification from './IdentityVerification';
import SettlementAccount from './SettlementAccount';
import ExpressDeliveryFee from './ExpressDeliveryFee';
import DepositRefund from './DepositRefund';

function MyAccount() {
  const [showDepositDetails, setShowDepositDetails] = useState(false);
  const [showIdentityVerification, setShowIdentityVerification] = useState(false);
  const [showSettlementAccount, setShowSettlementAccount] = useState(false);
  const [showExpressDeliveryFee, setShowExpressDeliveryFee] = useState(false);
  const [showDepositRefund, setShowDepositRefund] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen pb-16" style={{ background: 'url(/assets/images/背景色.png) center center / cover no-repeat fixed' }}>
      <div className={`fixed top-0 left-0 right-0 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
        } flex justify-between items-center h-16 px-6 z-50`}>
        <div></div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">共鞋</h1>
        <div className="w-8"></div>
      </div>

      <div className="pt-20">
        <div className="p-6">
          <div className="flex items-center bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-lg">
            <img
              src="/assets/images/puma.jpg"
              alt="Avatar"
              className="w-20 h-20 rounded-full mr-6 border-4 border-white shadow-md transition-transform hover:scale-105"
            />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">懿懿</h2>
              <p className="text-gray-600 mt-1">198884938886</p>
            </div>
          </div>
        </div>

        <div className="px-6">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 relative cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg" onClick={() => setShowDepositDetails(true)}>
              <p className="text-gray-600">出价保证金</p>
              <p className="text-2xl font-bold mt-2">¥0</p>
              <p className="text-xs text-gray-500 mt-1">已占用¥0</p>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl transition-transform group-hover:translate-x-1">›</span>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 relative cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg" onClick={() => setShowExpressDeliveryFee(true)}>
              <p className="text-gray-600">快递费</p>
              <p className="text-2xl font-bold mt-2">¥0</p>
              <p className="text-xs text-gray-500 mt-1">已占用¥0</p>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl transition-transform group-hover:translate-x-1">›</span>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 relative cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg" onClick={() => setShowDepositRefund(true)}>
              <p className="text-gray-600">退货保证金</p>
              <p className="text-2xl font-bold mt-2">¥0</p>
              <p className="text-xs text-gray-500 mt-1">已占用¥0</p>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl transition-transform group-hover:translate-x-1">›</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: "👥", text: "结算账号", action: () => setShowSettlementAccount(true), status: "前往设置" },
              { icon: "📱", text: "推送授权", status: "开启教程" },
              { icon: "🆔", text: "实名认证", action: () => setShowIdentityVerification(true), status: "已认证", statusColor: "text-cyan-500" },
              { icon: "🔒", text: "查看签署" },
              { icon: "🔐", text: "修改密码" },
              { icon: "📋", text: "结算单" },
              { icon: "📄", text: "调货下单" },
            ].map((item, index) => (
              <button
                key={index}
                className="flex justify-between items-center w-full p-5 bg-white/60 backdrop-blur-md rounded-2xl transform transition-all hover:scale-[1.02] hover:shadow-lg"
                onClick={item.action}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-4">{item.icon}</span>
                  <span className="text-gray-700">{item.text}</span>
                </div>
                <span className={item.statusColor || "text-gray-400"}>
                  {item.status || "›"}
                </span>
              </button>
            ))}

            <div className="flex justify-between items-center w-full p-5 bg-white/60 backdrop-blur-md rounded-2xl">
              <div className="flex items-center">
                <span className="text-2xl mr-4">ℹ️</span>
                <span className="text-gray-700">小程序版本</span>
              </div>
              <span className="text-gray-400">1.2.1</span>
            </div>

            <button className="w-full py-5 text-red-500 font-medium bg-white/60 backdrop-blur-md rounded-2xl mt-6 transform transition-all hover:scale-[1.02] hover:shadow-lg">
              退出登录
            </button>
          </div>
        </div>
      </div>

      {showDepositDetails && (
        <DepositDetails onClose={() => setShowDepositDetails(false)} />
      )}

      {showIdentityVerification && (
        <IdentityVerification onClose={() => setShowIdentityVerification(false)} />
      )}

      {showSettlementAccount && (
        <SettlementAccount onClose={() => setShowSettlementAccount(false)} />
      )}

      {showExpressDeliveryFee && (
        <ExpressDeliveryFee onClose={() => setShowExpressDeliveryFee(false)} />
      )}

      {showDepositRefund && (
        <DepositRefund onClose={() => setShowDepositRefund(false)} />
      )}
    </div>
  );
}

export default MyAccount;