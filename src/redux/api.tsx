import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Planet {
  climate: string;
  rotation_period: number;
  orbital_period: number;
  name: string;
  terrain: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/planets/' }),
  endpoints: (builder) => ({
    getPlanets: builder.query<Planet[], { page?: number; search?: string; itemsPerPage?: number }>({
      query: ({ page = 1, search = '', itemsPerPage = 10 }) =>
        `?page=${page}&search=${search}&itemsPerPage=${itemsPerPage}`,
    }),
  }),
});

export const { useGetPlanetsQuery } = api;