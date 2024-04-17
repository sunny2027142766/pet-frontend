import { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import Nav from "./nav";
import Main from "./main";
// import Footer from "./footer";
import Header from "./header";

// ----------------------------------------------------------------------

export default function FrontEndLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
        }}
      >
        <Main>{children}</Main>
      </Box>

      {/* <Footer /> */}
    </>
  );
}

FrontEndLayout.propTypes = {
  children: PropTypes.node,
};
