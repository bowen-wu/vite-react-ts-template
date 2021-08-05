import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('Test App router', () => {
  afterEach(cleanup);

  it('take a snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('full app rendering/navigating', () => {
    const { container } = render(<App />);
    expect(container.querySelector('div.App')).toBeTruthy();
    expect(container.querySelector('div.layout')).toBeTruthy();
    expect(container.querySelector('div.home')).toBeTruthy();
  });
});
