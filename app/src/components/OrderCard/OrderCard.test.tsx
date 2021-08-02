import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderCard from './OrderCard';

describe('<OrderCard />', () => {
  test('it should mount', () => {
    render(<OrderCard />);
    
    const orderCard = screen.getByTestId('OrderCard');

    expect(orderCard).toBeInTheDocument();
  });
});