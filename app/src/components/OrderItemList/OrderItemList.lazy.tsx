import React, { lazy, Suspense } from 'react';
import { OrderItemListProps } from './OrderItemList';

const LazyOrderItemList = lazy(() => import('./OrderItemList'));

const OrderItemList = (
  props: OrderItemListProps &
    JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyOrderItemList {...props} />
  </Suspense>
);

export default OrderItemList;
