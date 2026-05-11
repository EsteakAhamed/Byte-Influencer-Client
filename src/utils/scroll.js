// Layout uses fixed sidebar with scrolling main content, not document scroll
// Standard window.scrollTo won't work - must target the specific overflow container

const SCROLL_CONTAINER_ID = 'main-scroll-container';

export const scrollToTop = (behavior = 'smooth') => {
    const container = document.getElementById(SCROLL_CONTAINER_ID);
    if (container) {
        container.scrollTo({ top: 0, behavior });
    } else {
        window.scrollTo({ top: 0, behavior });
    }
};

export const getScrollContainer = () => {
    return document.getElementById(SCROLL_CONTAINER_ID);
};
