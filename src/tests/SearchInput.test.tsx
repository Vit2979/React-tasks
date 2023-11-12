import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchInput from '../components/SearchInput';

test('calls onSearchClick when component is mounted', () => {
  const onSearchClickMock = jest.fn();

  render(
    <SearchInput
      searchQuery=""
      onSearchQueryChange={() => {}}
      onSearchClick={onSearchClickMock}
    />
  );

  expect(onSearchClickMock).toHaveBeenCalled();
});

test('calls onSearchQueryChange when input value changes', () => {
  const onSearchQueryChangeMock = jest.fn();

  render(
    <SearchInput
      searchQuery=""
      onSearchQueryChange={onSearchQueryChangeMock}
      onSearchClick={() => {}}
    />
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'test query' } });

  expect(onSearchQueryChangeMock).toHaveBeenCalledWith('test query');
});

test('calls onSearchClick when search button is clicked', () => {
  const onSearchClickMock = jest.fn();

  render(
    <SearchInput
      searchQuery=""
      onSearchQueryChange={() => {}}
      onSearchClick={onSearchClickMock}
    />
  );

  const button = screen.getByRole('button', { name: 'Search' });
  fireEvent.click(button);

  expect(onSearchClickMock).toHaveBeenCalled();
});
