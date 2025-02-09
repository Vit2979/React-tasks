import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

const FaultyComponent = () => {
  throw new Error('Тестовая ошибка');
};

describe('ErrorBoundary', () => {
  test('отображает сообщение об ошибке при сбое в дочернем компоненте', () => {
    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Что-то пошло не так.')).toBeInTheDocument();
  
    expect(screen.getByText('Попробовать снова')).toBeInTheDocument();
  });
});