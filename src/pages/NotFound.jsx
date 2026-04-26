import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 blur-3xl bg-emerald-500/20 rounded-full"></div>
                    <div className="relative bg-base-100 p-8 rounded-3xl border border-base-content/10 shadow-2xl shadow-emerald-500/10">
                        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-12">
                            <FiSearch className="w-10 h-10 text-emerald-600 -rotate-12" />
                        </div>
                        <h1 className="text-7xl font-black text-base-content mb-2 tracking-tighter">
                            404
                        </h1>
                        <p className="text-xl font-bold text-base-content/90 mb-4">
                            Oops! Page not found.
                        </p>
                        <p className="text-base-content/60 mb-8 leading-relaxed">
                            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1 active:translate-y-0"
                        >
                            <FiHome className="w-5 h-5" />
                            Go Back Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
