import React, { lazy, Suspense } from 'react';

const LazyEditRestaurant = lazy(() => import('./EditRestaurant'));

const EditRestaurant = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyEditRestaurant {...props} />
  </Suspense>
);

export default EditRestaurant;
