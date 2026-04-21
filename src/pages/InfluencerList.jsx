import React, { useEffect, useState, useMemo } from 'react';
import toast from 'react-hot-toast';

import {
    FiLoader,
    FiInbox,
    FiUsers,
    FiTrendingUp,
    FiHeart,
    FiSearch,
    FiPlus,
    FiFilter
} from 'react-icons/fi';

import {
    FaInstagram,
    FaYoutube,
    FaFacebook,
    FaTiktok
} from 'react-icons/fa';

import InfluencerTable from '../components/influencers/InfluencerTable';
import ImportInstagramModal from '../components/modals/ImportInstagramModal';
import ImportYouTubeModal from '../components/modals/ImportYouTubeModal';
import ImportFacebookModal from '../components/modals/ImportFacebookModal';
import ImportTikTokModal from '../components/modals/ImportTikTokModal';
import EditInfluencerModal from '../components/modals/EditInfluencerModal';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';

import { fetchInfluencers, deleteInfluencer } from '../services/influencerService';


// PLATFORM CONFIG
const PLATFORMS = [
    { id: 'all', label: 'All', icon: FiFilter },
    { id: 'Instagram', label: 'Instagram', icon: FaInstagram },
    { id: 'YouTube', label: 'YouTube', icon: FaYoutube },
    { id: 'Facebook', label: 'Facebook', icon: FaFacebook },
    { id: 'TikTok', label: 'TikTok', icon: FaTiktok }
];


// STAT CARD COMPONENT
const StatCard = ({ icon: Icon, label, value, subtext }) => (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex justify-between">
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
                {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
            </div>
            <Icon className="w-5 h-5 text-gray-500" />
        </div>
    </div>
);


const InfluencerList = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [showDropdown, setShowDropdown] = useState(false);

    const [showIG, setShowIG] = useState(false);
    const [showYT, setShowYT] = useState(false);
    const [showFB, setShowFB] = useState(false);
    const [showTT, setShowTT] = useState(false);

    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);


    // LOAD DATA
    const loadCreators = async () => {
        try {
            setLoading(true);
            const data = await fetchInfluencers();
            if (data) setCreators(data);
        } catch (err) {
            toast.error(err.message || "Failed to load influencers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCreators();
    }, []);


    // SEARCH DEBOUNCE
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);


    // STATS
    const stats = useMemo(() => {
        const totalFollowers = creators.reduce(
            (sum, c) => sum + (c.followers || 0),
            0
        );

        const avgEngagement = creators.length
            ? creators.reduce((sum, c) => sum + (c.metrics?.engagementRate || 0), 0) / creators.length
            : 0;

        const platformCount = new Set(
            creators.flatMap(c => c.platforms || [])
        ).size;

        return {
            total: creators.length,
            followers:
                totalFollowers >= 1000000
                    ? `${(totalFollowers / 1000000).toFixed(1)}M`
                    : `${(totalFollowers / 1000).toFixed(0)}K`,
            engagement: avgEngagement.toFixed(1),
            platforms: platformCount
        };
    }, [creators]);


    // FILTER
    const filtered = useMemo(() => {
        let result = creators;

        if (selectedPlatform !== 'all') {
            result = result.filter(c =>
                c.platforms?.includes(selectedPlatform)
            );
        }

        if (debouncedSearch) {
            const search = debouncedSearch.toLowerCase();

            result = result.filter(c =>
                c.name?.toLowerCase().includes(search) ||
                c.handle?.toLowerCase().includes(search)
            );
        }

        return result;
    }, [creators, debouncedSearch, selectedPlatform]);


    // DELETE
    const handleDelete = async () => {
        if (!deleting) return;

        const id = deleting._id;
        const prev = creators;

        setCreators(prev.filter(c => c._id !== id));

        try {
            await deleteInfluencer(id);
            toast.success("Deleted");
            setDeleting(null);
        } catch (err) {
            setCreators(prev);
            toast.error(err.message || "Delete failed");
            setDeleting(null);
        }
    };


    // LOADING
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <FiLoader className="animate-spin w-10 h-10 text-gray-400" />
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto px-6 py-8">

            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Creator Network</h1>
                <p className="text-gray-500">Manage influencers</p>
            </div>


            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard icon={FiUsers} label="Creators" value={stats.total} />
                <StatCard icon={FiTrendingUp} label="Reach" value={stats.followers} />
                <StatCard icon={FiHeart} label="Engagement" value={`${stats.engagement}%`} />
                <StatCard icon={FiFilter} label="Platforms" value={stats.platforms} />
            </div>


            {/* FILTER + SEARCH */}
            <div className="bg-white border rounded-xl p-4 mb-6 flex flex-col lg:flex-row gap-4">

                {/* PLATFORM FILTER */}
                <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map(p => {
                        const Icon = p.icon;
                        const active = selectedPlatform === p.id;

                        return (
                            <button
                                key={p.id}
                                onClick={() => setSelectedPlatform(p.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${active
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {p.label}
                            </button>
                        );
                    })}
                </div>


                {/* SEARCH + ADD */}
                <div className="flex gap-3 lg:ml-auto">

                    <div className="relative">
                        <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg"
                            placeholder="Search..."
                        />
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
                        >
                            <FiPlus className="w-4 h-4" />
                            Add Creator
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Import from
                                </div>

                                <button
                                    onClick={() => { setShowIG(true); setShowDropdown(false); }}
                                    className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <FaInstagram className="w-4 h-4 text-pink-500" />
                                    Instagram
                                </button>

                                <button
                                    onClick={() => { setShowYT(true); setShowDropdown(false); }}
                                    className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <FaYoutube className="w-4 h-4 text-red-500" />
                                    YouTube
                                </button>

                                <button
                                    onClick={() => { setShowFB(true); setShowDropdown(false); }}
                                    className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <FaFacebook className="w-4 h-4 text-blue-600" />
                                    Facebook
                                </button>

                                <button
                                    onClick={() => { setShowTT(true); setShowDropdown(false); }}
                                    className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <FaTiktok className="w-4 h-4 text-black" />
                                    TikTok
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* TABLE */}
            {filtered.length > 0 ? (
                <InfluencerTable
                    data={filtered}
                    onDelete={(id) =>
                        setDeleting(creators.find(c => c._id === id))
                    }
                    onEdit={setEditing}
                />
            ) : (
                <div className="text-center py-20 text-gray-400">
                    <FiInbox className="mx-auto mb-4 w-12 h-12" />
                    No creators found
                </div>
            )}


            {/* MODALS */}
            {showIG && <ImportInstagramModal onClose={() => setShowIG(false)} refresh={loadCreators} />}
            {showYT && <ImportYouTubeModal onClose={() => setShowYT(false)} refresh={loadCreators} />}
            {showFB && <ImportFacebookModal onClose={() => setShowFB(false)} refresh={loadCreators} />}
            {showTT && <ImportTikTokModal onClose={() => setShowTT(false)} refresh={loadCreators} />}
            {editing && <EditInfluencerModal data={editing} onClose={() => setEditing(null)} refresh={loadCreators} />}
            {deleting && <ConfirmDeleteModal influencerName={deleting.name} onClose={() => setDeleting(null)} onConfirm={handleDelete} />}
        </div>
    );
};

export default InfluencerList;