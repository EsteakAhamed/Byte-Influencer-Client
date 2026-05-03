import { useState, useEffect, useRef } from 'react';

// Animate numbers with easing for dashboard stat cards
export const useCountUp = (target, duration = 1000) => {
    const [displayValue, setDisplayValue] = useState(0);
    const startTimeRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        // Restart animation whenever target value changes
        setDisplayValue(0);
        startTimeRef.current = null;

        const animate = (currentTime) => {
            if (!startTimeRef.current) {
                startTimeRef.current = currentTime;
            }

            const elapsed = currentTime - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            // Slow down as we approach the target for natural feel
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * target);

            setDisplayValue(currentValue);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setDisplayValue(target);
            }
        };

        if (target > 0) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            setDisplayValue(target);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [target, duration]);

    return displayValue;
};

export default useCountUp;
