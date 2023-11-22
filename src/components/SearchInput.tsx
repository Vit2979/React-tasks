import React from 'react';

interface SearchInputProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearchClick: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  onSearchQueryChange,
  onSearchClick,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
      />
      <button onClick={onSearchClick}>Search</button>
    </div>
  );
};

export default SearchInput;