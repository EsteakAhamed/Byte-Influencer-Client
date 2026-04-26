import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiInstagram, FiYoutube, FiFacebook, FiUser, FiUsers, FiHeart, FiEye, FiActivity, FiBriefcase, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { fetchInfluencerProfile, deleteInfluencer, deleteInfluencerPlatform } from '../services/influencerService';
import EditInfluencerModal from '../components/modals/EditInfluencerModal';
import DeleteInfluencerModal from '../components/modals/DeleteInfluencerModal';
import toast from 'react-hot-toast';

// Platform icon mapping
const platformIcons = {
    Instagram: FiInstagram,
    YouTube: FiYoutube,
    Facebook: FiFacebook,
    TikTok: FiUser
};

// Platform colors
const platformColors = {
    Instagram: 'from-pink-500 to-purple-600',
    YouTube: 'from-red-500 to-red-700',
    Facebook: 'from-blue-500 to-blue-700',
    TikTok: 'from-gray-800 to-black'
};

const InfluencerProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    // Modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        loadProfile();
    }, [id]);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await fetchInfluencerProfile(id);
            setProfile(data);
            // Set first platform as active tab if not overview
            if (data.platforms?.length > 0) {
                setActiveTab(data.platforms[0]);
            }
        } catch (error) {
            toast.error(error.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    // Handle full profile deletion
    const handleDeleteProfile = async (influencerId) => {
        try {
            await deleteInfluencer(influencerId);
            toast.success(`${profile.name}'s profile deleted`);
            setShowDeleteModal(false);
            navigate('/influencers');
        } catch (error) {
            toast.error(error.message || 'Delete failed');
        }
    };

    // Handle single platform removal
    const handleDeletePlatform = async (influencerId, platformName) => {
        try {
            const result = await deleteInfluencerPlatform(influencerId, platformName);
            toast.success(`${platformName} removed from ${profile.name}`);
            setShowDeleteModal(false);

            if (result.deleted) {
                // Entire profile was deleted (no platforms left)
                navigate('/influencers');
            } else {
                // Refresh profile to show remaining platforms
                await loadProfile();
            }
        } catch (error) {
            toast.error(error.message || 'Platform removal failed');
        }
    };

    // Refresh profile after edit
    const handleEditRefresh = () => {
        loadProfile();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-base-content/60 mb-4">Influencer not found</p>
                    <Link to="/influencers" className="text-emerald-600 hover:underline">
                        Back to Influencers
                    </Link>
                </div>
            </div>
        );
    }

    const PlatformIcon = platformIcons[activeTab] || FiUser;
    const platformData = profile.platformData?.[activeTab] || {};

    return (
        <div className="min-h-screen bg-base-200 pb-12">
            {/* Header with back button and actions */}
            <div className="bg-base-100 border-b border-base-content/10">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/influencers')}
                                className="p-2 hover:bg-base-200 rounded-lg transition-colors"
                            >
                                <FiArrowLeft className="w-5 h-5 text-base-content/70" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-base-content">{profile.name}</h1>
                                <p className="text-base-content/60">{profile.handle}</p>
                            </div>
                        </div>

                        {/* Edit & Delete actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-base-content text-base-100 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                                <FiEdit2 className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-500/10 transition-colors"
                            >
                                <FiTrash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                {/* Profile Overview Card */}
                <div className="bg-base-100 rounded-2xl shadow-sm border border-base-content/5 p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                            {profile.name.charAt(0).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h2 className="text-xl font-bold text-base-content">{profile.name}</h2>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    profile.status === 'Active' 
                                        ? 'bg-emerald-100 text-emerald-700' 
                                        : 'bg-base-200 text-base-content/70'
                                }`}>
                                    {profile.status}
                                </span>
                            </div>
                            <p className="text-base-content/60 mb-2">{profile.handle}</p>
                            <p className="text-sm text-base-content/70">
                                <span className="font-medium">Niche:</span> {profile.niche}
                            </p>
                        </div>

                        {/* Aggregated Stats */}
                        <div className="grid grid-cols-3 gap-4 md:gap-8">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-base-content">
                                    {Number(profile.aggregated?.totalFollowers || 0).toLocaleString()}
                                </p>
                                <p className="text-xs text-base-content/40 uppercase tracking-wider">Total Followers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-emerald-600">
                                    {(profile.aggregated?.avgEngagement || 0).toFixed(2)}%
                                </p>
                                <p className="text-xs text-base-content/40 uppercase tracking-wider">Avg Engagement</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-base-content">
                                    {profile.aggregated?.platformCount || 0}
                                </p>
                                <p className="text-xs text-base-content/40 uppercase tracking-wider">Platforms</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Platform Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {['Instagram', 'YouTube', 'Facebook', 'TikTok'].map((platform) => {
                        const Icon = platformIcons[platform] || FiUser;
                        const hasData = profile.platforms?.includes(platform);
                        return (
                            <button
                                key={platform}
                                onClick={() => setActiveTab(platform)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                                    activeTab === platform
                                        ? 'bg-base-content text-base-100 shadow-lg'
                                        : hasData 
                                            ? 'bg-base-100 text-base-content hover:bg-base-200 border border-base-content/10'
                                            : 'bg-base-100 text-base-content/30 hover:bg-base-200 border border-base-content/5'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {platform}
                                {hasData && <span className="w-2 h-2 rounded-full bg-green-500 ml-1"></span>}
                            </button>
                        );
                    })}
                </div>

                {/* Platform Metrics */}
                {activeTab && profile.platformData?.[activeTab] ? (
                    <div className="bg-base-100 rounded-2xl shadow-sm border border-base-content/5 p-6 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${platformColors[activeTab] || 'from-gray-500 to-gray-700'} text-white`}>
                                <PlatformIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-base-content">{activeTab} Metrics</h3>
                                <p className="text-sm text-base-content/60">Performance data for {activeTab}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Followers */}
                            <div className="p-4 bg-base-200 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiUsers className="w-4 h-4 text-emerald-600" />
                                    <span className="text-sm text-base-content/60">Followers</span>
                                </div>
                                <p className="text-xl font-bold text-base-content">
                                    {Number(platformData.followers || 0).toLocaleString()}
                                </p>
                            </div>

                            {/* Avg Likes */}
                            <div className="p-4 bg-base-200 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiHeart className="w-4 h-4 text-pink-500" />
                                    <span className="text-sm text-base-content/60">Avg Likes</span>
                                </div>
                                <p className="text-xl font-bold text-base-content">
                                    {Number(platformData.avgLikes || 0).toLocaleString()}
                                </p>
                            </div>

                            {/* Avg Views */}
                            <div className="p-4 bg-base-200 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiEye className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm text-base-content/60">Avg Views</span>
                                </div>
                                <p className="text-xl font-bold text-base-content">
                                    {Number(platformData.avgViews || 0).toLocaleString()}
                                </p>
                            </div>

                            {/* Engagement Rate */}
                            <div className="p-4 bg-base-200 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiActivity className="w-4 h-4 text-purple-500" />
                                    <span className="text-sm text-base-content/60">Engagement</span>
                                </div>
                                <p className="text-xl font-bold text-emerald-600">
                                    {(platformData.engagementRate || 0).toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    </div>
                ) : activeTab ? (
                    <div className="bg-base-100 rounded-2xl shadow-sm border border-base-content/10 p-12 text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-base-200 mb-4 text-base-content/20">
                            <PlatformIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-base-content mb-2">No {activeTab} Data</h3>
                        <p className="text-base-content/60 max-w-md mx-auto">
                            We haven't imported any {activeTab} analytics for this influencer yet. Import their {activeTab} profile from the main dashboard to see stats here.
                        </p>
                    </div>
                ) : null}

                {/* Campaign Assignments Placeholder */}
                <div className="bg-base-100 rounded-2xl shadow-sm border border-base-content/10 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                            <FiBriefcase className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-base-content">Campaign Assignments</h3>
                            <p className="text-sm text-base-content/60">Active campaigns this influencer is assigned to</p>
                        </div>
                    </div>

                    <div className="text-center py-8 text-gray-400">
                        <FiBriefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No active campaign assignments</p>
                        <p className="text-sm mt-1">Link this influencer to a client campaign to see it here</p>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showEditModal && (
                <EditInfluencerModal
                    data={profile}
                    onClose={() => setShowEditModal(false)}
                    refresh={handleEditRefresh}
                />
            )}

            {showDeleteModal && (
                <DeleteInfluencerModal
                    influencer={profile}
                    onClose={() => setShowDeleteModal(false)}
                    onDeleteProfile={handleDeleteProfile}
                    onDeletePlatform={handleDeletePlatform}
                />
            )}
        </div>
    );
};

export default InfluencerProfile;
