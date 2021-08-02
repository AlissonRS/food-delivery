import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditMeal from './EditMeal';

describe('<EditMeal />', () => {
  test('it should mount', () => {
    render(<EditMeal />);
    
    const editMeal = screen.getByTestId('EditMeal');

    expect(editMeal).toBeInTheDocument();
  });
});