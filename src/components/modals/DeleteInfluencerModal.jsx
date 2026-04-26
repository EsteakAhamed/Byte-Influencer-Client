import React, { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { FiInstagram, FiYoutube, FiFacebook, FiUser } from 'react-icons/fi';
import BaseModal from './BaseModal';

const platformIcons = {
    Instagram: FiInstagram,
    YouTube: FiYoutube,
    Facebook: FiFacebook,
    TikTok: FiUser
};

const platformColors = {
    Instagram: 'text-pink-500 bg-pink-50 border-pink-200',
    YouTube: 'text-red-500 bg-red-50 border-red-200',
    Facebook: 'text-blue-600 bg-blue-50 border-blue-200',
    TikTok: 'text-gray-900 bg-gray-100 border-gray-300'
};

const DeleteInfluencerModal = ({ influencer, onClose, onDeleteProfile, onDeletePlatform }) => {
    const [loading, setLoading] = useState(false);
    // 'profile' or a platform name
    const [deleteMode, setDeleteMode] = useState('profile');

    const platforms = influencer.platforms || [];
    const hasPlatforms = platforms.length > 0;

    const handleConfirm = async () => {
        setLoading(true);
        try {
            if (deleteMode === 'profile') {
                await onDeleteProfile(influencer._id);
            } else {
                await onDeletePlatform(influencer._id, deleteMode);
            }
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
                onClick={handleConfirm}
                className={`btn px-4 py-2 text-white rounded-lg disabled:opacity-50 flex items-center justify-center font-medium min-w-[120px] ${
                    deleteMode === 'profile' 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-orange-500 hover:bg-orange-600'
                }`}
                disabled={loading}
            >
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading 
                    ? "Deleting..." 
                    : deleteMode === 'profile' 
                        ? "Delete Profile" 
                        : `Remove ${deleteMode}`
                }
            </button>
        </>
    );

    return (
        <BaseModal 
            title="Delete Options" 
            onClose={onClose} 
            footer={footer}
        >
            <div className="space-y-4">
                {/* Influencer name header */}
                <div className="text-center pb-3 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Managing</p>
                    <p className="text-lg font-semibold text-gray-900">{influencer.name}</p>
                    <p className="text-xs text-gray-400">{influencer.handle}</p>
                </div>

                {/* Delete entire profile option */}
                <label
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        deleteMode === 'profile'
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                    <input
                        type="radio"
                        name="deleteMode"
                        value="profile"
                        checked={deleteMode === 'profile'}
                        onChange={() => setDeleteMode('profile')}
                        className="mt-0.5 accent-red-600"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="font-medium text-gray-900 text-sm">Delete Entire Profile</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Permanently removes <strong>{influencer.name}</strong> and all associated platform data. This cannot be undone.
                        </p>
                    </div>
                </label>

                {/* Remove individual platform options */}
                {hasPlatforms && (
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
                            Or remove a single platform
                        </p>
                        <div className="space-y-2">
                            {platforms.map(pName => {
                                const Icon = platformIcons[pName] || FiUser;
                                const colors = platformColors[pName] || 'text-gray-600 bg-gray-50 border-gray-200';
                                const isSelected = deleteMode === pName;

                                return (
                                    <label
                                        key={pName}
                                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                            isSelected
                                                ? `border-orange-400 bg-orange-50`
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="deleteMode"
                                            value={pName}
                                            checked={isSelected}
                                            onChange={() => setDeleteMode(pName)}
                                            className="accent-orange-500"
                                        />
                                        <div className={`p-1.5 rounded-lg border ${colors}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-medium text-gray-900 text-sm">{pName}</span>
                                            <p className="text-xs text-gray-500">
                                                Remove only {pName} data — other platforms stay intact
                                            </p>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Warning banner */}
                {deleteMode === 'profile' && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-red-700">
                            This will permanently delete the influencer profile including {platforms.length > 0 ? `all ${platforms.length} platform(s): ${platforms.join(', ')}` : 'all data'}. This action cannot be undone.
                        </p>
                    </div>
                )}

                {deleteMode !== 'profile' && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-amber-700">
                            Only <strong>{deleteMode}</strong> data will be removed. {platforms.length > 1 
                                ? `The remaining platform${platforms.length - 1 > 1 ? 's' : ''} (${platforms.filter(p => p !== deleteMode).join(', ')}) will stay intact.`
                                : 'Since this is the only platform, the influencer profile will still exist but with no platform data.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </BaseModal>
    );
};

export default DeleteInfluencerModal;
