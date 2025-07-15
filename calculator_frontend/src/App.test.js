import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ToDo App heading', () => {
  render(<App />);
  const heading = screen.getByText(/ToDo App/i);
  expect(heading).toBeInTheDocument();
});
