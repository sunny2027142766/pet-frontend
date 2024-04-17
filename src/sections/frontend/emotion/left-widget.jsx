import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";

import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  left: 10,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme.spacing(50),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function LeftWidget() {
  return (
    <StyledRoot>
      <Fab variant="extended" color="primary">
        <Iconify
          icon="streamline:pet-paw-solid"
          width={24}
          height={24}
          mr={2}
        />
        添加档案信息
      </Fab>
    </StyledRoot>
  );
}
