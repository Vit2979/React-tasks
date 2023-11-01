import React from 'react';

interface SearchInputProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearchClick: () => void;
}

class SearchInput extends React.Component<SearchInputProps> {
  componentDidMount() {
    this.props.onSearchClick();
  }

  render() {
    const { searchQuery, onSearchQueryChange, onSearchClick } = this.props;

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
}

export default SearchInput;