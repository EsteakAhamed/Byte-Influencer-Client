import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalCount,
    limit,
    showTotal = true
}) => {
    if (totalPages <= 1) return null;

    // Calculate visible page numbers (show max 5 pages)
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();
    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, totalCount);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 py-6">
            {/* Page info */}
            {showTotal && (
                <div className="text-sm font-medium text-base-content/70">
                    Showing {startItem} to {endItem} of {totalCount} results
                </div>
            )}

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-outline min-w-[44px] min-h-[44px] border-base-content/20 hover:border-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous page"
                >
                    <FiChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers - Desktop */}
                <div className="hidden md:flex btn-group">
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            aria-label={`Go to page ${page}`}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={`btn btn-sm min-w-[44px] min-h-[44px] transition-all ${page === currentPage
                                    ? 'btn-primary'
                                    : 'btn-outline border-base-content/20 hover:border-primary hover:bg-primary/10'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Page info - Mobile only */}
                <div className="md:hidden px-4 py-2 text-sm font-medium text-base-content/70 bg-base-200 rounded-lg">
                    Page {currentPage} of {totalPages}
                </div>

                {/* Next button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-outline min-w-[44px] min-h-[44px] border-base-content/20 hover:border-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Next page"
                >
                    <FiChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
