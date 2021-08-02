import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RestaurantDetails from './RestaurantDetails';

describe('<RestaurantDetails />', () => {
  test('it should mount', () => {
    render(<RestaurantDetails />);
    
    const restaurantDetails = screen.getByTestId('RestaurantDetails');

    expect(restaurantDetails).toBeInTheDocument();
  });
});