import React, { lazy, Suspense } from 'react';

const LazyRestaurantMenu = lazy(() => import('./RestaurantMenu'));

const RestaurantMenu = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRestaurantMenu {...props} />
  </Suspense>
);

export default RestaurantMenu;
