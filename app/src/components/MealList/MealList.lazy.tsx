import React, { lazy, Suspense } from 'react';
import { MealListProps } from './MealList';

const LazyMealList = lazy(() => import('./MealList'));

const MealList = (
  props: MealListProps &
    JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyMealList {...props} />
  </Suspense>
);

export default MealList;
