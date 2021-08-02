import React, { lazy, Suspense } from 'react';

const LazyOrders = lazy(() => import('./Orders'));

const Orders = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOrders {...props} />
  </Suspense>
);

export default Orders;
