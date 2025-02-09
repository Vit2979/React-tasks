import { useState, useEffect } from 'react';

const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || '';
  });

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  return { searchQuery, setSearchQuery };
};

export default useSearchQuery;
