import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiLoader, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import { createClient } from '../../services/clientService';
import BaseModal from './BaseModal';

const INPUT_CLS = "w-full px-4 py-3 bg-base-200 border border-base-content/15 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium text-base-content placeholder:text-base-content/40 transition-colors";
const LABEL_CLS = "text-sm font-bold text-base-content/70 ml-1";

const CreateClientModal = ({ onClose, refresh }) => {
    const [form, setForm] = useState({
        name: '', campaign: '', status: 'Active',
        stats: { budget: '', influencersCount: '', reach: '', engagementRate: '', campaignDuration: { startDate: '', endDate: '' }, conversions: '' }
    });
    const [loading, setLoading] = useState(false);

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
            await createClient(payload);
            toast.success('Client created successfully');
            refresh(); onClose();
        } catch (err) { toast.error(err.message || 'Failed to create client'); }
        finally { setLoading(false); }
    };

    const footer = (
        <div className="flex items-center gap-3 w-full sm:w-auto">
            <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2.5 border border-base-content/15 rounded-xl font-semibold text-base-content/70 hover:bg-base-300 transition-all disabled:opacity-50">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center disabled:opacity-50">
                {loading && <FiLoader className="animate-spin w-4 h-4 mr-2" />}
                {loading ? 'Creating...' : 'Create Client'}
            </button>
        </div>
    );

    return (
        <BaseModal title="New Partnership" onClose={onClose} footer={footer}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header Card */}
                <div className="p-4 rounded-2xl bg-base-200 border border-base-content/10 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-600/15 text-emerald-500"><FiBriefcase className="w-6 h-6" /></div>
                    <div><h4 className="font-bold text-base-content">Campaign Onboarding</h4><p className="text-xs text-base-content/50">Define the core identity and goals</p></div>
                </div>

                <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5"><label className={LABEL_CLS}>Client Name</label><input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Acme Corp" className={INPUT_CLS} required /></div>
                        <div className="space-y-1.5"><label className={LABEL_CLS}>Primary Campaign</label><input name="campaign" value={form.campaign} onChange={handleChange} placeholder="e.g. Q4 Growth" className={INPUT_CLS} required /></div>
                    </div>

                    <div className="space-y-1.5"><label className={LABEL_CLS}>Initial Status</label>
                        <select name="status" value={form.status} onChange={handleChange} className={INPUT_CLS}><option value="Active">Active</option><option value="Inactive">Inactive</option></select>
                    </div>

                    <div className="pt-2">
                        <div className="flex items-center gap-2 mb-4"><div className="h-px flex-1 bg-base-content/10"></div><span className="text-[10px] font-bold uppercase tracking-widest text-base-content/40 px-2 flex items-center gap-1.5"><FiTrendingUp className="w-3 h-3" />Growth Targets</span><div className="h-px flex-1 bg-base-content/10"></div></div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1.5"><label className={LABEL_CLS}>Budget ($)</label><input name="stats.budget" type="number" value={form.stats.budget} onChange={handleChange} placeholder="0" className={INPUT_CLS} /></div>
                            <div className="space-y-1.5"><label className={LABEL_CLS}>Influencer Goal</label><input name="stats.influencersCount" type="number" value={form.stats.influencersCount} onChange={handleChange} placeholder="0" className={INPUT_CLS} /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5"><label className={LABEL_CLS}>Target Reach</label><input name="stats.reach" type="number" value={form.stats.reach} onChange={handleChange} placeholder="0" className={INPUT_CLS} /></div>
                            <div className="space-y-1.5"><label className={LABEL_CLS}>Conversions</label><input name="stats.conversions" type="number" value={form.stats.conversions} onChange={handleChange} placeholder="0" className={INPUT_CLS} /></div>
                        </div>
                    </div>
                </div>
            </form>
        </BaseModal>
    );
};

export default CreateClientModal;
