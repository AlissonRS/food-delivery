import React, { lazy, Suspense } from 'react';
import { MealCardProps } from './MealCard';

const LazyMealCard = lazy(() => import('./MealCard'));

const MealCard = (
  props: MealCardProps &
    JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyMealCard {...props} />
  </Suspense>
);

export default MealCard;
