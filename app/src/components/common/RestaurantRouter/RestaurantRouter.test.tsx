import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RestaurantRouter from './RestaurantRouter';

describe('<RestaurantRouter />', () => {
  test('it should mount', () => {
    render(<RestaurantRouter />);

    const restaurantRouter = screen.getByTestId('RestaurantRouter');

    expect(restaurantRouter).toBeInTheDocument();
  });
});
