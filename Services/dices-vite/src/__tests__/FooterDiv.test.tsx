import { render, screen, cleanup } from '@testing-library/react';
import FooterDiv from '../components/FooterDiv';
import { describe, it, expect, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { useNavigate } from 'react-router-dom';

describe('FooterDiv (Class Component)', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders component', () => {
    render(<FooterDiv navigate={useNavigate} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });
});
