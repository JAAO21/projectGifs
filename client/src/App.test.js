import { render, screen } from '@testing-library/react';
import App from './pages/Home/index';

test('renders learn react link', async () => {
  const { findByText } = render(<App />);
  const titleHomeLastSearch = await findByText(/The last search/i);
  expect(titleHomeLastSearch).toBeInTheDocument();
});
