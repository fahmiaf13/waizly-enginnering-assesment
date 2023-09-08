import { Helmet } from "react-helmet-async";

import React from "react";

interface IDefaultLayout {
  children: React.ReactNode;
  title?: string;
}

export default function Default({ children, title }: IDefaultLayout) {
  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title ? `${title} | Todify` : "Todify"}</title>
      </Helmet>
      {/* <Navbar /> */}
      <section className="bg-backround">{children}</section>
      {/* <Footer /> */}
    </React.Fragment>
  );
}
