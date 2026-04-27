import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { FiInstagram, FiYoutube, FiFacebook, FiUser, FiPlus, FiLoader } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { updateInfluencer } from '../../services/influencerService';
import BaseModal from './BaseModal';

const VALID_PLATFORMS = ['Instagram', 'YouTube', 'Facebook', 'TikTok'];
const platformIcons = { Instagram: FiInstagram, YouTube: FiYoutube, Facebook: FiFacebook, TikTok: FaTiktok };
const platformAccent = { Instagram: 'text-pink-500', YouTube: 'text-red-500', Facebook: 'text-blue-500', TikTok: 'text-base-content' };

const INPUT_CLS = "w-full px-4 py-3 bg-base-200 border border-base-content/15 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium text-base-content placeholder:text-base-content/40 transition-colors";
const LABEL_CLS = "text-sm font-semibold text-base-content/70 ml-1";

const EditInfluencerModal = ({ data, onClose, refresh }) => {
    const existingPlatforms = useMemo(() => data.platforms || [], [data.platforms]);
    const [activeTab, setActiveTab] = useState('profile');
    const [identity, setIdentity] = useState({ name: data.name || '', handle: data.handle || '' });
    const [platformForms, setPlatformForms] = useState(() => {
        const forms = {};
        existingPlatforms.forEach(pName => {
            const pd = data.platformData?.[pName] || {};
            forms[pName] = { followers: pd.followers?.toString() || '0', niche: pd.niche || 'General', status: pd.status || 'Active', avgLikes: pd.avgLikes?.toString() || '0', avgViews: pd.avgViews?.toString() || '0', engagementRate: pd.engagementRate?.toString() || '0' };
        });
        return forms;
    });
    const [newPlatformName, setNewPlatformName] = useState('');
    const [newPlatformForm, setNewPlatformForm] = useState({ followers: '0', niche: 'General', status: 'Active', avgLikes: '0', avgViews: '0', engagementRate: '0' });
    const [loading, setLoading] = useState(false);
    const availablePlatforms = useMemo(() => VALID_PLATFORMS.filter(p => !existingPlatforms.includes(p)), [existingPlatforms]);
    const cleanNum = (val) => val === '' ? '' : val.replace(/^0+(?=\d)/, '') || '0';

    const handlePlatformFieldChange = (platformName, field, value) => {
        const isNumeric = ['followers', 'avgLikes', 'avgViews', 'engagementRate'].includes(field);
        setPlatformForms(prev => ({ ...prev, [platformName]: { ...prev[platformName], [field]: isNumeric ? cleanNum(value) : value } }));
    };
    const handleNewPlatformFieldChange = (field, value) => {
        const isNumeric = ['followers', 'avgLikes', 'avgViews', 'engagementRate'].includes(field);
        setNewPlatformForm(prev => ({ ...prev, [field]: isNumeric ? cleanNum(value) : value }));
    };
    const buildPlatformPayload = (form) => ({ followers: Number(form.followers) || 0, niche: form.niche || 'General', status: form.status || 'Active', metrics: { avgLikes: Number(form.avgLikes) || 0, avgViews: Number(form.avgViews) || 0, engagementRate: Number(form.engagementRate) || 0 } });

    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            let payload = {};
            if (activeTab === 'profile') { payload = { name: identity.name, handle: identity.handle }; }
            else if (activeTab === 'add') {
                if (!newPlatformName) { toast.error('Select a platform to add'); setLoading(false); return; }
                payload = { platformName: newPlatformName, platformData: buildPlatformPayload(newPlatformForm) };
            } else {
                const form = platformForms[activeTab];
                if (!form) { toast.error('Platform data not found'); setLoading(false); return; }
                payload = { platformName: activeTab, platformData: buildPlatformPayload(form) };
            }
            const result = await updateInfluencer(data._id, payload);
            toast.success(result.message || 'Updated successfully');
            refresh(); onClose();
        } catch (error) { toast.error(error.message || 'Update failed'); }
        finally { setLoading(false); }
    };

    const renderPlatformFields = (form, onChange) => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5"><label className={LABEL_CLS}>Followers</label><input type="number" value={form.followers} onChange={(e) => onChange('followers', e.target.value)} className={INPUT_CLS} disabled={loading} min="0" /></div>
                <div className="space-y-1.5"><label className={LABEL_CLS}>Niche</label><input value={form.niche} onChange={(e) => onChange('niche', e.target.value)} placeholder="e.g. Fashion" className={INPUT_CLS} disabled={loading} /></div>
            </div>
            <div className="space-y-1.5"><label className={LABEL_CLS}>Status</label>
                <select value={form.status} onChange={(e) => onChange('status', e.target.value)} className={INPUT_CLS} disabled={loading}><option value="Active">Active</option><option value="Inactive">Inactive</option></select>
            </div>
            <div className="pt-2">
                <div className="flex items-center gap-2 mb-4"><div className="h-px flex-1 bg-base-content/10"></div><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/40 px-2">Performance Metrics</span><div className="h-px flex-1 bg-base-content/10"></div></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1.5"><label className={LABEL_CLS}>Avg. Likes</label><input type="number" value={form.avgLikes} onChange={(e) => onChange('avgLikes', e.target.value)} className={INPUT_CLS} disabled={loading} min="0" /></div>
                    <div className="space-y-1.5"><label className={LABEL_CLS}>Avg. Views</label><input type="number" value={form.avgViews} onChange={(e) => onChange('avgViews', e.target.value)} className={INPUT_CLS} disabled={loading} min="0" /></div>
                </div>
                <div className="space-y-1.5"><label className={LABEL_CLS}>Engagement Rate (%)</label>
                    <div className="relative"><input type="number" step="0.01" value={form.engagementRate} onChange={(e) => onChange('engagementRate', e.target.value)} className={`${INPUT_CLS} pr-10`} disabled={loading} min="0" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 font-bold">%</span></div>
                </div>
            </div>
        </div>
    );

    const tabCls = (isActive, accent) => `flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${isActive ? `bg-base-100 ${accent || 'text-emerald-500'} shadow-sm ring-1 ring-base-content/10` : 'text-base-content/50 hover:text-base-content/80 hover:bg-base-300'}`;

    const footer = (
        <div className="flex items-center gap-3 w-full sm:w-auto">
            <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2.5 border border-base-content/15 rounded-xl font-semibold text-base-content/70 hover:bg-base-300 transition-all disabled:opacity-50 flex-1 sm:flex-none">Cancel</button>
            <button type="button" onClick={handleSubmit} className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center disabled:opacity-50 flex-1 sm:flex-none" disabled={loading}>
                {loading ? <FiLoader className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Saving..." : activeTab === 'add' ? "Add Platform" : "Save Changes"}
            </button>
        </div>
    );

    return (
        <BaseModal title="Edit Influencer" onClose={onClose} footer={footer}>
            <div className="flex bg-base-200 p-1 rounded-xl mb-6 gap-1 overflow-x-auto no-scrollbar">
                <button type="button" onClick={() => setActiveTab('profile')} className={tabCls(activeTab === 'profile', 'text-emerald-500')}>
                    <FiUser className={`w-4 h-4 ${activeTab === 'profile' ? 'text-emerald-500' : ''}`} /> Profile
                </button>
                {existingPlatforms.map(pName => {
                    const Icon = platformIcons[pName] || FiUser;
                    const accent = platformAccent[pName] || 'text-base-content';
                    return (<button key={pName} type="button" onClick={() => setActiveTab(pName)} className={tabCls(activeTab === pName, accent)}><Icon className={`w-4 h-4 ${activeTab === pName ? accent : ''}`} />{pName}</button>);
                })}
                {availablePlatforms.length > 0 && (
                    <button type="button" onClick={() => setActiveTab('add')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${activeTab === 'add' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-500 hover:bg-base-300'}`}><FiPlus className="w-4 h-4" />Add</button>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-1.5"><label className="text-sm font-bold text-base-content/80 ml-1">Full Name</label><input value={identity.name} onChange={(e) => setIdentity(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. John Doe" className={INPUT_CLS} disabled={loading} /></div>
                            <div className="space-y-1.5"><label className="text-sm font-bold text-base-content/80 ml-1">Username / Handle</label><input value={identity.handle} onChange={(e) => setIdentity(prev => ({ ...prev, handle: e.target.value }))} placeholder="e.g. @johndoe" className={INPUT_CLS} disabled={loading} /></div>
                        </div>
                        <div className="p-4 rounded-xl bg-base-200 border border-base-content/10 flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-emerald-600/15 text-emerald-500"><FiUser className="w-5 h-5" /></div>
                            <div><h4 className="text-sm font-bold text-emerald-500">Identity Details</h4><p className="text-xs text-base-content/50 mt-0.5 leading-relaxed">Updating these fields will change the influencer's primary identity across the dashboard.</p></div>
                        </div>
                    </div>
                )}
                {existingPlatforms.includes(activeTab) && platformForms[activeTab] && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-3 border-b border-base-content/10">
                            <div className={`p-2.5 rounded-xl bg-base-200 ${platformAccent[activeTab] || 'text-base-content'}`}>{(() => { const Icon = platformIcons[activeTab] || FiUser; return <Icon className="w-5 h-5" />; })()}</div>
                            <div><h3 className="font-bold text-base-content">{activeTab} Analytics</h3><p className="text-xs text-base-content/50">Manage metrics and status for this platform</p></div>
                        </div>
                        {renderPlatformFields(platformForms[activeTab], (field, value) => handlePlatformFieldChange(activeTab, field, value))}
                    </div>
                )}
                {activeTab === 'add' && (
                    <div className="space-y-6">
                        <div className="space-y-1.5"><label className="text-sm font-bold text-base-content/80 ml-1">Select Platform</label>
                            <select value={newPlatformName} onChange={(e) => setNewPlatformName(e.target.value)} className={INPUT_CLS} disabled={loading}><option value="">— Choose a platform —</option>{availablePlatforms.map(p => (<option key={p} value={p}>{p}</option>))}</select>
                        </div>
                        {newPlatformName ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 pb-3 border-b border-base-content/10">
                                    <div className={`p-2.5 rounded-xl bg-base-200 ${platformAccent[newPlatformName] || 'text-base-content'}`}>{(() => { const Icon = platformIcons[newPlatformName] || FiUser; return <Icon className="w-5 h-5" />; })()}</div>
                                    <h3 className="font-bold text-base-content">New {newPlatformName} Profile</h3>
                                </div>
                                {renderPlatformFields(newPlatformForm, handleNewPlatformFieldChange)}
                            </div>
                        ) : (
                            <div className="text-center py-12 px-6 rounded-2xl bg-base-200 border-2 border-dashed border-base-content/15">
                                <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4"><FiPlus className="w-8 h-8 text-base-content/40" /></div>
                                <h4 className="font-bold text-base-content/70">Expand Presence</h4>
                                <p className="text-sm text-base-content/50 mt-1 max-w-50 mx-auto">Select a platform above to start tracking new metrics.</p>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </BaseModal>
    );
};

export default EditInfluencerModal;