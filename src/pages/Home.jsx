import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Target, ArrowRight } from 'lucide-react';

const Home = () => {
    const stats = [
        {
            label: 'Total Influencers',
            value: '1,284',
            change: '+40',
            percent: '2%',
            icon: Users,
            color: 'text-emerald-500',
        },
        {
            label: 'Total Reach',
            value: '25.4M',
            change: '',
            percent: '',
            icon: Target,
            color: 'text-zinc-900',
        },
        {
            label: 'Active Campaigns',
            value: '42',
            change: '12',
            percent: 'pending',
            icon: TrendingUp,
            color: 'text-emerald-500',
        },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 pb-20">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(255,255,255,0.15)_0%,transparent_70%)]"></div>

                <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 relative z-10">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm text-white mb-6 border border-white/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                            </span>
                            Now supporting 12 platforms
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-white tracking-tighter mb-6">
                            Build your<br />
                            <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                                Influencer Empire
                            </span>
                        </h1>

                        <p className="text-xl text-emerald-100/90 max-w-md mb-10">
                            Unified analytics, smart campaign management, and powerful creator relationships — all in one beautiful dashboard.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/influencers"
                                className="group px-8 py-4 bg-white text-emerald-700 font-semibold rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-emerald-500/30"
                            >
                                Explore Network
                                <ArrowRight className="group-hover:translate-x-1 transition" />
                            </Link>

                            <Link
                                to="/clients"
                                className="px-8 py-4 border border-white/40 hover:bg-white/10 text-white font-medium rounded-2xl backdrop-blur-md transition-all duration-300"
                            >
                                View Clients
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute -bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl hidden lg:block"></div>
                <div className="absolute top-20 -right-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>
            </section>

            {/* Stats Section */}
            <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={idx}
                                className="group bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-zinc-100 group-hover:bg-emerald-50 rounded-2xl transition-colors">
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    {stat.change && (
                                        <div className="text-right">
                                            <p className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                                                ↗︎ {stat.change} {stat.percent}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="text-4xl font-bold text-zinc-900 mb-1 tracking-tighter">
                                    {stat.value}
                                </div>
                                <p className="text-zinc-500 font-medium">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Two Column Section */}
            <section className="max-w-7xl mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Platform Integration */}
                    <div className="lg:col-span-3 bg-zinc-900 rounded-3xl p-10 text-white overflow-hidden relative group">
                        <div className="max-w-md">
                            <div className="uppercase tracking-[3px] text-emerald-400 text-sm font-semibold mb-3">INTEGRATIONS</div>
                            <h3 className="text-4xl font-semibold leading-tight mb-6">
                                Connect once.<br />Track everything.
                            </h3>
                            <p className="text-zinc-400 text-lg">
                                Real-time data from TikTok, Instagram, YouTube, Twitch, LinkedIn & more.
                            </p>
                        </div>

                        <button className="mt-10 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 rounded-2xl font-semibold flex items-center gap-3 transition-all group-hover:gap-4">
                            Configure APIs
                            <ArrowRight />
                        </button>

                        {/* Subtle platform logos background */}
                        <div className="absolute -bottom-12 -right-12 text-[180px] font-black text-white/5 select-none">
                            API
                        </div>
                    </div>

                    {/* Client Growth */}
                    <div className="lg:col-span-2 bg-white border border-zinc-100 rounded-3xl p-10 flex flex-col">
                        <div>
                            <h3 className="text-3xl font-semibold text-zinc-800 mb-3">Client Growth</h3>
                            <p className="text-zinc-600">
                                You have <span className="font-semibold text-emerald-600">5 new inquiries</span> this week.
                            </p>
                        </div>

                        <div className="mt-auto pt-10">
                            <Link
                                to="/clients"
                                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold group"
                            >
                                View all clients
                                <ArrowRight className="group-hover:translate-x-1 transition" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;