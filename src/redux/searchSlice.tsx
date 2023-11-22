import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Planet {
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
  population: string;
}

interface SearchState {
  query: string;
  results: Planet[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 10,
};

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async ({ query, page, itemsPerPage }: { query: string; page: number; itemsPerPage: number }) => {
    try {
      const response = await fetch(`https://swapi.dev/api/planets/?search=${query}&page=${page}&limit=${itemsPerPage}`);
      const data = await response.json();

      return {
        results: data.results,
        currentPage: page,
        totalPages: Math.ceil(data.count / itemsPerPage),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<{ results: Planet[]; currentPage: number; totalPages: number }>) => {
        state.loading = false;
        state.results = action.payload.results;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSearchQuery, setPage } = searchSlice.actions;

export const selectSearchQuery = (state: RootState) => state.search.query;
export const selectSearchResults = (state: RootState) => state.search.results;
export const selectLoading = (state: RootState) => state.search.loading;
export const selectCurrentPage = (state: RootState) => state.search.currentPage;
export const selectTotalPages = (state: RootState) => state.search.totalPages;
export const selectItemsPerPage = (state: RootState) => state.search.itemsPerPage;

export default searchSlice.reducer;