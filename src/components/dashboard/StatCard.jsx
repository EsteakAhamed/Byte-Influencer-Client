import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

const StatCard = ({ icon: Icon, value, label, color = 'blue', trend, suffix = '' }) => {
    // Only animate numbers, pass strings through as-is
    const numericValue = typeof value === 'number' ? value : parseInt(value) || 0;
    const displayValue = useCountUp(numericValue, 1500);
    
    // Preserve formatted strings (like "2.5M") but animate raw numbers
    const formattedValue = typeof value === 'string' && value.includes('%') 
        ? displayValue + '%'
        : typeof value === 'string' && (value.includes('K') || value.includes('M'))
            ? value // Keep formatted strings as-is
            : displayValue + suffix;

    const colorClasses = {
        blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
        emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
        rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
        teal: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
        indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
        cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
    };

    return (
        <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="card-body p-5">
                <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${colorClasses[color] || colorClasses.blue}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 text-sm font-medium ${
                            trend.direction === 'up' ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                            {trend.direction === 'up' ? (
                                <TrendingUp className="w-4 h-4" />
                            ) : (
                                <TrendingDown className="w-4 h-4" />
                            )}
                            {trend.value}%
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <h3 className="text-2xl font-bold text-base-content">
                        {formattedValue}
                    </h3>
                    <p className="text-sm text-base-content/60 mt-1">{label}</p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
