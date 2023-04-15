import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingMessageBox } from '.';

test('Message box displays given message and no copy link when not provided', async () => {
  //ARRANGE
  const message = 'Message to be displayed';
  render(<LoadingMessageBox message={message} />);
  //ACT
  const displayedText = await screen.findByText(message);
  const linkCoppyButton = screen.queryByRole('button');
  //ASSERT
  expect(displayedText).toBeDefined();
  expect(linkCoppyButton).toBeNull();
});

test('Display coppy link when provided', async () => {
  //ARRANGE
  let clipboard = '';
  const link = 'https://www.randomlink.com';
  Object.assign(navigator, {
    clipboard: {
      writeText: (link) => {
        clipboard = link;
      },
    },
  });
  render(<LoadingMessageBox message="Message" link={link} />);
  //ACT
  const linkCoppyButton = await screen.findByRole('button');
  linkCoppyButton.click();
  console.log(navigator.clipboard);
  //ASSERT
  expect(linkCoppyButton).toBeDefined();
  expect(clipboard).toEqual(link);
});
