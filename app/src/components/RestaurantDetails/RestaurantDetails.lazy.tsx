import React, { lazy, Suspense } from 'react';

const LazyRestaurantDetails = lazy(() => import('./RestaurantDetails'));

const RestaurantDetails = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRestaurantDetails {...props} />
  </Suspense>
);

export default RestaurantDetails;
