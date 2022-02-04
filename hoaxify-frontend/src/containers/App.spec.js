import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const setup = (path) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
};

describe('App', () => {
  it('displays homepage when url is /', () => {
    const { queryByTestId } = setup('/');
    expect(queryByTestId('homepage')).toBeInTheDocument();
  });
  it('displays login page when url is /login', () => {
    const { container } = setup('/login');
    const header = container.querySelector('h1');
    expect(header).toHaveTextContent('Login');
  })
});