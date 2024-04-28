import PropTypes from "prop-types";
import React from "react";
import { useTheme } from "@mui/material/styles";

import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
import { bgBlur } from "src/theme/css";
import Iconify from "src/components/iconify";
import Logo from "src/components/logo";
import SvgColor from "src/components/svg-color";
import { getItem } from "src/utils/local-storage";
import { HEADER } from "./config-layout";
import AccountPopover from "../common/account-popover";
import LanguagePopover from "../common/language-popover";
import NotificationsPopover from "../common/notifications-popover";
import NavItem from "./nav-item";

const icon = (name) => (
  <SvgColor src={`/preview${name}`} sx={{ width: 1, height: 1 }} />
);

export default function Header({ onOpenNav }) {
  const lgUp = useResponsive("up", "lg");

  const frontMenu = getItem("frontMenu");
  const navConfig = frontMenu.map((menu) => ({
    title: menu.title,
    path: menu.path,
    icon: icon(menu.icon),
  }));

  const navList = (
    <Box
      component="div"
      sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
    >
      <Logo sx={{ mt: 2, ml: 3, mr: 20 }} />

      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Box>
  );

  const theme = useTheme();

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" sx={{ color: "black" }} />
        </IconButton>
      )}

      <Box>{lgUp ? navList : null}</Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {/* <SearchBar /> */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </Box>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: "#fff",
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(true && {
          width: "100%",
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
Header.propTypes = {
  onOpenNav: PropTypes.func,
};
