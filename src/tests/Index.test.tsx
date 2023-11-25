import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';
test('updates URL query parameter when page changes', () => {
  const onPageChangeMock = jest.fn();
  render(
    <Pagination
      currentPage={2}
      totalPages={5}
      onPageChange={onPageChangeMock}
      itemsPerPage={10}
      onItemsPerPageChange={() => {}}
    />
  );
  const page3Button = screen.getByText('3');
  fireEvent.click(page3Button);
  expect(onPageChangeMock).toHaveBeenCalledWith(3);
});
