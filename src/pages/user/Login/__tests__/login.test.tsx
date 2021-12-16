/**
 * 1. Match snapshot
 * 2. Login functional
 * 3. Remember account functional
 * 4. Error tips
 */

import React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../login';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

describe('Test Login', () => {
  const setup = (history?: History) => {
    const isolateHistory = createMemoryHistory();
    const { container } = render(
      <Router history={history || isolateHistory}>
        <Login />
      </Router>
    );
    const inputOfAccount = screen.getByLabelText('account');
    const inputOfPassword = screen.getByLabelText('password');
    const loginButton = screen.getByLabelText('login');
    const inputOfCheckbox = container.querySelector('input[type="checkbox"]');
    return { container, inputOfPassword, inputOfAccount, inputOfCheckbox, loginButton };
  };

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('take a snapshot', () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('common render', () => {
    const { inputOfCheckbox, inputOfAccount, inputOfPassword, loginButton } = setup();
    expect(inputOfAccount).toBeTruthy();
    expect(inputOfPassword).toBeTruthy();
    expect(inputOfCheckbox).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('login functional', async () => {
    const history = createMemoryHistory();
    const { inputOfAccount, inputOfPassword, inputOfCheckbox, loginButton } = setup(history);
    expect((inputOfAccount as HTMLInputElement).value).toBe('');
    expect((inputOfPassword as HTMLInputElement).value).toBe('');
    expect((inputOfCheckbox as HTMLInputElement).checked).toBe(false);

    fireEvent.change(inputOfAccount, { target: { value: 'account' } });
    fireEvent.change(inputOfPassword, { target: { value: 'password' } });
    expect((inputOfPassword as HTMLInputElement).value).toBe('password');

    fireEvent.click(loginButton);

    await waitFor(() => {
      // history
      expect(history.length).toBe(1);
      expect(history.location.pathname).toBe('/');
    });
  });

  it('test remember account', async () => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        username: 'account',
        rememberAccount: true,
        token: 'tempToken'
      })
    );
    const { inputOfAccount, inputOfCheckbox } = setup();
    expect((inputOfAccount as HTMLInputElement).value).toBe('account');
    expect((inputOfCheckbox as HTMLInputElement).checked).toBe(true);
  });

  it('test donot remember account', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'account', rememberAccount: false }));
    const { inputOfAccount, inputOfCheckbox } = setup();

    expect((inputOfCheckbox as HTMLInputElement).checked).toBe(false);
    expect((inputOfAccount as HTMLInputElement).value).toBe('');
  });

  it('login functional error when not input account and password', async () => {
    const { loginButton, inputOfAccount, inputOfPassword } = setup();
    act(() => {
      fireEvent.click(loginButton);
    });

    await waitFor(async () => {
      expect(screen.getByText('请输入账号！')).toBeInTheDocument();
      expect(screen.getByText('请输入密码！')).toBeInTheDocument();

      fireEvent.change(inputOfAccount, { target: { value: 'account' } });
      await waitFor(() => {
        expect(screen.queryByText('请输入账号！')).toBeNull();
      });

      fireEvent.change(inputOfPassword, { target: { value: 'password' } });
      await waitFor(() => {
        expect(screen.queryByText('请输入密码！')).toBeNull();
      });
    });
  });
});
