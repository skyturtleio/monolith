import React from 'react';
import { createInertiaApp } from "@inertiajs/react";
import { renderToString } from "react-dom/server";

export function render(page) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: async (name) => {
      return await import(`./pages/${name}.tsx`);
    },
    setup: ({ App, props }) => <App {...props} />,
  });
}


