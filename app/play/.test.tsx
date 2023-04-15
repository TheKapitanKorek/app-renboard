import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';
import React from 'react';

test('page renders', async () => {
  // ARRANGE
  render(<Page />);
  // ACT
  const main = await screen.findByRole('main');
  // ASSERT
  expect(main).toBeDefined();
});
