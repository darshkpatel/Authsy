import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders project name', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Authsy/i);
  expect(linkElement).toBeInTheDocument();
});
