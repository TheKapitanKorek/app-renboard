import React from 'react';
import { test, expect } from 'vitest';
import { screen, render, waitFor, getByTestId, getByText } from '@testing-library/react';
import { ConfigurationPanel } from '.';

test('Game mode selection expands and allows to select game mode', async () => {
  //ARRANGE
  render(<ConfigurationPanel />);
  //ACT
  const form = await screen.findByTestId('config-panel');
  const expandableButton = await screen.findByTestId('mode-select-button');
  const invisibleButton = screen.queryByTestId('select-mode');
  expandableButton.click();
  await waitFor(async () => await screen.findByTestId('select-mode'));
  const changeModeButton = await screen.findByTestId('select-mode');
  //ASSERT
  expect(invisibleButton).toBeNull();
  expect(changeModeButton).toBeDefined();
  console.log(invisibleButton);
  console.log(changeModeButton);
});
