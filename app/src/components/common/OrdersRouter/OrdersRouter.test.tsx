import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrdersRouter from './OrdersRouter';

describe('<OrdersRouter />', () => {
  test('it should mount', () => {
    render(<OrdersRouter />);
    
    const ordersRouter = screen.getByTestId('OrdersRouter');

    expect(ordersRouter).toBeInTheDocument();
  });
});