import { FiHeart, FiEye, FiTrendingUp } from 'react-icons/fi';

const MetricsBox = ({ metrics }) => {
    const formatNum = (n) => {
        const num = Number(n || 0);
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toLocaleString();
    };

    const formatRate = (r) => {
        const rate = Number(r || 0);
        return `${rate.toFixed(2)}%`;
    };

    return (
        <div className="text-sm space-y-2">
            {/* Likes */}
            <div className="flex items-center gap-2">
                <FiHeart className="w-4 h-4 text-pink-500 flex-shrink-0" />
                <span className="text-base-content/60">Avg Likes</span>
                <span className="text-base-content font-semibold">{formatNum(metrics?.avgLikes)}</span>
            </div>

            {/* Views */}
            <div className="flex items-center gap-2">
                <FiEye className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-base-content/60">Avg Views</span>
                <span className="text-base-content font-semibold">{formatNum(metrics?.avgViews)}</span>
            </div>

            {/* Engagement Rate */}
            <div className="flex items-center gap-2">
                <FiTrendingUp className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-base-content/60">ER</span>
                <span className="text-base-content font-semibold">{formatRate(metrics?.engagementRate)}</span>
            </div>
        </div>
    );
};

export default MetricsBox;
