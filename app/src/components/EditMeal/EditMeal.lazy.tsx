import React, { lazy, Suspense } from 'react';

const LazyEditMeal = lazy(() => import('./EditMeal'));

const EditMeal = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyEditMeal {...props} />
  </Suspense>
);

export default EditMeal;
