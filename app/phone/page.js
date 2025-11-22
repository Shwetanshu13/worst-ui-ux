'use client';

import { useState } from 'react';

export default function PhonePage() {
    const [phoneNumber, setPhoneNumber] = useState(1000000000);
    const [submitted, setSubmitted] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const handleIncrement = () => {
        setPhoneNumber(prev => prev + 1);
        setClickCount(prev => prev + 1);
    };

    const handleDecrement = () => {
        setPhoneNumber(prev => prev - 1);
        setClickCount(prev => prev + 1);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 max-w-md w-full">
                {!submitted ? (
                    <>
                        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-800">
                            Enter Your Phone Number 📱
                        </h1>

                        <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                            Use the UP/DOWN buttons to reach your phone number. No typing allowed! 😈
                        </p>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={formatNumber(phoneNumber)}
                                readOnly
                                className="w-full px-4 py-3 text-xl sm:text-2xl font-mono text-center border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none text-black"
                            />
                        </div>

                        <div className="flex gap-2 sm:gap-4 mb-6">
                            <button
                                onClick={handleDecrement}
                                className="flex-1 py-3 sm:py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold text-lg sm:text-xl shadow-lg active:scale-95 transform"
                            >
                                ▼ DOWN
                            </button>
                            <button
                                onClick={handleIncrement}
                                className="flex-1 py-3 sm:py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-lg sm:text-xl shadow-lg active:scale-95 transform"
                            >
                                ▲ UP
                            </button>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all font-bold text-lg shadow-lg"
                        >
                            Submit Phone Number
                        </button>

                        <div className="mt-4 text-center text-sm text-gray-500">
                            Clicks so far: {clickCount}
                        </div>

                        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                            <p className="text-xs text-yellow-800 text-center">
                                💡 Tip: A typical phone number is 10 digits. You're starting at 1,000,000,000!
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                            Congratulations!
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 mb-4">
                            You survived the worst UI/UX experience!
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                            <p className="text-sm text-gray-600 mb-2">Your phone number:</p>
                            <p className="text-xl sm:text-2xl font-mono font-bold text-gray-800">
                                {formatNumber(phoneNumber)}
                            </p>
                        </div>
                        <p className="text-sm text-gray-500">
                            Total clicks: {clickCount}
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-bold shadow-lg"
                        >
                            Start Over (if you dare!)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
