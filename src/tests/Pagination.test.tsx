import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
test('updates URL query parameter when page changes', () => {
  const onPageChangeMock = jest.fn();
  const onItemsPerPageChangeMock = jest.fn();
  const { getByText } = render(
    <Pagination
      currentPage={1}
      totalPages={5}
      onPageChange={onPageChangeMock}
      itemsPerPage={10}
      onItemsPerPageChange={onItemsPerPageChangeMock}
    />
  );
  const page2Button = getByText('2');
  fireEvent.click(page2Button);
  expect(onPageChangeMock).toHaveBeenCalledWith(2);
});
test('updates URL query parameter when items per page changes', () => {
  const onPageChangeMock = jest.fn();
  const onItemsPerPageChangeMock = jest.fn();
  const { getByLabelText } = render(
    <Pagination
      currentPage={1}
      totalPages={5}
      onPageChange={onPageChangeMock}
      itemsPerPage={10}
      onItemsPerPageChange={onItemsPerPageChangeMock}
    />
  );
  const itemsPerPageInput = getByLabelText('Items per Page:');
  fireEvent.change(itemsPerPageInput, { target: { value: '20' } });
  expect(onItemsPerPageChangeMock).toHaveBeenCalledWith(20);
});
