import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

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

    // Prevent background scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 
                       bg-black/70 backdrop-blur-sm"
            onClick={handleOutsideClick}
        >
            <div
                ref={modalRef}
                className="w-full max-w-md rounded-2xl border border-base-content/10 
                           bg-base-100 shadow-2xl flex flex-col overflow-hidden
                           transition-all duration-200 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-base-content/10">
                    <h2 className="text-lg font-semibold text-base-content">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg text-base-content/50 
                                   hover:text-base-content hover:bg-base-200 
                                   transition active:scale-95"
                    >
                        <FiX size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 overflow-y-auto max-h-[70vh] text-base-content">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-base-content/10 bg-base-200 flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BaseModal;