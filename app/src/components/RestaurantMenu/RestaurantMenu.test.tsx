import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RestaurantMenu from './RestaurantMenu';

describe('<RestaurantMenu />', () => {
  test('it should mount', () => {
    render(<RestaurantMenu />);
    
    const restaurantMenu = screen.getByTestId('RestaurantMenu');

    expect(restaurantMenu).toBeInTheDocument();
  });
});