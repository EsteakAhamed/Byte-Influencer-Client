import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    FiLoader, FiInbox, FiUsers, FiTrendingUp, FiHeart,
    FiSearch, FiPlus, FiFilter
} from 'react-icons/fi';
import { FaInstagram, FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa';

import InfluencerTable from '../components/influencers/InfluencerTable';
import Pagination from '../components/Pagination';
import ImportInstagramModal from '../components/modals/ImportInstagramModal';
import ImportYouTubeModal from '../components/modals/ImportYouTubeModal';
import ImportFacebookModal from '../components/modals/ImportFacebookModal';
import ImportTikTokModal from '../components/modals/ImportTikTokModal';
import EditInfluencerModal from '../components/modals/EditInfluencerModal';
import DeleteInfluencerModal from '../components/modals/DeleteInfluencerModal';
import { fetchInfluencers, deleteInfluencer, deleteInfluencerPlatform } from '../services/influencerService';

const PLATFORMS = [
    { id: 'all', label: 'All', icon: FiFilter },
    { id: 'Instagram', label: 'Instagram', icon: FaInstagram },
    { id: 'YouTube', label: 'YouTube', icon: FaYoutube },
    { id: 'Facebook', label: 'Facebook', icon: FaFacebook },
    { id: 'TikTok', label: 'TikTok', icon: FaTiktok }
];

const StatCard = ({ icon: Icon, label, value, subtext }) => (
    <div className="bg-base-100 rounded-xl p-5 border border-base-content/10">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/40">{label}</p>
                <p className="text-2xl font-black text-base-content mt-1">{value}</p>
                {subtext && <p className="text-xs text-base-content/40 mt-0.5">{subtext}</p>}
            </div>
            <div className="p-2.5 rounded-xl bg-base-200">
                <Icon className="w-5 h-5 text-base-content/50" />
            </div>
        </div>
    </div>
);

const InfluencerList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
    const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get('search') || "");
    const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all');
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [pagination, setPagination] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showIG, setShowIG] = useState(false);
    const [showYT, setShowYT] = useState(false);
    const [showFB, setShowFB] = useState(false);
    const [showTT, setShowTT] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const loadCreators = async (page = currentPage) => {
        try {
            setLoading(true);
            const response = await fetchInfluencers({ page, limit: 20 });
            if (response?.success) {
                setCreators(response.data);
                setPagination(response.pagination);
            }
        } catch (err) { toast.error(err.message || "Failed to load influencers"); }
        finally { setLoading(false); }
    };

    useEffect(() => { loadCreators(); }, []);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Update URL params when state changes
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedPlatform !== 'all') params.set('platform', selectedPlatform);
        if (currentPage > 1) params.set('page', currentPage);
        setSearchParams(params);
    }, [searchTerm, selectedPlatform, currentPage, setSearchParams]);

    // Reset page to 1 when search or platform changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, selectedPlatform]);

    // Reload when page changes
    useEffect(() => {
        loadCreators(currentPage);
    }, [currentPage]);

    const stats = useMemo(() => {
        const totalFollowers = creators.reduce((sum, c) => sum + (c.followers || 0), 0);
        const avgEngagement = creators.length
            ? creators.reduce((sum, c) => sum + (c.metrics?.engagementRate || 0), 0) / creators.length
            : 0;
        const platformCount = new Set(creators.flatMap(c => c.platforms || [])).size;
        return {
            total: pagination?.totalCount || creators.length,
            followers: totalFollowers >= 1000000 ? `${(totalFollowers / 1000000).toFixed(1)}M` : `${(totalFollowers / 1000).toFixed(0)}K`,
            engagement: avgEngagement.toFixed(1),
            platforms: platformCount
        };
    }, [creators, pagination]);

    const filtered = useMemo(() => {
        let result = creators;
        if (selectedPlatform !== 'all') result = result.filter(c => c.platforms?.includes(selectedPlatform));
        if (debouncedSearch) {
            const search = debouncedSearch.toLowerCase();
            result = result.filter(c => c.name?.toLowerCase().includes(search) || c.handle?.toLowerCase().includes(search));
        }
        return result;
    }, [creators, debouncedSearch, selectedPlatform]);

    const handleDeleteProfile = async (id) => {
        const prev = [...creators];
        const influencer = creators.find(c => c._id === id);
        setCreators(prev.filter(c => c._id !== id));
        setDeleting(null);
        try {
            await deleteInfluencer(id);
            toast.success(`${influencer?.name || 'Influencer'}'s profile deleted`);
        } catch (err) { setCreators(prev); toast.error(err.message || "Delete failed"); }
    };

    const handleDeletePlatform = async (id, platformName) => {
        const prev = [...creators];
        const influencer = creators.find(c => c._id === id);
        setCreators(creators.map(c => {
            if (c._id !== id) return c;
            const updatedPlatforms = c.platforms.filter(p => p !== platformName);
            const { [platformName]: removed, ...remainingPlatformData } = c.platformData || {};
            return { ...c, platforms: updatedPlatforms, platformData: remainingPlatformData };
        }));
        setDeleting(null);
        try {
            const result = await deleteInfluencerPlatform(id, platformName);
            toast.success(`${platformName} removed from ${influencer?.name || 'influencer'}`);
            if (result.deleted) setCreators(c => c.filter(item => item._id !== id));
            else loadCreators();
        } catch (err) { setCreators(prev); toast.error(err.message || "Platform removal failed"); }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <FiLoader className="animate-spin w-10 h-10 text-base-content/30" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-base-content">Creator Network</h1>
                <p className="text-base-content/50 font-medium mt-1">Manage influencers</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard icon={FiUsers} label="Creators" value={stats.total} />
                <StatCard icon={FiTrendingUp} label="Reach" value={stats.followers} />
                <StatCard icon={FiHeart} label="Engagement" value={`${stats.engagement}%`} />
                <StatCard icon={FiFilter} label="Platforms" value={stats.platforms} />
            </div>

            {/* Filter + Search */}
            <div className="bg-base-100 border border-base-content/10 rounded-xl p-4 mb-6 flex flex-col lg:flex-row gap-4">
                <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map(p => {
                        const Icon = p.icon;
                        const active = selectedPlatform === p.id;
                        return (
                            <button key={p.id} onClick={() => setSelectedPlatform(p.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${active ? 'bg-base-content text-base-100' : 'bg-base-200 text-base-content/60 hover:bg-base-300'}`}
                            >
                                <Icon className="w-4 h-4" />{p.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex gap-3 lg:ml-auto">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-base-content/30" />
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-base-200 border border-base-content/10 rounded-lg focus:outline-none focus:border-emerald-500 text-base-content placeholder:text-base-content/40 font-medium"
                            placeholder="Search..."
                        />
                    </div>

                    <div className="relative">
                        <button onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors"
                        >
                            <FiPlus className="w-4 h-4" />Add Creator
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 top-full mt-2 w-52 bg-base-100 rounded-xl border border-base-content/10 py-2 z-50 shadow-xl">
                                <div className="px-4 py-2 text-[10px] font-black text-base-content/30 uppercase tracking-widest">Import From</div>
                                {[
                                    { action: () => { setShowIG(true); setShowDropdown(false); }, icon: FaInstagram, color: 'text-pink-500', label: 'Instagram' },
                                    { action: () => { setShowYT(true); setShowDropdown(false); }, icon: FaYoutube, color: 'text-red-500', label: 'YouTube' },
                                    { action: () => { setShowFB(true); setShowDropdown(false); }, icon: FaFacebook, color: 'text-blue-500', label: 'Facebook' },
                                    { action: () => { setShowTT(true); setShowDropdown(false); }, icon: FaTiktok, color: 'text-base-content', label: 'TikTok' }
                                ].map(item => (
                                    <button key={item.label} onClick={item.action}
                                        className="flex items-center gap-3 px-4 py-2.5 w-full text-sm font-medium text-base-content/70 hover:bg-base-200 transition-colors"
                                    >
                                        <item.icon className={`w-4 h-4 ${item.color}`} />{item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            {creators.length > 0 ? (
                <>
                    <InfluencerTable data={creators} onDelete={(id) => setDeleting(creators.find(c => c._id === id))} onEdit={setEditing} />
                    {pagination && (
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            totalCount={pagination.totalCount}
                            limit={pagination.limit}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            ) : (
                <div className="text-center py-20">
                    <FiInbox className="mx-auto mb-4 w-12 h-12 text-base-content/20" />
                    <p className="text-base-content/40 font-medium">No creators found</p>
                </div>
            )}

            {/* Modals */}
            {showIG && <ImportInstagramModal onClose={() => setShowIG(false)} refresh={loadCreators} />}
            {showYT && <ImportYouTubeModal onClose={() => setShowYT(false)} refresh={loadCreators} />}
            {showFB && <ImportFacebookModal onClose={() => setShowFB(false)} refresh={loadCreators} />}
            {showTT && <ImportTikTokModal onClose={() => setShowTT(false)} refresh={loadCreators} />}
            {editing && <EditInfluencerModal data={editing} onClose={() => setEditing(null)} refresh={loadCreators} />}
            {deleting && (
                <DeleteInfluencerModal
                    influencer={deleting}
                    onClose={() => setDeleting(null)}
                    onDeleteProfile={handleDeleteProfile}
                    onDeletePlatform={handleDeletePlatform}
                />
            )}
        </div>
    );
};

export default InfluencerList;