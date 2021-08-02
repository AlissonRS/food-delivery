import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MealCard from './MealCard';

describe('<MealCard />', () => {
  test('it should mount', () => {
    render(<MealCard />);
    
    const mealCard = screen.getByTestId('MealCard');

    expect(mealCard).toBeInTheDocument();
  });
});