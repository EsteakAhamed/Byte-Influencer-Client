import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';
import { updateClient } from '../../services/clientService';
import BaseModal from './BaseModal';

const INPUT_CLS = "w-full px-4 py-3 bg-base-200 border border-base-content/15 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium text-base-content placeholder:text-base-content/40 transition-colors";
const LABEL_CLS = "text-sm font-bold text-base-content/70 ml-1";

const EditClientModal = ({ client, onClose, refresh }) => {
    const [form, setForm] = useState({
        name: client.name || '', campaign: client.campaign || '', status: client.status || 'Active',
        stats: {
            budget: client.stats?.budget?.toString() || '', influencersCount: client.stats?.influencersCount?.toString() || '',
            reach: client.stats?.reach?.toString() || '', engagementRate: client.stats?.engagementRate?.toString() || '',
            campaignDuration: { startDate: client.stats?.campaignDuration?.startDate?.slice(0, 10) || '', endDate: client.stats?.campaignDuration?.endDate?.slice(0, 10) || '' },
            conversions: client.stats?.conversions?.toString() || ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('details');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('stats.')) {
            const field = name.replace('stats.', '');
            if (field.startsWith('duration.')) {
                const durField = field.replace('duration.', '');
                setForm(prev => ({ ...prev, stats: { ...prev.stats, campaignDuration: { ...prev.stats.campaignDuration, [durField]: value } } }));
            } else {
                const cleanValue = value === '' ? '' : value.replace(/^0+/, '') || '0';
                setForm(prev => ({ ...prev, stats: { ...prev.stats, [field]: cleanValue } }));
            }
        } else { setForm(prev => ({ ...prev, [name]: value })); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.campaign) return toast.error('Name and campaign are required');
        try {
            setLoading(true);
            const payload = { ...form, stats: { ...form.stats, budget: Number(form.stats.budget) || 0, influencersCount: Number(form.stats.influencersCount) || 0, reach: Number(form.stats.reach) || 0, engagementRate: Number(form.stats.engagementRate) || 0, conversions: Number(form.stats.conversions) || 0 } };
            await updateClient(client._id, payload);
            toast.success('Client updated');
            refresh(); onClose();
        } catch (err) { toast.error(err.message || 'Failed to update client'); }
        finally { setLoading(false); }
    };

    const tabCls = (isActive) => `flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${isActive ? 'bg-base-100 text-emerald-500 shadow-sm ring-1 ring-base-content/10' : 'text-base-content/50 hover:text-base-content/80 hover:bg-base-300'}`;

    const footer = (
        <>
            <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2.5 border border-base-content/15 rounded-xl font-semibold text-base-content/70 hover:bg-base-300 transition-all disabled:opacity-50">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50">
                {loading && <FiLoader className="animate-spin" />}
                Save Changes
            </button>
        </>
    );

    return (
        <BaseModal title="Edit Client" onClose={onClose} footer={footer}>
            <div className="flex bg-base-200 p-1 rounded-xl mb-6 gap-1">
                <button type="button" onClick={() => setActiveTab('details')} className={tabCls(activeTab === 'details')}>Details</button>
                <button type="button" onClick={() => setActiveTab('metrics')} className={tabCls(activeTab === 'metrics')}>Metrics</button>
            </div>

            <form onSubmit={handleSubmit}>
                {activeTab === 'details' && (
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-1.5"><label className={LABEL_CLS}>Client Name</label><input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Acme Corp" className={INPUT_CLS} required /></div>
                            <div className="space-y-1.5"><label className={LABEL_CLS}>Campaign Name</label><input name="campaign" value={form.campaign} onChange={handleChange} placeholder="e.g. Summer Launch" className={INPUT_CLS} required /></div>
                        </div>

                        <div className="space-y-1.5"><label className={LABEL_CLS}>Account Status</label>
                            <select name="status" value={form.status} onChange={handleChange} className={INPUT_CLS}><option value="Active">Active</option><option value="Inactive">Inactive</option></select>
                        </div>

                        <div className="pt-2">
                            <div className="flex items-center gap-2 mb-4"><div className="h-px flex-1 bg-base-content/10"></div><span className="text-[10px] font-bold uppercase tracking-widest text-base-content/40 px-2">Campaign Schedule</span><div className="h-px flex-1 bg-base-content/10"></div></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5"><label className={LABEL_CLS}>Start Date</label><input name="stats.duration.startDate" type="date" value={form.stats.campaignDuration.startDate} onChange={handleChange} className={INPUT_CLS} /></div>
                                <div className="space-y-1.5"><label className={LABEL_CLS}>End Date</label><input name="stats.duration.endDate" type="date" value={form.stats.campaignDuration.endDate} onChange={handleChange} className={INPUT_CLS} /></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'metrics' && (
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5"><label className={LABEL_CLS}>Budget ($)</label><input name="stats.budget" type="number" value={form.stats.budget} onChange={handleChange} placeholder="0" className={INPUT_CLS} /></div>
                            <div className="space-y-1.5"><label className={LABEL_CLS}>Influencers</label><input name="stats.influencersCount" type="number" value={form.stats.influencersCount} onChange={handleChange} placeholder="0" className={INPUT_CLS} /></div>
                        </div>
                        <div className="space-y-1.5"><label className={LABEL_CLS}>Total Reach</label><input name="stats.reach" type="number" value={form.stats.reach} onChange={handleChange} placeholder="0" className={INPUT_CLS} /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5"><label className={LABEL_CLS}>Engagement (%)</label><input name="stats.engagementRate" type="number" step="0.1" value={form.stats.engagementRate} onChange={handleChange} placeholder="0.0" className={INPUT_CLS} /></div>
                            <div className="space-y-1.5"><label className={LABEL_CLS}>Conversions</label><input name="stats.conversions" type="number" value={form.stats.conversions} onChange={handleChange} placeholder="0" className={INPUT_CLS} /></div>
                        </div>
                    </div>
                )}
            </form>
        </BaseModal>
    );
};

export default EditClientModal;
