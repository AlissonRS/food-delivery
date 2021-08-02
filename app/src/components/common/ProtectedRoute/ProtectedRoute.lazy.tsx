import React, { lazy, Suspense } from 'react';

const LazyProtectedRoute = lazy(() => import('./ProtectedRoute'));

const ProtectedRoute = (props: any) => (
  <Suspense fallback={null}>
    <LazyProtectedRoute {...props} />
  </Suspense>
);

export default ProtectedRoute;
