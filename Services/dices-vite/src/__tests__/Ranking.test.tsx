import { render, screen, waitFor, cleanup } from '@testing-library/react';
import Ranking from '../components/Ranking';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

const rankingApiEx = [
  {
    count: 3,
    user_id: '1111-1111-1111',
    user_name: 'pla1',
    user_tries: 7,
    user_wins: 4,
    wins_perc: 0.571428
  },
  {
    count: 3,
    user_id: '2222-2222-2222',
    user_name: 'pla2',
    user_tries: 8,
    user_wins: 3,
    wins_perc: 0.375
  },
  {
    count: 3,
    user_id: '3333-3333-3333',
    user_name: 'pla3',
    user_tries: 9,
    user_wins: 2,
    wins_perc: 0.2222222
  }
];

describe('Ranking (Class Component)', () => {

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders component', async () => {
    vi.mock('document', () => ({
      cookie: 'token=1234-1234-1234-1234'
    }));
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200, // Set HTTP status to 200
          json: () => Promise.resolve(rankingApiEx) // Return an empty JSON object
        })
      )
    );

    render(
      <Router>
        <Ranking  navigate={useNavigate} />
      </Router>
    );
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText('User ID')).toBeInTheDocument();
    expect(screen.getByText('User Name')).toBeInTheDocument();
    expect(screen.getByText('Tries')).toBeInTheDocument();
    expect(screen.getByText('Wins')).toBeInTheDocument();
    expect(screen.getByText('Wins Percentage')).toBeInTheDocument();
    expect(screen.getByText('More Info')).toBeInTheDocument();

    expect(screen.getByText('pla1')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('0.571')).toBeInTheDocument();

    expect(screen.getByText('pla2')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('0.375')).toBeInTheDocument();

    expect(screen.getByText('pla3')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('0.222')).toBeInTheDocument();
  });

  it('renders component empty for no games', async () => {
    vi.mock('document', () => ({
      cookie: 'token=1234-1234-1234-1234'
    }));
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 204, // Set HTTP status to 200
          json: () => Promise.resolve({}) // Return an empty JSON object
        })
      )
    );

    render(
      <Router>
        <Ranking  navigate={useNavigate} />
      </Router>
    );
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(
      screen.getByText('No games played... Someone must turn the dices...')
    ).toBeInTheDocument();
  });
});
