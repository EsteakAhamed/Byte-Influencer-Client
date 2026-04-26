import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-base-100/20 backdrop-blur-md transition-opacity duration-300 animate-in fade-in">
            <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-base-100/40 border border-base-content/10 shadow-2xl">
                <span className="loading loading-spinner loading-lg text-emerald-600"></span>
                <p className="text-sm font-medium text-base-content/70 animate-pulse">
                    Loading Byte...
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
