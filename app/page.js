'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <button
        onClick={() => router.push('/login')}
        className="px-6 sm:px-8 py-3 sm:py-4 text-xl sm:text-2xl font-bold bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors shadow-xl"
      >
        Enter the Chaos 😈
      </button>
    </div>
  );
}
