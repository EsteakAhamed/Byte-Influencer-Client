import { useState, useCallback, useRef } from 'react';

const CACHE_SIZE = 5;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

const useQueryCache = () => {
    const [cache, setCache] = useState(new Map());
    const cacheRef = useRef(cache);

    // Keep ref in sync with state
    cacheRef.current = cache;

    // Generate cache key from query parameters
    const generateKey = useCallback((params) => {
        return JSON.stringify(params);
    }, []);

    // Check if cache entry is expired
    const isExpired = useCallback((entry) => {
        return Date.now() - entry.timestamp > CACHE_TTL;
    }, []);

    // Get cached data if available and not expired
    const get = useCallback((params) => {
        const key = generateKey(params);
        const entry = cacheRef.current.get(key);

        if (!entry) return null;

        if (isExpired(entry)) {
            cacheRef.current.delete(key);
            setCache(new Map(cacheRef.current));
            return null;
        }

        return entry.data;
    }, [generateKey, isExpired]);

    // Set data in cache
    const set = useCallback((params, data) => {
        const key = generateKey(params);
        const newCache = new Map(cacheRef.current);

        // Remove oldest entry if cache is full
        if (newCache.size >= CACHE_SIZE) {
            const oldestKey = newCache.keys().next().value;
            newCache.delete(oldestKey);
        }

        newCache.set(key, {
            data,
            timestamp: Date.now()
        });

        cacheRef.current = newCache;
        setCache(newCache);
    }, [generateKey]);

    // Clear specific cache entry
    const invalidate = useCallback((params) => {
        const key = generateKey(params);
        const newCache = new Map(cacheRef.current);
        newCache.delete(key);
        cacheRef.current = newCache;
        setCache(newCache);
    }, [generateKey]);

    // Clear entire cache
    const clear = useCallback(() => {
        const newCache = new Map();
        cacheRef.current = newCache;
        setCache(newCache);
    }, []);

    // Get cache size for debugging
    const size = useCallback(() => {
        return cacheRef.current.size;
    }, []);

    return {
        get,
        set,
        invalidate,
        clear,
        size
    };
};

export default useQueryCache;
