import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RestaurantList from './RestaurantList';

describe('<RestaurantList />', () => {
  test('it should mount', () => {
    render(<RestaurantList />);
    
    const restaurantList = screen.getByTestId('RestaurantList');

    expect(restaurantList).toBeInTheDocument();
  });
});