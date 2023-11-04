import React, { Component } from 'react';
import SearchInput from './components/SearchInput';
import SummaryCard from './components/SummaryCard';
import Pagination from './components/Pagination';
import './App.css';

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
  currentPage: number;
  totalPages: number;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResults: [],
      loading: false,
      currentPage: 1,
      totalPages: 1,
    };
  }

  componentDidMount() {
    const searchQuery = localStorage.getItem('searchQuery');
    if (searchQuery) {
      this.setState({ searchQuery });
      this.fetchSearchResults(searchQuery);
    }
  }

  fetchSearchResults = async (query: string, page: number = 1) => {
    try {
      this.setState({ loading: true });

      const url = query
        ? `https://swapi.dev/api/planets/?search=${query}&page=${page}`
        : `https://swapi.dev/api/planets/?page=${page}`;

      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        searchResults: data.results || [],
        loading: false,
        currentPage: page,
        totalPages: Math.ceil(data.count / 10),
      });

      localStorage.setItem('searchQuery', query);
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  handleSearchClick = () => {
    const { searchQuery } = this.state;
    const trimmedSearchQuery = searchQuery.trim();

    this.fetchSearchResults(trimmedSearchQuery);
  };

  handleSearchQueryChange = (query: string) => {
    this.setState({ searchQuery: query });
  };

  handlePageChange = (page: number) => {
    const { searchQuery } = this.state;
    this.fetchSearchResults(searchQuery, page);
  };

  render() {
    const { searchQuery, searchResults, loading, currentPage, totalPages } = this.state;

    return (
      <div className="container">
        <div>
          <SearchInput
            searchQuery={searchQuery}
            onSearchQueryChange={this.handleSearchQueryChange}
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

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default App;