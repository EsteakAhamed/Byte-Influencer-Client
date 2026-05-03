import React from 'react';
import { Link } from 'react-router-dom';
import {
    FiZap,
    FiGlobe,
    FiShield,
    FiSearch,
    FiBarChart2,
    FiUsers,
    FiArrowRight,
    FiDownload,
    FiLayers,
    FiMousePointer,
    FiCheckCircle
} from 'react-icons/fi';
import {
    SiInstagram,
    SiYoutube,
    SiTiktok,
    SiFacebook
} from 'react-icons/si';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import UserDashboard from './dashboard/UserDashboard';
import AdminDashboard from './dashboard/AdminDashboard';

const FeatureCard = ({ icon: Icon, title, desc }) => (
    <div className="card bg-base-100 border border-base-content/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
        <div className="card-body p-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Icon size={24} />
            </div>
            <h3 className="card-title text-xl font-bold mb-2">{title}</h3>
            <p className="text-base-content/70 leading-relaxed">{desc}</p>
        </div>
    </div>
);

const PublicLandingPage = () => {

    const features = [
        { icon: FiUsers, title: 'Unified Profiles', desc: 'Consolidate creator data from multiple platforms into a single, comprehensive identity.' },
        { icon: FiDownload, title: 'Multi-Platform Import', desc: 'Import creators from Instagram, YouTube, TikTok, and Facebook in seconds.' },
        { icon: FiBarChart2, title: 'Real-Time Metrics', desc: 'Track followers, engagement, and reach with live data aggregation.' },
        { icon: FiShield, title: 'RBAC Security', desc: 'Enterprise-grade admin oversight with strict user data privacy controls.' },
        { icon: FiSearch, title: 'Smart Search', desc: 'Discover the perfect creators with advanced filters for niche and performance.' },
        { icon: FiLayers, title: 'Client Management', desc: 'Track brand campaigns, budgets, and performance analytics in one place.' },
    ];

    const steps = [
        { number: '01', title: 'Import Creators', desc: 'Paste a social link to pull deep metrics instantly.', icon: FiDownload },
        { number: '02', title: 'Unify Profiles', desc: 'Connect multiple social handles to one creator.', icon: FiUsers },
        { number: '03', title: 'Track Metrics', desc: 'Monitor real-time engagement and growth trends.', icon: FiBarChart2 },
        { number: '04', title: 'Manage Campaigns', desc: 'Coordinate with clients and scale your network.', icon: FiZap },
    ];

    const platforms = [
        { name: 'Instagram', icon: SiInstagram, color: 'text-pink-600' },
        { name: 'YouTube', icon: SiYoutube, color: 'text-red-600' },
        { name: 'TikTok', icon: SiTiktok, color: 'text-base-content' },
        { name: 'Facebook', icon: SiFacebook, color: 'text-blue-600' },
    ];

    return (
        <div className="min-h-screen bg-base-100">

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium mb-8 border border-emerald-500/20">
                            <FiCheckCircle className="animate-pulse" />
                            <span>Platform Live for Agencies</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                            Influence <br />
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                Without Limits.
                            </span>
                        </h1>
                        <p className="text-xl text-base-content/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Discover, manage, and scale your creator partnerships with a clean,
                            data-driven platform built for modern influencer teams.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="btn btn-primary btn-lg rounded-full px-10 text-white border-none shadow-lg shadow-emerald-500/20">
                                Get Started <FiArrowRight size={18} />
                            </Link>
                            <Link to="/login" className="btn btn-outline btn-lg rounded-full px-10">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10 dark:opacity-20 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]"></div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-12 border-y border-base-content/5 bg-base-200/30">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Creators Tracked', val: '5,000+' },
                            { label: 'Active Brands', val: '200+' },
                            { label: 'Campaigns Run', val: '1,200+' },
                            { label: 'Platform Reach', val: '25.4M' },
                        ].map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-black text-emerald-600">{s.val}</div>
                                <div className="text-sm font-medium opacity-60 uppercase tracking-widest mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="mb-20">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Everything you need.</h2>
                        <p className="text-lg text-base-content/60 max-w-xl">
                            Focus on growth while we handle the complexity behind unified creator data and real-time operations.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <FeatureCard key={i} {...f} />
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="py-24 lg:py-32 bg-base-200/50">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-4 italic">The Byte Workflow</h2>
                        <div className="h-1.5 w-20 bg-emerald-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="relative text-center">
                                <div className="w-16 h-16 rounded-2xl bg-base-100 shadow-sm border border-base-content/5 flex items-center justify-center mx-auto mb-6 text-emerald-600 relative z-10">
                                    <step.icon size={28} />
                                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center border-4 border-base-200">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                <p className="text-sm text-base-content/60 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PLATFORMS COVERAGE */}
            <section className="py-24 lg:py-32 border-t border-base-content/5">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
                    <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-16">Integrated Platforms</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
                        {platforms.map((p, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 group">
                                <p className="flex items-center gap-3 text-2xl font-bold text-base-content group-hover:text-emerald-500 transition-colors">
                                    <p.icon className={p.color} />
                                    {p.name}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-16 text-base-content/60 max-w-2xl mx-auto leading-relaxed">
                        Byte Influencer aggregates data from Instagram, YouTube, TikTok, and Facebook to provide a single, unified source of truth for your network.
                    </p>
                </div>
            </section>

            {/* FINAL CALL TO ACTION */}
            <section className="py-20 lg:py-32 px-4">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-500/20">
                    <div className="relative z-10">
                        <h2 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight">Scale your influencer <br className="hidden md:block" /> marketing today.</h2>
                        <p className="text-emerald-50 text-lg mb-12 max-w-xl mx-auto opacity-90">
                            Join modern agencies using Byte Influencer to manage thousands of creators and brand partnerships globally.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/register" className="btn btn-lg bg-white text-emerald-700 border-none hover:bg-emerald-50 rounded-full px-12 transition-transform hover:scale-105">
                                Create Free Account
                            </Link>
                            <Link to="/login" className="text-white/80 hover:text-white underline underline-offset-8 font-medium">
                                Existing agency? Sign in
                            </Link>
                        </div>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                </div>
            </section>

        </div>
    );
};

const Home = () => {
    const { isLoggedIn, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (isLoggedIn && isAdmin) {
        return <AdminDashboard />;
    }

    if (isLoggedIn && !isAdmin) {
        return <UserDashboard />;
    }

    return <PublicLandingPage />;
};

export default Home;