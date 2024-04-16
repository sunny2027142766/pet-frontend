import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  Stack,
  Button,
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
} from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import { bgBlur } from "src/theme/css";

import Iconify from "src/components/iconify";

import { HEADER } from "./config-layout";
import navConfig from "./config-navigation";
import AccountPopover from "../common/account-popover";
import LanguagePopover from "../common/language-popover";
import NotificationsPopover from "../common/notifications-popover";

export default function Header({ onOpenNav }) {
  const lgUp = useResponsive("up", "lg");
  const navigate = useNavigate();
  const location = useLocation();
  const toPage = (page) => {
    // 进行路由跳转
    navigate(page);
  };
  const navList = (
    <Box
      component="div"
      sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
    >
      <Box component="div" sx={{ display: { xs: "none", md: "flex" } }}>
        <img alt="Logo" style={{ height: "50px", marginRight: "10px" }} />
      </Box>

      {navConfig.map((page) => (
        <Button
          color={page.selected ? "secondary" : "success"}
          key={page.title}
          onClick={() => toPage(page.path)}
          sx={{
            my: 2,
            color:
              location.pathname.split("front")[1] === `/${page.path}`
                ? "#FFAE01"
                : "white",
            display: "block",
          }}
        >
          {page.title}
        </Button>
      ))}
    </Box>
  );

  const theme = useTheme();

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" sx={{ color: "white" }} />
        </IconButton>
      )}

      {lgUp ? navList : null}

      <Box sx={{ flexGrow: 1 }} />
      <SearchBar />

      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: "#6E2987",
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
      <Toolbar>{renderContent}</Toolbar>
    </AppBar>
  );
}
Header.propTypes = {
  onOpenNav: PropTypes.func,
};

// ------------------------------------------------------
function SearchBar() {
  return (
    <Box
      component="div"
      display="flex"
      borderRadius="10px"
      sx={{ width: { xs: "100%", md: "auto" }, backgroundColor: "#fff" }}
    >
      <InputBase sx={{ ml: 2, flex: 1 }} placeholder="搜索" />
      <IconButton type="button" sx={{ p: 1 }}>
        <Iconify icon="eva:search-fill" />
      </IconButton>
    </Box>
  );
}
