import React from 'react';
import Layout from './layouts/Layout';
import { createInertiaApp } from "@inertiajs/react";
import { renderToString } from "react-dom/server";
import { ReactNode } from 'react';

export function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: async (name) => {
      const page = await import(`./pages/${name}.tsx`);
      page.default.layout = page.default.layout || ((page: ReactNode) => <Layout children={page} />)
      return page;
    },
    setup: ({ App, props }) => <App {...props} />,
  });
}


