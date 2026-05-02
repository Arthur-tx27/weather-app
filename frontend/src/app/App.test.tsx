import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders search placeholder and hint', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Поиск города...')).toBeInTheDocument();
    expect(screen.getByText('Введите название города, чтобы узнать погоду')).toBeInTheDocument();
  });
});
