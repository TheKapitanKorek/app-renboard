import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button, ButtonPrimary, StyledRadioButton } from '.';

const BUTTON_TEXT = 'Click Me';

describe('buttons render', () => {
  test('Button', async () => {
    render(<Button>{BUTTON_TEXT}</Button>);
    const button = await screen.findByRole('button');
    expect(button).toBeDefined();
  });

  test('ButtonPrimary', async () => {
    render(<ButtonPrimary>{BUTTON_TEXT}</ButtonPrimary>);
    const button = await screen.findByRole('button');
    expect(button).toBeDefined();
  });

  test('StyledRadioButton', async () => {
    render(<StyledRadioButton id="test-id">{BUTTON_TEXT}</StyledRadioButton>);
    const radioLabel = await screen.findByLabelText(BUTTON_TEXT);
    expect(radioLabel).toBeDefined();
  });
});
