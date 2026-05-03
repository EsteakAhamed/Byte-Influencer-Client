import React from 'react';
import { Info } from 'lucide-react';

const ChartCard = ({ title, subtitle, children, className = '' }) => {
    return (
        <div className={`card bg-base-100 border border-base-300 shadow-md ${className}`}>
            <div className="card-body p-5">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-base-content">{title}</h3>
                        {subtitle && (
                            <p className="text-sm text-base-content/50 mt-0.5">{subtitle}</p>
                        )}
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-base-200 transition-colors" title="More info">
                        <Info className="w-4 h-4 text-base-content/40" />
                    </button>
                </div>
                {/* Min dimensions prevent Recharts errors when container collapses */}
                <div className="w-full h-80 min-w-32 min-h-32">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ChartCard;
