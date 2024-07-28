import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Pagination from './components/Pagination';
import SearchInput from './components/SearchInput';
import SummaryCard, { Planet } from './components/SummaryCard';

const App: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch planet data from an API
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets/');
      const data = await response.json();
      setPlanets(data.results);
    };
    fetchPlanets();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchClick = () => {
    // Perform search logic
  };

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlanets = filteredPlanets.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <ThemeProvider>
      <SearchInput
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        onSearchClick={handleSearchClick}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredPlanets.length / itemsPerPage)}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      <div className="summary-card-container">
        {currentPlanets.map((planet) => (
          <SummaryCard key={planet.name} planet={planet} />
        ))}
      </div>
    </ThemeProvider>
  );
};

export default App;

