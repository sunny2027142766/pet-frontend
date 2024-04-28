import { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Stack, Drawer } from "@mui/material";
import { usePathname } from "src/routes/hooks";
import { useResponsive } from "src/hooks/use-responsive";
import Logo from "src/components/logo";
import Scrollbar from "src/components/scrollbar";
import SvgColor from "src/components/svg-color";
import { getItem } from "src/utils/local-storage";
import { NAV } from "./config-layout";
import NavItem from "./nav-item";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/preview${name}`} sx={{ width: 1, height: 1 }} />
);

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive("up", "lg");

  const frontMenu = getItem("frontMenu");
  const navConfig = frontMenu.map((menu) => ({
    title: menu.title,
    path: menu.path,
    icon: icon(menu.icon),
  }));

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Logo sx={{ mt: 2, ml: 3 }} />
      {renderMenu}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {!upLg && (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};
