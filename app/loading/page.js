'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadingPage() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [pumpY, setPumpY] = useState(0);
    const [lastY, setLastY] = useState(0);
    const pumpRef = useRef(null);
    const containerRef = useRef(null);
    const [pumpStrokes, setPumpStrokes] = useState(0);

    useEffect(() => {
        if (progress >= 100) {
            setTimeout(() => {
                router.push('/phone');
            }, 1000);
        }
    }, [progress, router]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setLastY(e.clientY);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const currentY = e.clientY;
        const deltaY = lastY - currentY;

        // Only count as pump if movement is significant and downward
        if (Math.abs(deltaY) > 5) {
            // Update pump position for visual feedback
            const newPumpY = Math.max(-30, Math.min(30, pumpY - deltaY * 0.5));
            setPumpY(newPumpY);

            // Increase progress based on movement (extremely reduced efficiency - needs 20+ pumps)
            const progressIncrease = Math.abs(deltaY) * 0.02;
            setProgress(prev => Math.min(100, prev + progressIncrease));

            setLastY(currentY);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setPumpY(0); // Reset pump position
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, lastY, pumpY]);

    const balloonSize = 80 + (progress * 1.5); // Grows from 80 to responsive size
    const balloonColor = `hsl(${progress * 1.2}, 70%, 60%)`;

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4"
            style={{ userSelect: 'none' }}
        >
            <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 max-w-lg w-full">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-800">
                    Pump the Balloon! 🎈
                </h1>

                <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    Drag the pump handle up and down to inflate the balloon to 100%!
                </p>

                <div className="flex flex-col items-center">
                    {/* Balloon */}
                    <div className="mb-8 relative">
                        <div
                            className="rounded-full transition-all duration-200 flex items-center justify-center shadow-lg"
                            style={{
                                width: `${balloonSize}px`,
                                height: `${balloonSize * 1.2}px`,
                                backgroundColor: balloonColor,
                                borderRadius: '50% 50% 45% 45%',
                                transform: 'rotate(180deg)',
                            }}
                        >
                            <span
                                className="text-white font-bold text-lg sm:text-2xl"
                                style={{ transform: 'rotate(180deg)' }}
                            >
                                {Math.floor(progress)}%
                            </span>
                        </div>
                        {/* String */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-600"
                            style={{ height: '60px', top: '100%' }}
                        />
                    </div>

                    {/* Pump */}
                    <div
                        ref={pumpRef}
                        className="flex flex-col items-center cursor-grab active:cursor-grabbing"
                        onMouseDown={handleMouseDown}
                        style={{
                            transform: `translateY(${pumpY}px)`,
                            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                        }}
                    >
                        {/* Pump Handle */}
                        <div className="w-10 sm:w-12 h-16 sm:h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg border-2 sm:border-4 border-gray-900 flex items-center justify-center mb-2">
                            <div className="w-6 sm:w-8 h-2 sm:h-3 bg-red-500 rounded"></div>
                        </div>

                        {/* Pump Rod */}
                        <div className="w-2 sm:w-3 h-12 sm:h-16 bg-gray-600"></div>

                        {/* Pump Body */}
                        <div className="w-20 sm:w-24 h-24 sm:h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg border-2 sm:border-4 border-gray-800 flex items-center justify-center">
                            <div className="text-white font-bold text-sm sm:text-base">PUMP</div>
                        </div>

                        {/* Pump Base */}
                        <div className="w-24 sm:w-32 h-3 sm:h-4 bg-gray-800 rounded-b-lg"></div>
                    </div>

                    <div className="mt-8 w-full">
                        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-300 flex items-center justify-center text-white text-sm font-bold"
                                style={{ width: `${progress}%` }}
                            >
                                {progress > 10 && `${Math.floor(progress)}%`}
                            </div>
                        </div>
                    </div>

                    {progress < 100 && (
                        <p className="text-center text-gray-600 mt-4 text-sm">
                            Keep pumping! {Math.floor(progress)}% complete
                        </p>
                    )}

                    {progress >= 100 && (
                        <p className="text-center text-green-600 mt-4 text-lg font-bold animate-pulse">
                            🎉 Fully inflated! Redirecting...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
