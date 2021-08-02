import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TopNavBar from './TopNavBar';

describe('<TopNavBar />', () => {
  test('it should mount', () => {
    render(<TopNavBar />);
    
    const topNavBar = screen.getByTestId('TopNavBar');

    expect(topNavBar).toBeInTheDocument();
  });
});