import React, { useState } from 'react';
import { FiLoader, FiAlertTriangle, FiInstagram, FiYoutube, FiFacebook, FiUser } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import BaseModal from './BaseModal';

const platformIcons = { Instagram: FiInstagram, YouTube: FiYoutube, Facebook: FiFacebook, TikTok: FaTiktok };
const platformAccent = {
    Instagram: { text: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    YouTube: { text: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    Facebook: { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    TikTok: { text: 'text-base-content', bg: 'bg-base-content/10', border: 'border-base-content/20' }
};

const DeleteInfluencerModal = ({ influencer, onClose, onDeleteProfile, onDeletePlatform }) => {
    const [loading, setLoading] = useState(false);
    const [deleteMode, setDeleteMode] = useState('profile');
    const platforms = influencer.platforms || [];
    const hasPlatforms = platforms.length > 0;

    const handleConfirm = async () => {
        setLoading(true);
        try {
            if (deleteMode === 'profile') await onDeleteProfile(influencer._id);
            else await onDeletePlatform(influencer._id, deleteMode);
        } finally { setLoading(false); }
    };

    const footer = (
        <div className="grid grid-cols-2 gap-3 w-full">
            <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2.5 border border-base-content/15 rounded-xl font-bold text-base-content/70 hover:bg-base-300 transition-all disabled:opacity-50">Keep Profile</button>
            <button onClick={handleConfirm} disabled={loading} className={`px-4 py-2.5 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center border-none text-white disabled:opacity-50 ${deleteMode === 'profile' ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}>
                {loading ? <FiLoader className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Processing..." : deleteMode === 'profile' ? "Delete Everything" : `Remove ${deleteMode}`}
            </button>
        </div>
    );

    return (
        <BaseModal title="Removal Options" onClose={onClose} footer={footer}>
            <div className="space-y-6">
                {/* Target profile header */}
                <div className="text-center p-5 rounded-2xl bg-base-200 border border-base-content/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.04] pointer-events-none"><FiAlertTriangle size={80} /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30">Target Profile</p>
                    <p className="text-xl font-black text-base-content mt-1">{influencer.name}</p>
                    <p className="text-sm font-bold text-primary mt-0.5">{influencer.handle}</p>
                </div>

                {/* Selection Section */}
                <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-wider text-base-content/40 ml-1">Choose Scope</p>

                    {/* Delete entire profile — DANGER HIGHLIGHT */}
                    <label className={`group flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${deleteMode === 'profile' ? 'border-red-500 bg-red-500/10' : 'border-base-content/10 bg-base-100 hover:border-base-content/20'}`}>
                        <div className="mt-1"><input type="radio" name="deleteMode" value="profile" checked={deleteMode === 'profile'} onChange={() => setDeleteMode('profile')} className="radio radio-error radio-sm" /></div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <FiAlertTriangle className={`w-4 h-4 ${deleteMode === 'profile' ? 'text-red-500' : 'text-base-content/40'}`} />
                                <span className={`font-black text-sm ${deleteMode === 'profile' ? 'text-red-500' : 'text-base-content'}`}>Delete Entire Profile</span>
                            </div>
                            <p className="text-xs font-medium text-base-content/50 mt-1 leading-relaxed">Permanently wipe <strong>{influencer.name}</strong> and all associated platform statistics. This is irreversible.</p>
                        </div>
                    </label>

                    {/* Platform separator */}
                    {hasPlatforms && (
                        <div className="flex items-center gap-3 py-2"><div className="h-px flex-1 bg-base-content/10"></div><span className="text-[10px] font-black text-base-content/25 uppercase tracking-widest">Or Selective Platform</span><div className="h-px flex-1 bg-base-content/10"></div></div>
                    )}

                    {/* Individual platform options */}
                    {hasPlatforms && (
                        <div className="grid grid-cols-1 gap-3">
                            {platforms.map(pName => {
                                const Icon = platformIcons[pName] || FiUser;
                                const accent = platformAccent[pName] || platformAccent.TikTok;
                                const isSelected = deleteMode === pName;
                                return (
                                    <label key={pName} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${isSelected ? 'border-orange-500 bg-orange-500/10' : 'border-base-content/10 bg-base-100 hover:border-base-content/20'}`}>
                                        <input type="radio" name="deleteMode" value={pName} checked={isSelected} onChange={() => setDeleteMode(pName)} className="radio radio-warning radio-sm" />
                                        <div className={`p-2 rounded-xl ${accent.bg} ${accent.text} border ${accent.border}`}><Icon className="w-4 h-4" /></div>
                                        <div className="flex-1">
                                            <span className={`font-bold text-sm ${isSelected ? 'text-orange-500' : 'text-base-content'}`}>{pName} Data</span>
                                            <p className="text-xs font-medium text-base-content/40">Remove only {pName} metrics</p>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Warning messages */}
                <div>
                    {deleteMode === 'profile' ? (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25">
                            <div className="p-1.5 rounded-lg bg-red-500/20"><FiAlertTriangle className="w-4 h-4 text-red-500" /></div>
                            <div>
                                <h5 className="text-xs font-black text-red-500 uppercase tracking-wider">Danger Zone</h5>
                                <p className="text-[11px] text-red-400 font-bold mt-1 leading-relaxed">This action will destroy all records for {influencer.name} including {platforms.join(', ')} data. No recovery is possible.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-500/10 border border-orange-500/25">
                            <div className="p-1.5 rounded-lg bg-orange-500/20"><FiAlertTriangle className="w-4 h-4 text-orange-500" /></div>
                            <div>
                                <h5 className="text-xs font-black text-orange-500 uppercase tracking-wider">Partial Deletion</h5>
                                <p className="text-[11px] text-orange-400 font-bold mt-1 leading-relaxed">Only <strong>{deleteMode}</strong> will be removed. Other platform data will remain protected and active.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </BaseModal>
    );
};

export default DeleteInfluencerModal;
