import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiTarget, FiTrendingUp, FiZap, FiGlobe, FiShield } from 'react-icons/fi';

// Intersection Observer hook for scroll animations
const useScrollAnimation = (threshold = 0.1) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);

    return [ref, isVisible];
};

const Home = () => {
    const [heroRef, heroVisible] = useScrollAnimation(0.1);
    const [statsRef, statsVisible] = useScrollAnimation(0.2);
    const [featuresRef, featuresVisible] = useScrollAnimation(0.1);
    const [platformsRef, platformsVisible] = useScrollAnimation(0.2);

    const stats = [
        { label: 'Total Influencers', value: '1,284', change: '+12%', icon: FiUsers },
        { label: 'Total Reach', value: '25.4M', change: '+8%', icon: FiTarget },
        { label: 'Active Campaigns', value: '42', change: '+5', icon: FiTrendingUp },
    ];

    const features = [
        { icon: FiZap, title: 'Real-time Analytics', desc: 'Track performance metrics as they happen with live dashboards.' },
        { icon: FiGlobe, title: 'Multi-Platform', desc: 'Connect TikTok, Instagram, YouTube, and more in one place.' },
        { icon: FiShield, title: 'Secure Data', desc: 'Enterprise-grade security for all your influencer data.' },
    ];

    const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Twitch'];

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            {/* Hero Section with animated gradient */}
            <section 
                ref={heroRef}
                className="relative min-h-screen flex items-center overflow-hidden"
            >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent" />
                </div>

                {/* Floating animated shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
                    <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
                </div>

                {/* Grid pattern overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-32 pb-20">
                    <div className="max-w-3xl">
                        {/* Badge */}
                        <div 
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-emerald-400 mb-8 transition-all duration-700 ${
                                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                            </span>
                            Now supporting 6 major platforms
                        </div>

                        {/* Main headline with staggered animation */}
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                            <span 
                                className={`block transition-all duration-700 delay-100 ${
                                    heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            >
                                Build Your
                            </span>
                            <span 
                                className={`block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-700 delay-200 ${
                                    heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            >
                                Influencer Empire
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p 
                            className={`text-xl text-gray-400 max-w-xl mb-10 transition-all duration-700 delay-300 ${
                                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        >
                            Unified analytics, smart campaign management, and powerful creator relationships — all in one beautiful dashboard.
                        </p>

                        {/* CTA Buttons */}
                        <div 
                            className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${
                                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        >
                            <Link
                                to="/influencers"
                                className="group px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl flex items-center gap-3 hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-emerald-500/20"
                            >
                                Explore Network
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/clients"
                                className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-medium rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-white/40"
                            >
                                View Clients
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section 
                ref={statsRef}
                className="relative -mt-20 px-4 lg:px-8 z-10"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`group bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-500 ${
                                        statsVisible 
                                            ? 'opacity-100 translate-y-0' 
                                            : 'opacity-0 translate-y-12'
                                    }`}
                                    style={{ transitionDelay: `${idx * 100}ms` }}
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-gray-100 group-hover:bg-emerald-50 rounded-xl transition-colors duration-300">
                                            <Icon className="w-6 h-6 text-gray-600 group-hover:text-emerald-600 transition-colors duration-300" />
                                        </div>
                                        <span className="text-emerald-600 text-sm font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                                            {stat.change}
                                        </span>
                                    </div>
                                    <div className="text-4xl font-bold text-gray-900 mb-1 tracking-tight">
                                        {stat.value}
                                    </div>
                                    <p className="text-gray-500 font-medium">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section 
                ref={featuresRef}
                className="py-24 px-4 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <div 
                        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
                            featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase mb-4 block">Features</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Everything you need to scale
                        </h2>
                        <p className="text-xl text-gray-500">
                            Powerful tools designed for modern influencer marketing teams.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`group p-8 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-500 ${
                                        featuresVisible 
                                            ? 'opacity-100 translate-y-0' 
                                            : 'opacity-0 translate-y-12'
                                    }`}
                                    style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <Icon className="w-7 h-7 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Platforms Section */}
            <section 
                ref={platformsRef}
                className="py-20 px-4 lg:px-8 bg-gray-900 relative overflow-hidden"
            >
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <div 
                        className={`transition-all duration-700 ${
                            platformsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <span className="text-emerald-400 font-semibold text-sm tracking-wider uppercase mb-4 block">Integrations</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Connect once. Track everything.
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                            Real-time data from all major platforms. No more switching between tabs.
                        </p>
                    </div>

                    {/* Platform badges */}
                    <div 
                        className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${
                            platformsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        {platforms.map((platform, idx) => (
                            <div
                                key={platform}
                                className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white/80 font-medium hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {platform}
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/influencers"
                        className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 ${
                            platformsVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        Start Tracking
                        <FiArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;