import { useEffect, useState } from 'react';
import { SearchParams } from '../types';

export const useSearchParams = () => {
  // Parse search params from URL
  const getInitialSearchParams = (): SearchParams => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      search: urlParams.get('search') || '',
      consultationType: urlParams.get('consultationType') || '',
      specialty: urlParams.getAll('specialty'),
      sortBy: urlParams.get('sortBy') || '',
    };
  };

  const [searchParams, setSearchParams] = useState<SearchParams>(getInitialSearchParams);

  // Update URL with search params
  const updateSearchParams = (newParams: Partial<SearchParams>) => {
    const updatedParams = { ...searchParams, ...newParams };
    setSearchParams(updatedParams);

    const urlParams = new URLSearchParams();
    
    if (updatedParams.search) {
      urlParams.set('search', updatedParams.search);
    }
    
    if (updatedParams.consultationType) {
      urlParams.set('consultationType', updatedParams.consultationType);
    }
    
    if (updatedParams.specialty && updatedParams.specialty.length > 0) {
      // Delete all specialty params and add new ones
      urlParams.delete('specialty');
      updatedParams.specialty.forEach(spec => {
        urlParams.append('specialty', spec);
      });
    }
    
    if (updatedParams.sortBy) {
      urlParams.set('sortBy', updatedParams.sortBy);
    }
    
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // Listen for popstate (browser back/forward) events
  useEffect(() => {
    const handlePopState = () => {
      setSearchParams(getInitialSearchParams());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return { searchParams, updateSearchParams };
};