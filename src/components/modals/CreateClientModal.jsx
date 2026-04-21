import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';
import { createClient } from '../../services/clientService';
import BaseModal from './BaseModal';

const CreateClientModal = ({ onClose, refresh }) => {
    const [form, setForm] = useState({
        name: '',
        campaign: '',
        status: 'Active',
        stats: {
            budget: '',
            influencersCount: '',
            reach: '',
            engagementRate: '',
            campaignDuration: { startDate: '', endDate: '' },
            conversions: ''
        }
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('stats.')) {
            const field = name.replace('stats.', '');
            if (field.startsWith('duration.')) {
                const durField = field.replace('duration.', '');
                setForm(prev => ({
                    ...prev,
                    stats: {
                        ...prev.stats,
                        campaignDuration: { ...prev.stats.campaignDuration, [durField]: value }
                    }
                }));
            } else {
                // Allow empty string or valid numbers only (no leading zeros)
                const cleanValue = value === '' ? '' : value.replace(/^0+/, '') || '0';
                setForm(prev => ({
                    ...prev,
                    stats: { ...prev.stats, [field]: cleanValue }
                }));
            }
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.campaign) {
            return toast.error('Name and campaign are required');
        }

        try {
            setLoading(true);
            // Convert number strings to actual numbers before sending
            const payload = {
                ...form,
                stats: {
                    ...form.stats,
                    budget: Number(form.stats.budget) || 0,
                    influencersCount: Number(form.stats.influencersCount) || 0,
                    reach: Number(form.stats.reach) || 0,
                    engagementRate: Number(form.stats.engagementRate) || 0,
                    conversions: Number(form.stats.conversions) || 0
                }
            };
            await createClient(payload);
            toast.success('Client created');
            refresh();
            onClose();
        } catch (err) {
            toast.error(err.message || 'Failed to create client');
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
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
            >
                Cancel
            </button>
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
            >
                {loading && <FiLoader className="animate-spin" />}
                Create Client
            </button>
        </>
    );

    return (
        <BaseModal title="Create Client" onClose={onClose} footer={footer}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
                            placeholder="Company Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
                        <input
                            name="campaign"
                            value={form.campaign}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
                            placeholder="Campaign Name"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                        <input
                            name="stats.budget"
                            type="number"
                            value={form.stats.budget}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Influencers</label>
                        <input
                            name="stats.influencersCount"
                            type="number"
                            value={form.stats.influencersCount}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reach</label>
                        <input
                            name="stats.reach"
                            type="number"
                            value={form.stats.reach}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                            name="stats.duration.startDate"
                            type="date"
                            value={form.stats.campaignDuration.startDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            name="stats.duration.endDate"
                            type="date"
                            value={form.stats.campaignDuration.endDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
                        />
                    </div>
                </div>
            </form>
        </BaseModal>
    );
};

export default CreateClientModal;
