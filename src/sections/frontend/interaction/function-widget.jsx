import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Iconify from "src/components/iconify";
import { Fab, Stack } from "@mui/material";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 10,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme.spacing(50),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
}));

// ----------------------------------------------------------------------

export default function FunctionWidget({ onToggleAnimation }) {
  return (
    <StyledRoot>
      <Stack spacing={2}>
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
      </Stack>
    </StyledRoot>
  );
}

FunctionWidget.propTypes = {
  onToggleAnimation: PropTypes.func,
};
