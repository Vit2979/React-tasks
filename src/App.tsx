import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { setSearchQuery, fetchSearchResults, setPage, selectSearchQuery, selectSearchResults, selectLoading, selectCurrentPage, selectTotalPages, selectItemsPerPage } from './redux/searchSlice';
import SearchInput from './components/SearchInput';
import SummaryCard from './components/SummaryCard';
import Pagination from './components/Pagination';
import './App.css';

const App: React.FC = () => {
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const searchResults = useSelector((state: RootState) => state.search.results);
  const loading = useSelector((state: RootState) => state.search.loading);
  const currentPage = useSelector((state: RootState) => state.search.currentPage);
  const totalPages = useSelector((state: RootState) => state.search.totalPages);
  const itemsPerPage = useSelector((state: RootState) => state.search.itemsPerPage);

  const dispatch = useDispatch<AppDispatch>(); // Исправленный тип для диспетчера

    const handleSearchClick = async () => {
    const trimmedSearchQuery = searchQuery.trim();
    await dispatch(setSearchQuery(trimmedSearchQuery));
    await dispatch(fetchSearchResults({ query: trimmedSearchQuery, page: 1, itemsPerPage }));
  };

  const handleSearchQueryChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    dispatch(setPage(1));
    dispatch(fetchSearchResults({ query: searchQuery, page: 1, itemsPerPage }));
  };

  return (
    <div className="container">
      <div>
        <SearchInput
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          onSearchClick={handleSearchClick}
        />

        <div>
          <label htmlFor="itemsPerPage">Items per Page:</label>
          <input
            type="number"
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          />
        </div>

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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default App;