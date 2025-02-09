import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import { MemoryRouter } from 'react-router-dom';

describe('NotFound page', () => {
  it('should render 404 page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 - Страница не найдена/i)).toBeInTheDocument();  
  });

  it('should have a link to go back to the home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();  
  });
});
