import React from 'react';

interface SearchInputProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearchClick: () => void;
}

function SearchInput(props: SearchInputProps) {
  const { searchQuery, onSearchQueryChange, onSearchClick } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchQueryChange(e.target.value);
  };

  const handleClearClick = () => {
    onSearchQueryChange('');
  };

  return (
    <div id="top-section">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="button" onClick={onSearchClick}>
        Search
      </button>
      <button type="button" onClick={handleClearClick}>
        Clear
      </button>
    </div>
  );
}

export default SearchInput;
