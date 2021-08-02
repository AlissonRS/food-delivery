import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditRestaurant from './EditRestaurant';

describe('<EditRestaurant />', () => {
  test('it should mount', () => {
    render(<EditRestaurant />);

    const editRestaurant = screen.getByTestId('EditRestaurant');

    expect(editRestaurant).toBeInTheDocument();
  });
});
