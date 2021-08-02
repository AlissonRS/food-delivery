import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderItemList from './OrderItemList';

describe('<OrderItemList />', () => {
  test('it should mount', () => {
    render(<OrderItemList orderItems={[]} />);

    const orderItemList = screen.getByTestId('OrderItemList');

    expect(orderItemList).toBeInTheDocument();
  });
});
