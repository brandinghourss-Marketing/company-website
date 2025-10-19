import { useState, useEffect } from 'react';

// Global state to store all fetched data
let globalCache = {};
let cacheSetters = [];

const updateCache = (newCache) => {
  globalCache = { ...globalCache, ...newCache };
  cacheSetters.forEach(setter => setter(globalCache));
};

export const useContent = (filePath, section = null) => {
  const [cache, setCache] = useState(globalCache);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Register this component's cache setter
    cacheSetters.push(setCache);
    return () => {
      cacheSetters = cacheSetters.filter(setter => setter !== setCache);
    };
  }, []);

  useEffect(() => {
    // Check if data is already in memory cache
    if (cache[filePath]) {
      setLoading(false);
      return;
    }

    // Fetch data if not cached
    fetch(`/data/${filePath}.json`)
      .then(res => res.json())
      .then(data => {
        updateCache({ [filePath]: data });
        setLoading(false);
      });
  }, [filePath, cache]);

  const content = cache[filePath] ? 
    (section ? cache[filePath][section] : cache[filePath]) : null;

  return { content, loading };
};