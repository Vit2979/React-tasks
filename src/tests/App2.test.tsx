import React from 'react';
import { render } from '@testing-library/react';
import SearchInput from '../components/SearchInput';

describe('SearchInput', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <SearchInput
        searchQuery=""
        onSearchQueryChange={() => {}}
        onSearchClick={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
