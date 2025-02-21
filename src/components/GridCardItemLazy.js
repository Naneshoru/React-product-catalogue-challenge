import React, { lazy, Suspense, useRef } from 'react';
import LazyLoad from './LazyLoad';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import GridCardItemSkeleton from './GridCardItemSkeleton';
import { Grid } from '@mui/material';

const CardLazy = lazy(() => import('./GridCardItem'));

export default function GridCardItemLazy({ item }) {
  const ref = useRef(null);
  const log = (error, info) => {
    console.log(`${error} ${info}`);
  };

  return (
    <LazyLoad ref={ref} as={Grid} item xs={12} sm={6} md={4} lg={3} component="div">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, info) => log(error, info)}
        onReset={() => {
          if (ref.current) {
            ref.current.reset();
          }
        }}
      >
        <Suspense fallback={<GridCardItemSkeleton />}>
          <CardLazy item={item} />
        </Suspense>
      </ErrorBoundary>
    </LazyLoad>
  );
}
