import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Loader2, User, Plus } from 'lucide-react';
import { FiInstagram, FiYoutube, FiFacebook, FiUser } from 'react-icons/fi';
import { updateInfluencer } from '../../services/influencerService';
import BaseModal from './BaseModal';

const VALID_PLATFORMS = ['Instagram', 'YouTube', 'Facebook', 'TikTok'];

const platformIcons = {
    Instagram: FiInstagram,
    YouTube: FiYoutube,
    Facebook: FiFacebook,
    TikTok: FiUser
};

const platformColors = {
    Instagram: 'text-pink-500',
    YouTube: 'text-red-500',
    Facebook: 'text-blue-600',
    TikTok: 'text-gray-900'
};

const EditInfluencerModal = ({ data, onClose, refresh }) => {
    // Determine existing platforms from the data
    const existingPlatforms = useMemo(() => data.platforms || [], [data.platforms]);

    // Tabs: 'profile' | platform name | 'add'
    const [activeTab, setActiveTab] = useState('profile');

    // Identity fields
    const [identity, setIdentity] = useState({
        name: data.name || '',
        handle: data.handle || ''
    });

    // Platform-specific form data — keyed by platformName
    const [platformForms, setPlatformForms] = useState(() => {
        const forms = {};
        existingPlatforms.forEach(pName => {
            const pd = data.platformData?.[pName] || {};
            forms[pName] = {
                followers: pd.followers?.toString() || '0',
                niche: pd.niche || 'General',
                status: pd.status || 'Active',
                avgLikes: pd.avgLikes?.toString() || '0',
                avgViews: pd.avgViews?.toString() || '0',
                engagementRate: pd.engagementRate?.toString() || '0'
            };
        });
        return forms;
    });

    // Add-platform state
    const [newPlatformName, setNewPlatformName] = useState('');
    const [newPlatformForm, setNewPlatformForm] = useState({
        followers: '0',
        niche: 'General',
        status: 'Active',
        avgLikes: '0',
        avgViews: '0',
        engagementRate: '0'
    });

    const [loading, setLoading] = useState(false);

    // Platforms available to add (not already present)
    const availablePlatforms = useMemo(
        () => VALID_PLATFORMS.filter(p => !existingPlatforms.includes(p)),
        [existingPlatforms]
    );

    const cleanNum = (val) => val === '' ? '' : val.replace(/^0+(?=\d)/, '') || '0';

    const handlePlatformFieldChange = (platformName, field, value) => {
        const isNumeric = ['followers', 'avgLikes', 'avgViews', 'engagementRate'].includes(field);
        const cleaned = isNumeric ? cleanNum(value) : value;

        setPlatformForms(prev => ({
            ...prev,
            [platformName]: {
                ...prev[platformName],
                [field]: cleaned
            }
        }));
    };

    const handleNewPlatformFieldChange = (field, value) => {
        const isNumeric = ['followers', 'avgLikes', 'avgViews', 'engagementRate'].includes(field);
        const cleaned = isNumeric ? cleanNum(value) : value;
        setNewPlatformForm(prev => ({ ...prev, [field]: cleaned }));
    };

    const buildPlatformPayload = (form) => ({
        followers: Number(form.followers) || 0,
        niche: form.niche || 'General',
        status: form.status || 'Active',
        metrics: {
            avgLikes: Number(form.avgLikes) || 0,
            avgViews: Number(form.avgViews) || 0,
            engagementRate: Number(form.engagementRate) || 0
        }
    });

    const handleSubmit = async (e) => {
        e?.preventDefault();

        try {
            setLoading(true);
            let payload = {};

            if (activeTab === 'profile') {
                // Identity-only update
                payload = { name: identity.name, handle: identity.handle };
            } else if (activeTab === 'add') {
                // Adding a new platform
                if (!newPlatformName) {
                    toast.error('Select a platform to add');
                    setLoading(false);
                    return;
                }
                payload = {
                    platformName: newPlatformName,
                    platformData: buildPlatformPayload(newPlatformForm)
                };
            } else {
                // Editing an existing platform
                const form = platformForms[activeTab];
                if (!form) {
                    toast.error('Platform data not found');
                    setLoading(false);
                    return;
                }
                payload = {
                    platformName: activeTab,
                    platformData: buildPlatformPayload(form)
                };
            }

            const result = await updateInfluencer(data._id, payload);
            toast.success(result.message || 'Updated successfully');
            refresh();
            onClose();
        } catch (error) {
            toast.error(error.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    // --- Render helpers ---

    const renderPlatformFields = (form, onChange) => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1">Followers</label>
                    <input
                        type="number"
                        value={form.followers}
                        onChange={(e) => onChange('followers', e.target.value)}
                        className="input w-full px-3 py-2 bg-base-100 border border-base-content/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-base-content"
                        disabled={loading}
                        min="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1">Niche</label>
                    <input
                        value={form.niche}
                        onChange={(e) => onChange('niche', e.target.value)}
                        placeholder="General"
                        className="input w-full px-3 py-2 bg-base-100 border border-base-content/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-base-content"
                        disabled={loading}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-base-content/70 mb-1">Status</label>
                <select
                    value={form.status}
                    onChange={(e) => onChange('status', e.target.value)}
                    className="select w-full px-3 py-2 bg-base-100 border border-base-content/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-base-content"
                    disabled={loading}
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div className="pt-2">
                <h3 className="text-sm font-semibold text-base-content border-b border-base-content/10 pb-2 mb-3">Metrics</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-base-content/70 mb-1">Average Likes</label>
                        <input
                            type="number"
                            value={form.avgLikes}
                            onChange={(e) => onChange('avgLikes', e.target.value)}
                            className="input w-full px-3 py-2 bg-base-100 border border-base-content/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-base-content"
                            disabled={loading}
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-base-content/70 mb-1">Average Views</label>
                        <input
                            type="number"
                            value={form.avgViews}
                            onChange={(e) => onChange('avgViews', e.target.value)}
                            className="input w-full px-3 py-2 bg-base-100 border border-base-content/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-base-content"
                            disabled={loading}
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1">Engagement Rate (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={form.engagementRate}
                        onChange={(e) => onChange('engagementRate', e.target.value)}
                        className="input w-full px-3 py-2 bg-base-100 border border-base-content/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-base-content"
                        disabled={loading}
                        min="0"
                    />
                </div>
            </div>
        </div>
    );

    const footer = (
        <>
            <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="btn btn-ghost px-4 py-2 text-base-content/70 hover:bg-base-300 disabled:opacity-50 font-medium rounded-lg"
            >
                Cancel
            </button>
            <button 
                type="button"
                onClick={handleSubmit}
                className="btn px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center font-medium min-w-[100px] border-none"
                disabled={loading}
            >
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Saving..." : activeTab === 'add' ? "Add Platform" : "Save"}
            </button>
        </>
    );

    return (
        <BaseModal 
            title="Edit Influencer" 
            onClose={onClose} 
            footer={footer}
        >
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-1.5 mb-5 pb-3 border-b border-gray-100">
                {/* Profile tab */}
                <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'profile'
                            ? 'bg-base-content text-base-100 shadow-sm'
                            : 'bg-base-200 text-base-content/60 hover:bg-base-300'
                    }`}
                >
                    <User className="w-3.5 h-3.5" />
                    Profile
                </button>

                {/* Platform tabs */}
                {existingPlatforms.map(pName => {
                    const Icon = platformIcons[pName] || FiUser;
                    const color = activeTab === pName ? 'text-base-100' : (platformColors[pName] || 'text-base-content/60');
                    return (
                        <button
                            key={pName}
                            type="button"
                            onClick={() => setActiveTab(pName)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                activeTab === pName
                                    ? 'bg-base-content text-base-100 shadow-sm'
                                    : 'bg-base-200 text-base-content/60 hover:bg-base-300'
                            }`}
                        >
                            <Icon className={`w-3.5 h-3.5 ${color}`} />
                            {pName}
                        </button>
                    );
                })}

                {/* Add Platform tab (only if there are platforms to add) */}
                {availablePlatforms.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setActiveTab('add')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            activeTab === 'add'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                {/* Profile Tab Content */}
                {activeTab === 'profile' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-base-content/70 mb-1">Name</label>
                            <input
                                value={identity.name}
                                onChange={(e) => setIdentity(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="John Doe"
                                className="input w-full px-3 py-2 bg-base-100 border border-base-content/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-base-content"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-base-content/70 mb-1">Handle</label>
                            <input
                                value={identity.handle}
                                onChange={(e) => setIdentity(prev => ({ ...prev, handle: e.target.value }))}
                                placeholder="@johndoe"
                                className="input w-full px-3 py-2 bg-base-100 border border-base-content/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-base-content"
                                disabled={loading}
                            />
                        </div>
                    </div>
                )}

                {/* Existing Platform Tab Content */}
                {existingPlatforms.includes(activeTab) && platformForms[activeTab] && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            {(() => {
                                const Icon = platformIcons[activeTab] || FiUser;
                                return <Icon className={`w-5 h-5 ${platformColors[activeTab] || 'text-base-content/60'}`} />;
                            })()}
                            <h3 className="text-sm font-semibold text-base-content">
                                {activeTab} Platform Data
                            </h3>
                        </div>
                        {renderPlatformFields(
                            platformForms[activeTab],
                            (field, value) => handlePlatformFieldChange(activeTab, field, value)
                        )}
                    </div>
                )}

                {/* Add Platform Tab Content */}
                {activeTab === 'add' && (
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Platform</label>
                            <select
                                value={newPlatformName}
                                onChange={(e) => setNewPlatformName(e.target.value)}
                                className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                                disabled={loading}
                            >
                                <option value="">— Choose platform —</option>
                                {availablePlatforms.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        {newPlatformName && (
                            <>
                                <div className="flex items-center gap-2 mb-4">
                                    {(() => {
                                        const Icon = platformIcons[newPlatformName] || FiUser;
                                        return <Icon className={`w-5 h-5 ${platformColors[newPlatformName] || 'text-gray-600'}`} />;
                                    })()}
                                    <h3 className="text-sm font-semibold text-gray-800">
                                        New {newPlatformName} Data
                                    </h3>
                                </div>
                                {renderPlatformFields(newPlatformForm, handleNewPlatformFieldChange)}
                            </>
                        )}

                        {!newPlatformName && (
                            <div className="text-center py-8 text-gray-400">
                                <Plus className="w-10 h-10 mx-auto mb-2 opacity-40" />
                                <p className="text-sm">Select a platform above to add it to this influencer</p>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </BaseModal>
    );
};

export default EditInfluencerModal;