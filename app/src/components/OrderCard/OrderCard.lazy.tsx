import React, { lazy, Suspense } from 'react';
import { OrderCardProps } from './OrderCard';

const LazyOrderCard = lazy(() => import('./OrderCard'));

const OrderCard = (
  props: OrderCardProps &
    JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyOrderCard {...props} />
  </Suspense>
);

export default OrderCard;
