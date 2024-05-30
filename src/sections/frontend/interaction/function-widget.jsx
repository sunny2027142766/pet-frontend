import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Iconify from "src/components/iconify";
import { Fab, Stack } from "@mui/material";

// StyledRoot definition remains the same
const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 200,
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
}));

const buttonConfig = [
  {
    id: 1,
    icon: "openmoji:guide-dog",
    img: "Myfile/func/1.png",
    label: "动画",
    onClick: "onToggleAnimation",
  },
  {
    id: 2,
    icon: "fluent-emoji:leftwards-hand",
    img: "Myfile/func/2.png",
    label: "抚摸",
    onClick: "onStroke",
  },
  {
    id: 3,
    icon: "streamline-emojis:cat-face-with-tears-of-joy",
    img: "Myfile/func/3.png",
    label: "表情",
    onClick: "onExpress",
  },
  {
    id: 4,
    icon: "twemoji:canned-food",
    img: "Myfile/func/4.png",
    label: "喂食",
    onClick: "onFeed",
  },
  {
    id: 5,
    icon: "fluent-emoji:petri-dish",
    img: "Myfile/func/5.png",
    label: "喝水",
    onClick: "onDrink",
  },
  {
    id: 6,
    icon: "icon-park:clear",
    img: "Myfile/func/6.png",
    label: "清洁",
    onClick: "onClean",
  },
];

function FunctionWidget({
  onToggleAnimation,
  onStroke,
  onExpress,
  onFeed,
  onDrink,
  onClean,
  funcs,
}) {
  // Map actions to their function props
  const actionHandlers = {
    onToggleAnimation,
    onStroke,
    onExpress,
    onFeed,
    onDrink,
    onClean,
  };

  return (
    <StyledRoot>
      <Stack spacing={2}>
        {buttonConfig
          .filter((item) => funcs.includes(item.id))
          .map((button) => (
            <Fab
              key={button.label}
              variant="extended"
              onClick={actionHandlers[button.onClick]}
            >
              <Iconify icon={button.icon} width={24} height={24} mr={1} />
              {button.label}
            </Fab>
          ))}
      </Stack>
    </StyledRoot>
  );
}

FunctionWidget.propTypes = {
  onToggleAnimation: PropTypes.func,
  onStroke: PropTypes.func,
  onExpress: PropTypes.func,
  onFeed: PropTypes.func,
  onDrink: PropTypes.func,
  onClean: PropTypes.func,
  funcs: PropTypes.array,
};

export default FunctionWidget;
