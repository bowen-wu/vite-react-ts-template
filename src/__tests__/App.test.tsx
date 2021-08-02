import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('Test App router', () => {
  it('full app rendering/navigating', () => {
    const { container } = render(<App />);
    expect(container.querySelector('div.App')).toBeTruthy();
    expect(container.querySelector('div.layout')).toBeTruthy();
    expect(container.querySelector('div.home')).toBeTruthy();
  });
});
