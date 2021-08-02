import React, { lazy, Suspense } from 'react';
import { EditOrderItemListProps } from './EditOrderItemList';

const LazyEditOrderItemList = lazy(() => import('./EditOrderItemList'));

const EditOrderItemList = (
  props: EditOrderItemListProps &
    JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyEditOrderItemList {...props} />
  </Suspense>
);

export default EditOrderItemList;
