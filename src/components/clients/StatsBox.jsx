import { FiDollarSign, FiUsers, FiActivity, FiCalendar, FiTarget } from 'react-icons/fi';

const StatsBox = ({ stats }) => {
    if (!stats) return <span className="text-gray-400">-</span>;

    const formatNumber = (num) => {
        if (!num) return '0';
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
        return num.toString();
    };

    const formatCurrency = (num) => {
        if (!num) return '$0';
        if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
        return `$${num}`;
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="text-xs space-y-1">
            <div className="flex items-center gap-2">
                <FiDollarSign className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">Budget: {formatCurrency(stats.budget)}</span>
            </div>
            <div className="flex items-center gap-2">
                <FiUsers className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">Influencers: {stats.influencersCount || 0}</span>
            </div>
            <div className="flex items-center gap-2">
                <FiActivity className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">Reach: {formatNumber(stats.reach)}</span>
            </div>
            <div className="flex items-center gap-2">
                <FiTarget className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">ER: {stats.engagementRate?.toFixed(1) || 0}%</span>
            </div>
            {stats.campaignDuration?.startDate && (
                <div className="flex items-center gap-2">
                    <FiCalendar className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">
                        {formatDate(stats.campaignDuration.startDate)} - {formatDate(stats.campaignDuration.endDate)}
                    </span>
                </div>
            )}
            <div className="flex items-center gap-2">
                <span className="text-gray-500">Conversions:</span>
                <span className="text-gray-600">{stats.conversions || 0}</span>
            </div>
        </div>
    );
};

export default StatsBox;
