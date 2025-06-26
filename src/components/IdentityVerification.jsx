import React from 'react';

const IdentityVerification = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col h-screen bg-white">
            {/* 頂部導航欄 */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                    <button onClick={onClose} className="mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <span className="text-lg font-medium">鞋多多實名認證</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 提示信息 */}
            <div className="flex items-center p-4 bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-500">信息僅用於實名認證，鞋多多保證您的信息安全。</span>
            </div>

            {/* 認證信息表單 */}
            <div className="flex-1 p-4">
                <div className="space-y-6">
                    <div className="flex justify-between items-center py-4 border-b">
                        <span className="text-gray-600">當前手機號</span>
                        <span>198*****886</span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b">
                        <span className="text-gray-600">實名認證信息</span>
                        <span>王*裕</span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b">
                        <span className="text-gray-600">身份證號</span>
                        <span>421126200******10</span>
                    </div>
                </div>

                {/* 認證記錄 */}
                <div className="mt-8">
                    <h2 className="text-lg font-medium mb-4">認證記錄</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">認證時間</span>
                            <span>2025-05-19 17:03:36</span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <span className="text-gray-600">王*裕</span>
                            <span>421126200******10</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部按鈕 */}
            <div className="p-4">
                <button className="w-full bg-teal-400 text-white py-3 rounded-lg text-lg">
                    重新認證
                </button>
            </div>
        </div>
    );
};

export default IdentityVerification; 