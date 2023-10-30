import React, { Component } from 'react';
import SearchInput from './components/SearchInput';
import SummaryCard from './components/SummaryCard';

interface Planet {
  climate: string;
  rotation_period: number;
  orbital_period: number; 
  name: string;
  terrain: string;
}

interface AppState {
  searchQuery: string;
  searchResults: Planet[];
  loading: boolean;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResults: [],
      loading: false,
    };
  }

  fetchSearchResults = async (query: string) => {
    try {
      this.setState({ loading: true });

      const url = query
        ? `https://swapi.dev/api/planets/?search=${query}`
        : 'https://swapi.dev/api/planets/';

      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        searchResults: data.results || [],
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  handleSearchClick = () => {
    const { searchQuery: searchQuery } = this.state;
    const trimmedSearchQuery = searchQuery.trim();

    this.fetchSearchResults(trimmedSearchQuery);
  };

  render() {
    const { searchQuery: searchQuery, searchResults, loading } = this.state;

    return (
      <div className="container">
        <div>
          <SearchInput
            searchQuery={searchQuery}
            onSearchQueryChange={(query: string) =>
              this.setState({ searchQuery: query })
            }
            onSearchClick={this.handleSearchClick}
          />

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div id="bottom-section">
              {Array.isArray(searchResults) &&
                searchResults.map((planet: Planet) => (
                  <SummaryCard key={planet.name} planet={planet} />
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;