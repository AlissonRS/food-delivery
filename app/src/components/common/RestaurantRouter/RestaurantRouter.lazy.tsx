import React, { lazy, Suspense } from 'react';

const LazyRestaurantRouter = lazy(() => import('./RestaurantRouter'));

const RestaurantRouter = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyRestaurantRouter {...props} />
  </Suspense>
);

export default RestaurantRouter;
