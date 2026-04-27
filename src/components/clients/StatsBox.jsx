import { FiDollarSign, FiUsers, FiActivity, FiCalendar, FiTarget, FiTrendingUp } from 'react-icons/fi';

const StatsBox = ({ stats }) => {
    if (!stats) return <span className="text-base-content/30">—</span>;

    const formatNumber = (num) => {
        if (!num) return '0';
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
        return num.toLocaleString();
    };

    const formatCurrency = (num) => {
        if (!num) return '$0';
        if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
        return `$${num.toLocaleString()}`;
    };

    const formatDate = (date) => {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="text-xs space-y-1.5">
            <div className="flex items-center gap-2">
                <FiDollarSign className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="text-base-content/50 font-medium">Budget:</span>
                <span className="text-base-content font-bold">{formatCurrency(stats.budget)}</span>
            </div>
            <div className="flex items-center gap-2">
                <FiUsers className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                <span className="text-base-content/50 font-medium">Influencers:</span>
                <span className="text-base-content font-bold">{stats.influencersCount || 0}</span>
            </div>
            <div className="flex items-center gap-2">
                <FiTrendingUp className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                <span className="text-base-content/50 font-medium">Reach:</span>
                <span className="text-base-content font-bold">{formatNumber(stats.reach)}</span>
            </div>
            <div className="flex items-center gap-2">
                <FiActivity className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                <span className="text-base-content/50 font-medium">ER:</span>
                <span className="text-base-content font-bold">{stats.engagementRate?.toFixed(1) || 0}%</span>
            </div>
            {stats.campaignDuration?.startDate && (
                <div className="flex items-center gap-2">
                    <FiCalendar className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                    <span className="text-base-content/60">
                        {formatDate(stats.campaignDuration.startDate)} – {formatDate(stats.campaignDuration.endDate)}
                    </span>
                </div>
            )}
            <div className="flex items-center gap-2 pt-0.5 border-t border-base-content/5 mt-1">
                <FiTarget className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />
                <span className="text-base-content/50 font-medium">Conversions:</span>
                <span className="text-base-content font-bold">{(stats.conversions || 0).toLocaleString()}</span>
            </div>
        </div>
    );
};

export default StatsBox;
