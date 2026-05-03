import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, TrendingUp, BarChart2, Calendar, ArrowRight, User, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import toast from 'react-hot-toast';
import StatCard from '../../components/dashboard/StatCard';
import ChartCard from '../../components/dashboard/ChartCard';
import { formatFollowers, formatDate } from '../../utils/formatNumbers';
import { useAuth } from '../../context/AuthContext';
import { fetchUserDashboard } from '../../services/dashboardService';

const PLATFORM_COLORS = {
    Instagram: '#E1306C',
    YouTube: '#FF0000',
    TikTok: '#000000',
    Facebook: '#1877F2'
};

const STATUS_COLORS = {
    Active: '#22C55E',
    Inactive: '#EF4444'
};

const UserDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    // Load dashboard data once on mount
    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const response = await fetchUserDashboard();
            if (response?.success) {
                setData(response.data);
            }
        } catch (err) {
            toast.error(err.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // Format date for header display
    const today = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex items-center gap-3 text-base-content/50">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="font-medium">Loading dashboard...</span>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-base-content/50 mb-4">Failed to load dashboard data</p>
                    <button onClick={loadDashboard} className="btn btn-primary">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const { stats, platformBreakdown, recentInfluencers, recentClients, clientBudgetTotal, engagementTrend, influencersByNiche } = data;

    // Transform API data into format Recharts expects
    const platformChartData = platformBreakdown?.map(p => ({
        name: p.platform,
        count: p.count,
        followers: p.totalFollowers
    })) || [];

    const statusChartData = [
        { name: 'Active', value: stats.activeInfluencers || 0 },
        { name: 'Inactive', value: stats.inactiveInfluencers || 0 }
    ];

    const engagementChartData = engagementTrend || [];

    const nicheChartData = (influencersByNiche || []).slice(0, 6);

    // Show empty state prompt if user hasn't added any influencers or clients
    const hasNoData = stats.totalInfluencers === 0 && stats.totalClients === 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-base-content">
                            Welcome back, {user?.username || 'User'} 👋
                        </h1>
                        <p className="text-base-content/60 mt-1">
                            Here's an overview of your influencer portfolio
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-base-content/50 bg-base-200 px-4 py-2 rounded-lg">
                        <Calendar className="w-4 h-4" />
                        {today}
                    </div>
                </div>
            </div>

            {hasNoData ? (
                /* Empty State */
                <div className="card bg-base-100 border border-base-300 p-12 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <User className="w-8 h-8 text-base-content/40" />
                        </div>
                        <h2 className="text-xl font-semibold text-base-content mb-2">
                            Get Started with Your Dashboard
                        </h2>
                        <p className="text-base-content/60 mb-6">
                            You haven't added any influencers or clients yet. Start building your portfolio today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/influencers" className="btn btn-primary gap-2">
                                <Users className="w-4 h-4" />
                                Add Influencers
                            </Link>
                            <Link to="/clients" className="btn btn-outline gap-2">
                                <Briefcase className="w-4 h-4" />
                                Add Clients
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard 
                            icon={Users} 
                            value={stats.totalInfluencers} 
                            label="Influencers" 
                            color="blue" 
                        />
                        <StatCard 
                            icon={Briefcase} 
                            value={stats.totalClients} 
                            label="Clients" 
                            color="purple" 
                        />
                        <StatCard 
                            icon={TrendingUp} 
                            value={formatFollowers(stats.totalFollowers)} 
                            label="Total Followers" 
                            color="emerald" 
                        />
                        <StatCard 
                            icon={BarChart2} 
                            value={stats.avgEngagementRate} 
                            label="Avg Engagement" 
                            color="orange"
                            suffix="%" 
                        />
                    </div>

                    {/* Charts Row 1: Platform Breakdown & Status */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                        {/* Platform Breakdown Bar Chart */}
                        <div className="lg:col-span-3">
                            <ChartCard title="Influencers by Platform" subtitle="Distribution across social media platforms">
                                <ResponsiveContainer width="100%" height={320}>
                                    <BarChart data={platformChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--fallback-bc)" strokeOpacity={0.1} />
                                        <XAxis 
                                            dataKey="name" 
                                            tick={{ fill: 'var(--fallback-bc)', fontSize: 12 }}
                                            axisLine={{ stroke: 'var(--fallback-bc)', strokeOpacity: 0.2 }}
                                        />
                                        <YAxis 
                                            tick={{ fill: 'var(--fallback-bc)', fontSize: 12 }}
                                            axisLine={{ stroke: 'var(--fallback-bc)', strokeOpacity: 0.2 }}
                                        />
                                        <RechartsTooltip 
                                            contentStyle={{ 
                                                backgroundColor: 'var(--fallback-b1)', 
                                                border: '1px solid var(--fallback-bc)',
                                                borderRadius: '8px'
                                            }}
                                            formatter={(value, name, props) => [
                                                `${value} influencers`,
                                                `${formatFollowers(props.payload.followers)} followers`
                                            ]}
                                        />
                                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                            {platformChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={PLATFORM_COLORS[entry.name] || '#3B82F6'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartCard>
                        </div>

                        {/* Active vs Inactive Pie Chart */}
                        <div className="lg:col-span-2">
                            <ChartCard title="Influencer Status" subtitle="Active vs Inactive breakdown">
                                <ResponsiveContainer width="100%" height={320}>
                                    <PieChart>
                                        <Pie
                                            data={statusChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {statusChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip 
                                            contentStyle={{ 
                                                backgroundColor: 'var(--fallback-b1)', 
                                                border: '1px solid var(--fallback-bc)',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex justify-center gap-6 -mt-4">
                                    {statusChartData.map((item) => (
                                        <div key={item.name} className="flex items-center gap-2">
                                            <div 
                                                className="w-3 h-3 rounded-full" 
                                                style={{ backgroundColor: STATUS_COLORS[item.name] }}
                                            />
                                            <span className="text-sm text-base-content/70">
                                                {item.name}: {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </ChartCard>
                        </div>
                    </div>

                    {/* Engagement Trend Line Chart */}
                    <div className="mb-6">
                        <ChartCard title="Engagement Rate Trend" subtitle="Last 6 months average engagement">
                            <ResponsiveContainer width="100%" height={320}>
                                <LineChart data={engagementChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--fallback-bc)" strokeOpacity={0.1} />
                                    <XAxis 
                                        dataKey="month" 
                                        tick={{ fill: 'var(--fallback-bc)', fontSize: 12 }}
                                        axisLine={{ stroke: 'var(--fallback-bc)', strokeOpacity: 0.2 }}
                                    />
                                    <YAxis 
                                        tick={{ fill: 'var(--fallback-bc)', fontSize: 12 }}
                                        axisLine={{ stroke: 'var(--fallback-bc)', strokeOpacity: 0.2 }}
                                        unit="%"
                                    />
                                    <RechartsTooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'var(--fallback-b1)', 
                                            border: '1px solid var(--fallback-bc)',
                                            borderRadius: '8px'
                                        }}
                                        formatter={(value) => [`${value}%`, 'Avg Engagement']}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="avgEngagement" 
                                        stroke="#3B82F6" 
                                        strokeWidth={3}
                                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>

                    {/* Niche Distribution */}
                    <div className="mb-6">
                        <ChartCard title="Influencers by Niche" subtitle="Top content categories">
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart 
                                    data={nicheChartData} 
                                    layout="vertical"
                                    margin={{ top: 10, right: 10, left: 60, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--fallback-bc)" strokeOpacity={0.1} horizontal={false} />
                                    <XAxis 
                                        type="number" 
                                        tick={{ fill: 'var(--fallback-bc)', fontSize: 12 }}
                                        axisLine={{ stroke: 'var(--fallback-bc)', strokeOpacity: 0.2 }}
                                    />
                                    <YAxis 
                                        type="category" 
                                        dataKey="niche"
                                        tick={{ fill: 'var(--fallback-bc)', fontSize: 12 }}
                                        axisLine={{ stroke: 'var(--fallback-bc)', strokeOpacity: 0.2 }}
                                        width={80}
                                    />
                                    <RechartsTooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'var(--fallback-b1)', 
                                            border: '1px solid var(--fallback-bc)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#3B82F6" fillOpacity={0.8} radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Influencers */}
                        <div className="card bg-base-100 border border-base-300 shadow-md">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-base-content">Recent Influencers</h3>
                                    <Link to="/influencers" className="text-sm text-primary hover:underline flex items-center gap-1">
                                        View All <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                {recentInfluencers?.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentInfluencers.map((inf) => (
                                            <div key={inf._id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                                    {inf.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-base-content truncate">{inf.name}</p>
                                                    <p className="text-sm text-base-content/50">@{inf.handle}</p>
                                                </div>
                                                <div className="flex gap-1">
                                                    {inf.platforms?.slice(0, 2).map((platform) => (
                                                        <span 
                                                            key={platform} 
                                                            className="w-2 h-2 rounded-full" 
                                                            style={{ backgroundColor: PLATFORM_COLORS[platform] }}
                                                            title={platform}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-base-content/50 text-center py-8">No influencers yet</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Clients */}
                        <div className="card bg-base-100 border border-base-300 shadow-md">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-base-content">Recent Clients</h3>
                                    <Link to="/clients" className="text-sm text-primary hover:underline flex items-center gap-1">
                                        View All <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                {recentClients?.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentClients.map((client) => (
                                            <div key={client._id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600">
                                                    <Briefcase className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-base-content truncate">{client.name}</p>
                                                    <p className="text-sm text-base-content/50 truncate">{client.campaign}</p>
                                                </div>
                                                <span className={`badge ${client.status === 'Active' ? 'badge-success' : 'badge-ghost'}`}>
                                                    {client.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-base-content/50 text-center py-8">No clients yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDashboard;
