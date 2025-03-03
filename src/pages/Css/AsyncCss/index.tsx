import React, { Suspense, useEffect, useState } from "react";

const AsyncCssModule = React.lazy(() => import("./CssModule.tsx"));

export const AsyncCss = (props: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AsyncCssModule></AsyncCssModule>
    </Suspense>
  );
};
