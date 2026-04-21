import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { updateInfluencer } from '../../services/influencerService';
import BaseModal from './BaseModal';

const EditInfluencerModal = ({ data, onClose, refresh }) => {
    const [form, setForm] = useState({
        name: data.name || '',
        handle: data.handle || '',
        niche: data.niche || '',
        followers: data.followers?.toString() || '',
        status: data.status || 'Active',
        platforms: data.platforms || [],
        metrics: {
            avgLikes: data.metrics?.avgLikes?.toString() || '',
            avgViews: data.metrics?.avgViews?.toString() || '',
            engagementRate: data.metrics?.engagementRate?.toString() || ''
        }
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        // Clean number inputs (remove leading zeros)
        const cleanValue = key === 'followers'
            ? (value === '' ? '' : value.replace(/^0+/, '') || '0')
            : value;
        setForm(prev => ({ ...prev, [key]: cleanValue }));
    };

    const handleMetricsChange = (key, value) => {
        // Clean number inputs (remove leading zeros)
        const cleanValue = value === '' ? '' : value.replace(/^0+/, '') || '0';
        setForm(prev => ({
            ...prev,
            metrics: {
                ...prev.metrics,
                [key]: cleanValue
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            // Convert number strings to actual numbers before sending
            const payload = {
                ...form,
                followers: Number(form.followers) || 0,
                metrics: {
                    avgLikes: Number(form.metrics.avgLikes) || 0,
                    avgViews: Number(form.metrics.avgViews) || 0,
                    engagementRate: Number(form.metrics.engagementRate) || 0
                }
            };
            await updateInfluencer(data._id, payload);
            toast.success("Updated successfully");
            refresh();
            onClose();
        } catch (error) {
            toast.error(error.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    const footer = (
        <>
            <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="btn px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 font-medium"
            >
                Cancel
            </button>
            <button 
                type="button"
                onClick={handleSubmit}
                className="btn px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center font-medium min-w-[100px]"
                disabled={loading}
            >
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Saving..." : "Save"}
            </button>
        </>
    );

    return (
        <BaseModal 
            title="Edit Influencer" 
            onClose={onClose} 
            footer={footer}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="John Doe"
                        className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Handle</label>
                    <input
                        value={form.handle}
                        onChange={(e) => handleChange('handle', e.target.value)}
                        placeholder="@johndoe"
                        className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                        disabled={loading}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
                        <input
                            value={form.niche}
                            onChange={(e) => handleChange('niche', e.target.value)}
                            placeholder="Tech"
                            className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
                        <input
                            type="number"
                            value={form.followers}
                            onChange={(e) => handleChange('followers', e.target.value)}
                            placeholder="0"
                            className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                            disabled={loading}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        value={form.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                        disabled={loading}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="pt-2">
                    <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">Metrics</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Average Likes</label>
                            <input
                                type="number"
                                value={form.metrics.avgLikes}
                                onChange={(e) => handleMetricsChange('avgLikes', e.target.value)}
                                className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Average Views</label>
                            <input
                                type="number"
                                value={form.metrics.avgViews}
                                onChange={(e) => handleMetricsChange('avgViews', e.target.value)}
                                className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Engagement Rate (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={form.metrics.engagementRate}
                            onChange={(e) => handleMetricsChange('engagementRate', e.target.value)}
                            className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                            disabled={loading}
                        />
                    </div>
                </div>

            </form>
        </BaseModal>
    );
};

export default EditInfluencerModal;