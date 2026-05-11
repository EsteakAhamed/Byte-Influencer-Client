import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../utils/scroll';

export const useScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Small delay to ensure DOM is ready after route change
        const timer = setTimeout(() => {
            scrollToTop('smooth');
        }, 50);
        return () => clearTimeout(timer);
    }, [pathname]);
};
