import React, { useEffect } from 'react';

interface SearchInputProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearchClick: () => void;
}

function SearchInput(props: SearchInputProps) {
  const { searchQuery, onSearchQueryChange, onSearchClick } = props;

  useEffect(() => {
    onSearchClick();
  }, [onSearchClick]);

  return (
    <div id="top-section">
      <input
        type="text"
        value={searchQuery}
        onClick={() => onSearchQueryChange('')}
        onChange={(e) => onSearchQueryChange(e.target.value)}
      />
      <button type="button" onClick={onSearchClick}>
        Search
      </button>
    </div>
  );
}

export default SearchInput;