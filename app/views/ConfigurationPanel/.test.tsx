import React from 'react';
import { screen, render, act } from '@testing-library/react';
import { ConfigurationPanel } from '.';

test('Game mode selection expands and allows to select game mode then hides', async () => {
  //ARRANGE
  render(<ConfigurationPanel />);
  //ACT
  const fieldset = await screen.findByTestId('config-panel');
  const expandableButton = await screen.findByTestId('mode-select-button');
  const labels = await screen.findAllByLabelText('30 min');
  const third30MinButton = labels[2];
  //ASSERT + ACT
  expect(fieldset).toHaveClass('hidden');
  act(() => {
    expandableButton.click();
  });
  expect(fieldset).not.toHaveClass('hidden');
  act(() => {
    third30MinButton.click();
  });
  expect(fieldset).toHaveClass('hidden');
});
