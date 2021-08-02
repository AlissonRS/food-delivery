import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditOrderItemList from './EditOrderItemList';

describe('<EditOrderItemList />', () => {
  test('it should mount', () => {
    render(<EditOrderItemList />);
    
    const editOrderItemList = screen.getByTestId('EditOrderItemList');

    expect(editOrderItemList).toBeInTheDocument();
  });
});