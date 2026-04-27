import { FaInstagram, FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa';

const platformConfig = {
    Instagram: { icon: FaInstagram, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    YouTube: { icon: FaYoutube, color: 'text-red-500', bg: 'bg-red-500/10' },
    Facebook: { icon: FaFacebook, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    TikTok: { icon: FaTiktok, color: 'text-base-content', bg: 'bg-base-content/10' }
};

const PlatformBadge = ({ platforms }) => {
    return (
        <div className="flex flex-wrap gap-1.5">
            {platforms?.map((p, i) => {
                const config = platformConfig[p];
                if (config) {
                    const Icon = config.icon;
                    return (
                        <span key={i} className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg ${config.bg} ${config.color}`}>
                            <Icon className="w-3 h-3" />
                            {p}
                        </span>
                    );
                }
                return (
                    <span key={i} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-base-content/10 text-base-content/70">
                        {p}
                    </span>
                );
            })}
        </div>
    );
};

export default PlatformBadge;