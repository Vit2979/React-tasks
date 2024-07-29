import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContext, ThemeProvider } from '../components/ThemeContext';

const TestComponent = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <div>
      <p className="theme-text">{theme}</p>
      <button className="toggle-theme-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('should toggle the theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByText('dark')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('should log the current theme when it changes', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(consoleSpy).toHaveBeenCalledWith('Current theme:', 'light');

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(consoleSpy).toHaveBeenCalledWith('Current theme:', 'dark');
  });
});
