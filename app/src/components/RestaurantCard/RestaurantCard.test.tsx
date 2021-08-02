import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RestaurantCard from './RestaurantCard';
import { RestaurantModel } from '../../models/Restaurant.model';
import { FoodTypes } from '../../models/FoodType.enum';

describe('<RestaurantCard />', () => {
  test('it should mount', () => {
    const restaurant: RestaurantModel = {
      id: '',
      name: 'Nice Restaurant',
      description: 'This is an excelent restaurant',
      foodType: FoodTypes.Meat,
      ownerId: '',
      createdAt: new Date(),
    };
    render(<RestaurantCard restaurant={restaurant} />);

    const restaurantCard = screen.getByTestId('RestaurantCard');

    expect(restaurantCard).toBeInTheDocument();
  });
});
