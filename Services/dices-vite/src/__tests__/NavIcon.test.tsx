import { render, cleanup } from '@testing-library/react';
import NavIcon from '../components/NavIcon';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('FooterDiv (Class Component)', () => {

    afterEach(() => {
        cleanup();
      });

  it('renders menu icon', () => {
    // Mocking window.innerWidth for a wide screen
    vi.stubGlobal('innerWidth', 1400);

    render(<NavIcon />);

    // Get the element
    const element = document.getElementsByClassName('icon-menu')[0];
    expect(element).not.toBeNull();
  });

  it('renders menu-close icon', () => {
    // Mocking window.innerWidth for a wide screen
    vi.stubGlobal('innerWidth', 1400);

    render(<NavIcon />);

    // Get the element
    const element = document.getElementsByClassName('icon-close')[0];
    expect(element).not.toBeNull();
  });

  /*
  it('should add content before the text', () => {
    // Injecting CSS directly into the test
    const style = document.createElement('style');
    style.innerHTML = `
      .test-div::before {
        content: 'e9bd';
      }
    `;
    document.head.appendChild(style);

    render(<NavIcon />);

    // Get the element using getElementsByClassName
    const element = document.getElementsByClassName('icon-menu')[0];

    // Check the computed style for the ::before content
    const computedStyle = window.getComputedStyle(element);
    const beforeContent = computedStyle.getPropertyValue('content');

    // Ensure that the content is the Unicode character represented by \e9bd
    const expectedUnicodeChar = '\uE9BD';  // The actual character from Unicode escape sequence
    expect(beforeContent).toBe(`"${expectedUnicodeChar}"`);
  });*/


});
