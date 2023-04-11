import { expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Page from './page';

test('home', () => {
  expect(1).toBe(1);
  render(<Page />);
});
