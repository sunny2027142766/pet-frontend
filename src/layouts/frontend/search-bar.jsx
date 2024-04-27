
import React from "react";
import { alpha  } from "@mui/material/styles";

import {
  Box,
  InputBase,
  IconButton,
} from "@mui/material";
import Iconify from "src/components/iconify";

// ------------------------------------------------------
export default function SearchBar() {
  return (
    <Box
      component="div"
      display="flex"
      borderRadius="10px"
      sx={{ width: { xs: "100%", md: "auto" }, bgcolor:(theme) => alpha(theme.palette.primary.main, 0.08), }}
    >
      <InputBase sx={{ ml: 2, flex: 1 }} placeholder="搜索" />
      <IconButton type="button" sx={{ p: 1 }}>
        <Iconify icon="eva:search-fill" />
      </IconButton>
    </Box>
  );
}
