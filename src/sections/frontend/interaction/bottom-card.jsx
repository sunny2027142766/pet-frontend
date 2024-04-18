import PropTypes from "prop-types";
// import { useState } from "react";
import { styled } from "@mui/material/styles";
// import Iconify from "src/components/iconify";
// import { Fab, Stack } from "@mui/material";
import { Box, Chip, Stack } from "@mui/material";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  bottom: 20,
  right: theme.spacing(100),
  cursor: "pointer",
  position: "fixed",
  paddingTop: theme.spacing(1.25),
}));

// ----------------------------------------------------------------------

export default function BottomCard({ onToggleAnimation }) {
  const render3DStatus = (
    <Chip
      label="3D"
      color="secondary"
      size="small"
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: "absolute",
        textTransform: "uppercase",
      }}
    />
  );

  const renderImg = (
    <Box
      component="img"
      alt="模型"
      src="/assets/model/shiba.png"
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  return (
    <StyledRoot>
      {/* <Stack direction="row" spacing={2}>
        <Fab variant="extended" onClick={onToggleAnimation}>
          <Iconify icon="openmoji:guide-dog" width={24} height={24} mr={1} />
          动画
        </Fab>
        <Fab variant="extended">
          <Iconify
            icon="fluent-emoji:leftwards-hand"
            width={24}
            height={24}
            mr={1}
          />
          抚摸
        </Fab>
        <Fab variant="extended">
          <Iconify
            icon="streamline-emojis:cat-face-with-tears-of-joy"
            width={24}
            height={24}
            mr={1}
          />
          表情
        </Fab>
        <Fab variant="extended">
          <Iconify icon="twemoji:canned-food" width={24} height={24} mr={1} />
          喂食
        </Fab>
        <Fab variant="extended">
          <Iconify
            icon="fluent-emoji:petri-dish"
            width={24}
            height={24}
            mr={1}
          />
          喝水
        </Fab>
        <Fab variant="extended">
          <Iconify icon="icon-park:clear" width={24} height={24} mr={1} />
          清洁
        </Fab>
      </Stack> */}
      <Stack direction="row" spacing={2}>
        {[1, 2, 3, 4].map(() => (
          <Box
            key={Math.random()}
            sx={{
              width: 150,
              height: 150,
              position: "relative",
              border: "1px dashed #ccc",
            }}
          >
            {render3DStatus}
            {renderImg}
          </Box>
        ))}
      </Stack>
    </StyledRoot>
  );
}

BottomCard.propTypes = {
  onToggleAnimation: PropTypes.func,
};
