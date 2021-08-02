import React, { lazy, Suspense } from 'react';

const LazyRestaurantList = lazy(() => import('./RestaurantList'));

const RestaurantList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRestaurantList {...props} />
  </Suspense>
);

export default RestaurantList;
