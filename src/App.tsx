import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchInput from './components/SearchInput';
import SummaryCard from './components/SummaryCard';
import Pagination from './components/Pagination';
import NotFound from './pages/NotFound';
import useSearchQuery from './hooks/useSearchQuery';
import './App.css';

interface Planet {
  climate: string;
  rotation_period: number;
  orbital_period: number;
  name: string;
  terrain: string;
}

const App: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [searchResults, setSearchResults] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]);

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      let allPlanets: Planet[] = [];
      let nextUrl: string | null = 'https://swapi.dev/api/planets/';
      
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        allPlanets = [...allPlanets, ...data.results];
        nextUrl = data.next; 
      }

      setSearchResults(allPlanets);
      setTotalPages(Math.ceil(allPlanets.length / itemsPerPage));
    } catch (error) {
      console.error('Ошибка при загрузке всех планет:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (query: string) => {
    try {
      setLoading(true);
      const url = `https://swapi.dev/api/planets/?search=${query}`;
      const response = await fetch(url);
      const data = await response.json();

      setSearchResults(data.results || []);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
      setCurrentPage(1);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchInput searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div id="bottom-section">
                    {searchResults
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((planet) => (
                        <SummaryCard key={planet.name} planet={planet} />
                      ))}
                  </div>
                )}
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

