import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { importFacebook } from '../../services/influencerService';
import BaseModal from './BaseModal';

const ImportFacebookModal = ({ onClose, refresh }) => {
    const [fbUrl, setFbUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImport = async (e) => {
        e.preventDefault();

        if (!fbUrl.includes("facebook.com")) {
            return toast.error("Invalid Facebook URL");
        }

        try {
            setLoading(true);
            const res = await importFacebook(fbUrl);
            
            if (res && res.message === "Influencer already exists") {
                toast("Already exists", { icon: "ℹ️" });
            } else {
                toast.success("Imported successfully");
            }

            refresh();
            onClose();
        } catch (error) {
            toast.error(error.message || "Import failed");
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
                onClick={handleImport}
                className="btn px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center font-medium min-w-[100px]"
                disabled={loading || !fbUrl.trim()}
            >
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Importing..." : "Import"}
            </button>
        </>
    );

    return (
        <BaseModal 
            title="Import Facebook" 
            onClose={onClose} 
            footer={footer}
        >
            <form onSubmit={handleImport} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook Page URL
                </label>
                <input
                    value={fbUrl}
                    onChange={(e) => setFbUrl(e.target.value)}
                    placeholder="https://facebook.com/pagename"
                    className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    disabled={loading}
                    autoFocus
                />
            </form>
        </BaseModal>
    );
};

export default ImportFacebookModal;
