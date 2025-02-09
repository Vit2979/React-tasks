import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

const MockApp = () => <div>Рабочий компонент</div>;

describe('ErrorBoundary without error', () => {
  test('не перехватывает ошибки, если их нет', () => {
    render(
      <ErrorBoundary>
        <MockApp />
      </ErrorBoundary>
    );
    expect(screen.getByText('Рабочий компонент')).toBeInTheDocument();
    expect(screen.queryByText('Что-то пошло не так.')).toBeNull();
  });
});
