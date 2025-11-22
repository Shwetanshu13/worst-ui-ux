'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeField, setActiveField] = useState('username');
    const [keyboard, setKeyboard] = useState([]);
    const [error, setError] = useState('');

    const CORRECT_USERNAME = 'upvision';
    const CORRECT_PASSWORD = 'nitdelhi';

    // Generate random keyboard layout
    const generateKeyboard = () => {
        const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const numbers = '0123456789'.split('');
        const allKeys = [...letters, ...numbers];

        // Shuffle the array
        for (let i = allKeys.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allKeys[i], allKeys[j]] = [allKeys[j], allKeys[i]];
        }

        // Split into rows
        const rows = [];
        let index = 0;
        rows.push(allKeys.slice(index, index + 10));
        index += 10;
        rows.push(allKeys.slice(index, index + 10));
        index += 10;
        rows.push(allKeys.slice(index, index + 10));
        index += 10;
        rows.push(allKeys.slice(index));

        return rows;
    };

    useEffect(() => {
        setKeyboard(generateKeyboard());
    }, []);

    const handleKeyPress = (key) => {
        if (activeField === 'username') {
            setUsername(prev => prev + key);
        } else {
            setPassword(prev => prev + key);
        }

        // Regenerate keyboard after each key press
        setTimeout(() => {
            setKeyboard(generateKeyboard());
        }, 100);
    };

    const handleBackspace = () => {
        if (activeField === 'username') {
            setUsername(prev => prev.slice(0, -1));
        } else {
            setPassword(prev => prev.slice(0, -1));
        }

        // Regenerate keyboard
        setTimeout(() => {
            setKeyboard(generateKeyboard());
        }, 100);
    };

    const handleLogin = () => {
        if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
            router.push('/loading');
        } else {
            setError('Invalid credentials! Try again...');
            setTimeout(() => setError(''), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
                    Welcome to the Worst Login Ever! 😈
                </h1>

                <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    Hint: Keyboard is disabled. Use the virtual keyboard below (it changes after each key!)
                </p>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username {activeField === 'username' && '(Active)'}
                        </label>
                        <input
                            type="text"
                            value={username}
                            onFocus={() => setActiveField('username')}
                            onKeyDown={(e) => e.preventDefault()}
                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-black ${activeField === 'username' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                            placeholder="Click here to type username"
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password {activeField === 'password' && '(Active)'}
                        </label>
                        <input
                            type="password"
                            value={password}
                            onFocus={() => setActiveField('password')}
                            onKeyDown={(e) => e.preventDefault()}
                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-black ${activeField === 'password' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                            placeholder="Click here to type password"
                            readOnly
                        />
                    </div>
                </div>

                {/* Virtual Keyboard */}
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-center text-sm text-gray-600 mb-3">
                        Virtual Keyboard (Randomizes After Each Key Press!)
                    </p>

                    <div className="space-y-2">
                        {keyboard.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center gap-1">
                                {row.map((key, keyIndex) => (
                                    <button
                                        key={`${rowIndex}-${keyIndex}`}
                                        onClick={() => handleKeyPress(key)}
                                        className="w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base bg-white border-2 border-gray-300 rounded hover:bg-blue-100 hover:border-blue-400 transition-all font-semibold text-gray-800"
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-2 mt-3">
                        <button
                            onClick={handleBackspace}
                            className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-semibold"
                        >
                            ⌫ Backspace
                        </button>
                        <button
                            onClick={() => {
                                if (activeField === 'username') {
                                    setUsername(prev => prev + ' ');
                                } else {
                                    setPassword(prev => prev + ' ');
                                }
                                setTimeout(() => setKeyboard(generateKeyboard()), 100);
                            }}
                            className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-semibold"
                        >
                            Space
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-lg shadow-lg"
                >
                    Login (Good Luck! 😏)
                </button>

                {/* Subtle credentials hint */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400 italic">
                        psst... u:upvision p:nitdelhi
                    </p>
                </div>
            </div>
        </div>
    );
}
