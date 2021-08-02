import React, { lazy, Suspense } from 'react';
import { CheckoutProps } from './Checkout';

const LazyCheckout = lazy(() => import('./Checkout'));

const Checkout = (
  props: CheckoutProps &
    JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyCheckout {...props} />
  </Suspense>
);

export default Checkout;
