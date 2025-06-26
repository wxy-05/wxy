import React from 'react';

function SettlementAccount({ onClose }) {
    return (
        <div className="fixed inset-0 bg-white z-50">
            <div className="fixed top-0 left-0 right-0 flex justify-between items-center h-12 bg-white px-4 border-b">
                <button onClick={onClose} className="text-2xl">&lt;</button>
                <h1 className="text-xl">结算账号</h1>
                <div className="w-8"></div>
            </div>

            <div className="pt-16 px-4">
                <div className="bg-white">
                    <div className="mb-6">
                        <h2 className="text-lg mb-4">微信</h2>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg mb-4">支付宝</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">收款账号：</span>
                                <span>17343336434</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">真实姓名：</span>
                                <span>王莘裕</span>
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button className="text-cyan-500">修改 ›</button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg mb-4">银行卡</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">收款账号：</span>
                                <span>-</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">真实姓名：</span>
                                <span>-</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">开户银行：</span>
                                <span>-</span>
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button className="text-cyan-500">添加 ›</button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg mb-4">修改记录</h3>
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-2 px-4 text-left">修改类型</th>
                                    <th className="py-2 px-4 text-left">修改时间</th>
                                    <th className="py-2 px-4 text-left">修改内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4">支付宝</td>
                                    <td className="py-2 px-4">2025-06-17 20:55:14</td>
                                    <td className="py-2 px-4">
                                        <button className="text-cyan-500">查看内容</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">支付宝</td>
                                    <td className="py-2 px-4">2025-05-20 19:02:26</td>
                                    <td className="py-2 px-4">
                                        <button className="text-cyan-500">查看内容</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center text-gray-400 mt-4">已经到底了</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettlementAccount; 