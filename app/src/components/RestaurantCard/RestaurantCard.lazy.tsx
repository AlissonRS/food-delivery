import React, { lazy, Suspense } from 'react';
import { RestaurantCardProps } from './RestaurantCard';

const LazyRestaurantCard = lazy(() => import('./RestaurantCard'));

const RestaurantCard = (
  props: RestaurantCardProps &
    JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyRestaurantCard {...props} />
  </Suspense>
);

export default RestaurantCard;
