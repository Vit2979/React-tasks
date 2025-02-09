

import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
  it('should highlight the current page button', () => {
    const mockOnPageChange = jest.fn();
    const mockOnItemsPerPageChange = jest.fn();
    
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={mockOnPageChange} 
        itemsPerPage={10} 
        onItemsPerPageChange={mockOnItemsPerPageChange} 
      />
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons[2]).toHaveClass('active');
  });
});
