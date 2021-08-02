import React, { lazy, Suspense } from 'react';

const LazyOrdersRouter = lazy(() => import('./OrdersRouter'));

const OrdersRouter = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOrdersRouter {...props} />
  </Suspense>
);

export default OrdersRouter;
