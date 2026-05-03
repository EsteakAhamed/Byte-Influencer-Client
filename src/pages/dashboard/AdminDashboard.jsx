import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Star, Briefcase, Globe, CheckCircle, TrendingUp, Shield, ArrowRight, User, Loader2, Crown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import toast from 'react-hot-toast';
import StatCard from '../../components/dashboard/StatCard';
import ChartCard from '../../components/dashboard/ChartCard';
import { formatFollowers, formatBudget, formatDate } from '../../utils/formatNumbers';
import { useAuth } from '../../context/AuthContext';
import { fetchAdminDashboard } from '../../services/dashboardService';

const PLATFORM_COLORS = {
    Instagram: '#E1306C',
    YouTube: '#FF0000',
    TikTok: '#69C9D0',
    Facebook: '#1877F2'
};

const ROLE_COLORS = {
    user: '#3B82F6',
    admin: '#F59E0B'
};

const STATUS_COLORS = {
    Active: '#22C55E',
    Inactive: '#EF4444'
};

const AdminDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const response = await fetchAdminDashboard();
            if (response?.success) {
                setData(response.data);
            }
        } catch (err) {
            toast.error(err.message || 'Failed to load admin dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex items-center gap-3 text-base-content/50">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="font-medium">Loading admin dashboard...</span>
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

    const { 
        stats, 
        platformBreakdown, 
        topUsersByInfluencers, 
        recentUsers, 
        recentInfluencers, 
        recentClients,
        userGrowthTrend, 
        influencerGrowthTrend, 
        clientsByStatus, 
        influencersByNiche 
    } = data;

    // Prepare chart data
    const platformChartData = platformBreakdown?.map(p => ({
        name: p.platform,
        count: p.count,
        followers: p.totalFollowers
    })) || [];

    const roleChartData = [
        { name: 'Users', value: stats.regularUserCount || 0 },
        { name: 'Admins', value: stats.adminCount || 0 }
    ];

    const clientStatusChartData = clientsByStatus || [];

    const growthChartData = (userGrowthTrend || []).map((item, index) => ({
        month: item.month,
        newUsers: item.newUsers,
        newInfluencers: influencerGrowthTrend?.[index]?.newInfluencers || 0
    }));

    const nicheChartData = (influencersByNiche || []).slice(0, 8);

    const topUsersChartData = (topUsersByInfluencers || []).slice(0, 10);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Admin Welcome Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-500/10 rounded-xl">
                            <Shield className="w-8 h-8 text-amber-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-base-content flex items-center gap-2">
                                Admin Dashboard
                                <Crown className="w-6 h-6 text-amber-500" />
                            </h1>
                            <p className="text-base-content/60 mt-1">
                                Platform overview across all users
                            </p>
                        </div>
                    </div>
                    <span className="badge badge-lg badge-primary gap-2 px-4 py-3">
                        <Crown className="w-4 h-4" />
                        Admin Account
                    </span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
                <StatCard 
                    icon={Users} 
                    value={stats.totalUsers} 
                    label="Registered Users" 
                    color="blue" 
                />
                <StatCard 
                    icon={Star} 
                    value={stats.totalInfluencers} 
                    label="All Influencers" 
                    color="purple" 
                />
                <StatCard 
                    icon={Briefcase} 
                    value={stats.totalClients} 
                    label="All Clients" 
                    color="orange" 
                />
                <StatCard 
                    icon={Globe} 
                    value={formatFollowers(stats.totalFollowers)} 
                    label="Platform Reach" 
                    color="emerald" 
                />
                <StatCard 
                    icon={CheckCircle} 
                    value={stats.activeClients} 
                    label="Active Clients" 
                    color="teal" 
                />
                <StatCard 
                    icon={TrendingUp} 
                    value={stats.avgEngagementRate} 
                    label="Avg Engagement" 
                    color="rose"
                    suffix="%" 
                />
            </div>

            {/* Three Column Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Platform Distribution Pie Chart */}
                <ChartCard title="Platform Distribution" subtitle="Across all users">
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={platformChartData}
                                cx="50%"
                                cy="45%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="count"
                            >
                                {platformChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PLATFORM_COLORS[entry.name] || '#3B82F6'} />
                                ))}
                            </Pie>
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
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-3 -mt-2">
                        {platformChartData.map((item) => (
                            <div key={item.name} className="flex items-center gap-1.5">
                                <div 
                                    className="w-2.5 h-2.5 rounded-full" 
                                    style={{ backgroundColor: PLATFORM_COLORS[item.name] }}
                                />
                                <span className="text-xs text-base-content/70">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </ChartCard>

                {/* User Roles Donut Chart */}
                <ChartCard title="User Roles" subtitle="System access distribution">
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={roleChartData}
                                cx="50%"
                                cy="45%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {roleChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={ROLE_COLORS[entry.name.toLowerCase()]} />
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
                    <div className="text-center -mt-2">
                        <span className="text-2xl font-bold text-base-content">{stats.totalUsers}</span>
                        <p className="text-xs text-base-content/50">Total Users</p>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                        {roleChartData.map((item) => (
                            <div key={item.name} className="flex items-center gap-1.5">
                                <div 
                                    className="w-2.5 h-2.5 rounded-full" 
                                    style={{ backgroundColor: ROLE_COLORS[item.name.toLowerCase()] }}
                                />
                                <span className="text-xs text-base-content/70">{item.name}: {item.value}</span>
                            </div>
                        ))}
                    </div>
                </ChartCard>

                {/* Client Status Bar Chart */}
                <ChartCard title="Client Status Overview" subtitle="By status and budget">
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={clientStatusChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--fallback-bc)" strokeOpacity={0.1} />
                            <XAxis 
                                dataKey="status" 
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
                                formatter={(value, name, props) => {
                                    if (name === 'count') return [`${value} clients`, 'Count'];
                                    return [formatBudget(value), 'Budget'];
                                }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {clientStatusChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-2">
                        {clientStatusChartData.map((item) => (
                            <div key={item.status} className="text-center">
                                <p className="text-xs text-base-content/50">{item.status} Budget</p>
                                <p className="text-sm font-semibold text-base-content">{formatBudget(item.totalBudget)}</p>
                            </div>
                        ))}
                    </div>
                </ChartCard>
            </div>

            {/* Growth Trends */}
            <div className="mb-6">
                <ChartCard title="Platform Growth Trend" subtitle="New users and influencers (Last 6 months)">
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={growthChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--fallback-bc)" strokeOpacity={0.1} />
                            <XAxis 
                                dataKey="month" 
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
                            />
                            <Line 
                                type="monotone" 
                                dataKey="newUsers" 
                                stroke="#3B82F6" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={{ fill: '#3B82F6', r: 3 }}
                                name="New Users"
                            />
                            <Line 
                                type="monotone" 
                                dataKey="newInfluencers" 
                                stroke="#8B5CF6" 
                                strokeWidth={2}
                                dot={{ fill: '#8B5CF6', r: 3 }}
                                name="New Influencers"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-blue-500" style={{ borderTop: '2px dashed #3B82F6' }} />
                            <span className="text-sm text-base-content/70">New Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-purple-500" />
                            <span className="text-sm text-base-content/70">New Influencers</span>
                        </div>
                    </div>
                </ChartCard>
            </div>

            {/* Niche Distribution */}
            <div className="mb-6">
                <ChartCard title="Top Influencer Niches" subtitle="Platform-wide content categories">
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart 
                            data={nicheChartData} 
                            layout="vertical"
                            margin={{ top: 10, right: 10, left: 100, bottom: 0 }}
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
                                width={90}
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

            {/* Top Users by Influencer Count */}
            <div className="mb-6">
                <ChartCard title="Most Active Users" subtitle="Top 10 by influencer imports">
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={topUsersChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--fallback-bc)" strokeOpacity={0.1} />
                            <XAxis 
                                dataKey="username" 
                                tick={{ fill: 'var(--fallback-bc)', fontSize: 11, angle: -45, textAnchor: 'end' }}
                                axisLine={{ stroke: 'var(--fallback-bc)', strokeOpacity: 0.2 }}
                                height={60}
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
                                    props.payload.email
                                ]}
                            />
                            <Bar dataKey="influencerCount" fill="url(#colorGradient)" radius={[4, 4, 0, 0]}>
                            </Bar>
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Three Column: Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Users */}
                <div className="card bg-base-100 border border-base-300 shadow-md">
                    <div className="card-body p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-base-content">Recent Users</h3>
                            <Link to="/admin/users" className="text-sm text-primary hover:underline flex items-center gap-1">
                                View All <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        {recentUsers?.length > 0 ? (
                            <div className="space-y-3">
                                {recentUsers.map((u) => (
                                    <div key={u._id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-semibold">
                                            {u.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-base-content truncate">{u.username}</p>
                                                {u.role === 'admin' && (
                                                    <Crown className="w-4 h-4 text-amber-500" />
                                                )}
                                            </div>
                                            <p className="text-sm text-base-content/50 truncate">{u.email}</p>
                                        </div>
                                        <span className={`badge badge-sm ${u.role === 'admin' ? 'badge-warning' : 'badge-ghost'}`}>
                                            {u.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-base-content/50 text-center py-8">No users yet</p>
                        )}
                    </div>
                </div>

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
                                            <p className="text-xs text-base-content/50">by {inf.importedBy}</p>
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
                                        <div className="text-right">
                                            <span className={`badge ${client.status === 'Active' ? 'badge-success' : 'badge-ghost'}`}>
                                                {client.status}
                                            </span>
                                            <p className="text-xs text-base-content/50 mt-1">
                                                {formatBudget(client.stats?.budget)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-base-content/50 text-center py-8">No clients yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
