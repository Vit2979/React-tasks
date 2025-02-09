import React from 'react';

interface SearchInputProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, onSearchQueryChange }) => {
  return (
    <div id="top-section">
      <input type="text" value={searchQuery} onChange={(e) => onSearchQueryChange(e.target.value)} />
      <button type="button" onClick={() => onSearchQueryChange(searchQuery.trim())}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
