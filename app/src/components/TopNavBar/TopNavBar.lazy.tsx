import React, { lazy, Suspense } from 'react';

const LazyTopNavBar = lazy(() => import('./TopNavBar'));

const TopNavBar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTopNavBar {...props} />
  </Suspense>
);

export default TopNavBar;
