
import SearchInput from '../components/SearchInput'; 
import { render, screen, fireEvent } from '@testing-library/react';


describe('SearchInput', () => {
  it('should call onSearchQueryChange with empty string when search button is clicked and input is empty', () => {
    const mockOnSearchQueryChange = jest.fn();
    
    render(
      <SearchInput 
        searchQuery="" 
        onSearchQueryChange={mockOnSearchQueryChange} 
      />
    );

    const button = screen.getByRole('button', { name: /search/i });
   
    fireEvent.click(button);

    expect(mockOnSearchQueryChange).toHaveBeenCalledWith('');
  });
});
