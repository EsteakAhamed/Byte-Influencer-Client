import { Link } from 'react-router-dom';
import {
    FiArrowRight,
    FiUsers,
    FiTarget,
    FiTrendingUp,
    FiZap,
    FiGlobe,
    FiShield
} from 'react-icons/fi';

const Home = () => {

    const stats = [
        { label: 'Total Influencers', value: '1,284', change: '+12%', trend: 'up', icon: FiUsers },
        { label: 'Total Reach', value: '25.4M', change: '+8.2M', trend: 'up', icon: FiTarget },
        { label: 'Active Campaigns', value: '42', change: '-2', trend: 'down', icon: FiTrendingUp },
    ];

    const features = [
        { icon: FiZap, title: 'Real-time Analytics', desc: 'Live campaign tracking with instant insights.' },
        { icon: FiGlobe, title: 'Multi-Platform', desc: 'Manage creators across all major platforms.' },
        { icon: FiShield, title: 'Secure & Reliable', desc: 'Built with performance and security in mind.' },
    ];

    const platforms = ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Twitter', 'Twitch'];

    return (
        <div className="bg-base-100">

            {/* HERO */}
            <section className="relative px-6 pt-32 pb-24">
                <div className="max-w-6xl mx-auto">

                    <div className="max-w-2xl">

                        <div className="badge badge-outline mb-6">
                            Now live
                        </div>

                        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6">
                            Influence <br />
                            <span className="text-primary">without limits.</span>
                        </h1>

                        <p className="text-lg md:text-xl opacity-70 mb-10 leading-relaxed">
                            Discover, manage, and scale your creator partnerships with a clean,
                            data-driven platform built for modern teams.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/influencers" className="btn btn-primary btn-lg px-6">
                                Get Started <FiArrowRight />
                            </Link>

                            <Link to="/clients" className="btn btn-ghost btn-lg">
                                Manage Clients
                            </Link>
                        </div>
                    </div>

                </div>

                {/* subtle gradient glow (very light, not messy) */}
                <div className="pointer-events-none absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary blur-3xl" />
                </div>
            </section>

            {/* STATS */}
            <section className="px-6 pb-24">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        const isUp = stat.trend === 'up';

                        return (
                            <div
                                key={i}
                                className="rounded-2xl border bg-base-100 p-6 hover:-translate-y-1 hover:shadow-md transition"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <Icon size={22} />

                                    <span className={`text-xs font-medium ${isUp ? 'text-success' : 'text-error'
                                        }`}>
                                        {isUp ? '▲' : '▼'} {stat.change}
                                    </span>
                                </div>

                                <div className="text-3xl font-semibold mb-1">
                                    {stat.value}
                                </div>

                                <div className="text-sm opacity-60">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </section>

            {/* FEATURES */}
            <section className="px-6 py-24 border-t">
                <div className="max-w-6xl mx-auto">

                    <div className="max-w-xl mb-16">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                            Everything you need. Nothing you don’t.
                        </h2>
                        <p className="opacity-70">
                            Focus on growth while we handle the complexity behind influencer operations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, i) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={i}
                                    className="group rounded-2xl border p-6 hover:shadow-md transition"
                                >
                                    <Icon size={26} className="mb-4 opacity-80 group-hover:opacity-100 transition" />

                                    <h3 className="text-lg font-semibold mb-2">
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm opacity-60 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-28 text-center">
                <div className="max-w-3xl mx-auto">

                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
                        Build your creator network.
                    </h2>

                    <p className="opacity-70 mb-8">
                        Join teams already scaling their influence globally.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {platforms.map((p) => (
                            <span key={p} className="text-sm opacity-50">
                                {p}
                            </span>
                        ))}
                    </div>

                    <Link
                        to="/influencers"
                        className="btn btn-primary btn-lg px-8"
                    >
                        Explore Platform
                    </Link>

                </div>
            </section>

        </div>
    );
};

export default Home;