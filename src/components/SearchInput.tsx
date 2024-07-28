import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

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
  const { theme } = useContext(ThemeContext);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchQueryChange(e.target.value);
  };

  const handleSearchClick = () => {
    onSearchClick();
  };

  return (
    <div id="top-section" className={theme}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      <button type="button" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;