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
        { label: 'Total Influencers', value: '1,284', change: '+12%', trend: 'up', icon: FiUsers },
        { label: 'Total Reach', value: '25.4M', change: '+8.2M', trend: 'up', icon: FiTarget },
        { label: 'Active Campaigns', value: '42', change: '-2', trend: 'down', icon: FiTrendingUp },
    ];

    const features = [
        { 
            icon: FiZap, 
            title: 'Real-time Analytics', 
            desc: 'Track performance metrics as they happen with live dashboards and instant updates.',
            color: 'bg-amber-500'
        },
        { 
            icon: FiGlobe, 
            title: 'Multi-Platform', 
            desc: 'Seamlessly connect TikTok, Instagram, YouTube, and more in one unified ecosystem.',
            color: 'bg-blue-500'
        },
        { 
            icon: FiShield, 
            title: 'Enterprise Security', 
            desc: 'Bank-grade security protocols to keep your influencer data and partnerships protected.',
            color: 'bg-emerald-500'
        },
    ];

    const platforms = ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Twitter', 'Twitch'];

    return (
        <div className="min-h-screen bg-base-100 overflow-x-hidden selection:bg-emerald-500/30">
            {/* --- HERO SECTION --- */}
            <section 
                ref={heroRef}
                className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden"
            >
                {/* Modern background with mesh gradient */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-base-100" />
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
                         style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '48px 48px' }} 
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="max-w-4xl">
                        {/* Animated Badge */}
                        <div 
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-8 transition-all duration-1000 ${
                                heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                            }`}
                        >
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            v2.0 is now live
                        </div>

                        {/* Heading with bold weights */}
                        <h1 className="text-6xl md:text-8xl font-black text-base-content leading-[0.9] tracking-tighter mb-8">
                            <span className={`block transition-all duration-1000 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                                Influence
                            </span>
                            <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                                Without Limits.
                            </span>
                        </h1>

                        <p className={`text-xl md:text-2xl text-base-content/60 font-medium max-w-2xl mb-12 leading-relaxed transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            The next-generation platform to discover, track, and scale your creator partnerships with data-driven precision.
                        </p>

                        {/* Interactive Buttons */}
                        <div className={`flex flex-wrap gap-5 transition-all duration-1000 delay-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <Link
                                to="/influencers"
                                className="group btn btn-lg bg-emerald-500 hover:bg-emerald-600 border-none text-white px-10 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Get Started
                                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/clients"
                                className="btn btn-lg btn-ghost border border-base-content/10 px-10 rounded-2xl backdrop-blur-md hover:bg-base-content/5 transition-all duration-300"
                            >
                                Manage Clients
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section 
                ref={statsRef}
                className="relative z-20 px-6 lg:px-8 pb-32"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            const isUp = stat.trend === 'up';
                            return (
                                <div
                                    key={idx}
                                    className={`group relative bg-base-100 rounded-[2.5rem] p-10 border border-base-content/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-16px_rgba(16,185,129,0.15)] hover:-translate-y-4 transition-all duration-700 ${
                                        statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                    }`}
                                    style={{ transitionDelay: `${idx * 150}ms` }}
                                >
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative w-20 h-20 bg-base-200 dark:bg-white/5 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:rotate-6 shadow-inner">
                                                <Icon className="w-8 h-8 text-base-content group-hover:text-white transition-colors duration-300" />
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border ${
                                            isUp 
                                                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                                                : 'bg-red-500/10 text-red-600 border-red-500/20'
                                        }`}>
                                            {isUp ? '▲' : '▼'} {stat.change}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="text-7xl font-black text-base-content tracking-tighter leading-none">
                                            {stat.value}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-1 w-10 bg-emerald-500 rounded-full group-hover:w-16 transition-all duration-500" />
                                            <div className="text-sm font-bold uppercase tracking-[0.3em] text-base-content/30 group-hover:text-base-content/60 transition-colors duration-300">
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section 
                ref={featuresRef}
                className="py-32 px-6 lg:px-8 bg-base-200/50"
            >
                <div className="max-w-7xl mx-auto">
                    <div 
                        className={`max-w-3xl mb-24 transition-all duration-1000 ${
                            featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                    >
                        <h2 className="text-5xl md:text-6xl font-black text-base-content tracking-tighter mb-8">
                            Engineered for <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">Performance.</span>
                        </h2>
                        <p className="text-xl text-base-content/60 leading-relaxed font-medium">
                            Scale your influencer operations with tools built for speed, accuracy, and enterprise-grade reliability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`group relative p-10 rounded-[2.5rem] bg-base-100 border border-base-content/5 hover:border-emerald-500/20 transition-all duration-700 ${
                                        featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                    }`}
                                    style={{ transitionDelay: `${idx * 200}ms` }}
                                >
                                    <div className={`w-16 h-16 ${feature.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-inherit/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-base-content mb-4">{feature.title}</h3>
                                    <p className="text-base-content/60 leading-relaxed font-medium">{feature.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section 
                ref={platformsRef}
                className="py-40 px-6 lg:px-8 relative"
            >
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div 
                        className={`transition-all duration-1000 ${
                            platformsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-base-content tracking-tighter mb-10 leading-[0.9]">
                            Ready to transform your <br/>
                            <span className="text-emerald-500 underline decoration-base-content/10 underline-offset-8 italic font-serif">network?</span>
                        </h2>
                        
                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            {platforms.map((p, idx) => (
                                <div 
                                    key={p} 
                                    className="px-6 py-3 bg-base-200 text-base-content/40 rounded-2xl text-sm font-bold border border-base-content/5 hover:text-base-content transition-colors cursor-default"
                                    style={{ transitionDelay: `${idx * 50}ms` }}
                                >
                                    {p}
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/influencers"
                            className="btn btn-lg bg-base-content text-base-100 border-none px-12 rounded-3xl hover:bg-emerald-500 hover:text-white transition-all duration-500 shadow-2xl hover:scale-110 active:scale-95"
                        >
                            Explore Global Database
                        </Link>
                    </div>
                </div>

                {/* Decorative background for CTA */}
                <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[160px]" />
                </div>
            </section>
        </div>
    );
};

export default Home;