// app/welcome-content.tsx
'use client'; // Assuming it needs client features

import Link from 'next/link';

export default function WelcomeComponent() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-4xl font-extrabold mb-4">Welcome Back to Parable</h1>
            <p className="text-lg mb-8 text-gray-400">
                Ready to continue your journey?
            </p>
            
            <div className="space-x-4">
                <Link 
                    href="/login" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                >
                    Log In
                </Link>
                <Link 
                    href="/signup" 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}