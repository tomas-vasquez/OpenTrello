import React from "react";

import Particles from "./Particles";

const Layout = ({ location, title, children }) => {
  return (
    <>
      <Particles />
      <main>{children}</main>
    </>
  );
};

export default Layout;
