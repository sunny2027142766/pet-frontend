import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Box, ListItemButton } from "@mui/material";
import { usePathname } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";


export default function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "secondary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  )
}

NavItem.propTypes = {
  item: PropTypes.object,
};
