import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const BaseModal = ({
    onClose,
    title,
    children,
    footer
}) => {
    const modalRef = useRef(null);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Close on outside click
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={handleOutsideClick}
        >
            <div
                ref={modalRef}
                className="bg-base-100 rounded-2xl shadow-xl w-full max-w-md flex flex-col border border-base-content/5"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-base-content/10">
                    <h2 className="text-xl font-semibold text-base-content">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-base-content/40 hover:text-base-content transition-colors p-1 rounded-full hover:bg-base-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body - scrolls internally */}
                <div className="px-6 py-5 overflow-y-auto max-h-[70vh] text-sm text-base-content/70">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 bg-base-200 flex justify-end gap-3 border-t border-base-content/10 rounded-b-2xl">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BaseModal;
