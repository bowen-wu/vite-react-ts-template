import React, { useReducer, useState } from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { instance } from '../api';
import { Method } from '../fetch';

interface FetchInitialState {
  error: Error | null;
  greeting: null | string;
}

const initialState: FetchInitialState = {
  error: null,
  greeting: null
};

interface Action {
  type: string;
  payload: string | Error;
}

const greetingReducer = (state: FetchInitialState, action: Action): FetchInitialState => {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.payload as string
      };
    }
    case 'ERROR': {
      return {
        error: action.payload as Error,
        greeting: null
      };
    }
    default: {
      return state;
    }
  }
};

interface FetchComponentProps {
  url: string;
}

const FetchComponent: (props: FetchComponentProps) => JSX.Element = ({
  url
}: FetchComponentProps) => {
  const [{ error, greeting }, dispatch] = useReducer(greetingReducer, initialState);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchGreeting = async (api: string) => {
    try {
      const response = await instance({ api, method: Method.GET });
      const { greeting } = response;
      dispatch({ type: 'SUCCESS', payload: greeting });
      setButtonClicked(true);
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error as Error });
    }
  };

  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting';

  return (
    <div>
      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1 role="heading">{greeting}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  );
};

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there', code: 200 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Test Fetch', () => {
  test('fetch greeting', async () => {
    render(<FetchComponent url="/greeting" />);

    fireEvent.click(screen.getByText('Load Greeting'));

    await waitFor(() => screen.getByRole('heading'));

    expect(screen.getByRole('heading')).toHaveTextContent('hello there');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('handles server error', async () => {
    server.use(
      rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<FetchComponent url="/greeting" />);

    fireEvent.click(screen.getByText('Load Greeting'));

    await waitFor(() => screen.getByRole('alert'));

    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
