import PropTypes from "prop-types";
// import { useState } from "react";
import { styled } from "@mui/material/styles";
// import Iconify from "src/components/iconify";
// import { Fab, Stack } from "@mui/material";
import { Box, Chip, Stack } from "@mui/material";
import { modelList } from "./modelList";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  cursor: "pointer",
  position: "fixed",
  paddingTop: theme.spacing(1.25),
}));

// ----------------------------------------------------------------------

export default function BottomCard({ onChangeModel }) {
  const render3DStatus = (
    <Chip
      label="3D"
      color="secondary"
      size="small"
      sx={{
        zIndex: 9,
        top: 3,
        right: 3,
        position: "absolute",
        textTransform: "uppercase",
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
        {modelList.map((model) => (
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
            <Box
              component="img"
              alt="模型"
              src={model.img}
              sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: "cover",
                position: "absolute",
              }}
              onClick={() => onChangeModel(model.id)}
            />
          </Box>
        ))}
      </Stack>
    </StyledRoot>
  );
}

BottomCard.propTypes = {
  onChangeModel: PropTypes.func,
};
