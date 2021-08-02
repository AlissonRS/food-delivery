import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MealList from './MealList';

describe('<MealList />', () => {
  test('it should mount', () => {
    render(<MealList />);
    
    const mealList = screen.getByTestId('MealList');

    expect(mealList).toBeInTheDocument();
  });
});