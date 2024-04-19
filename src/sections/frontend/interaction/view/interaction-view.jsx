import { Box } from "@mui/material";
import { useState } from "react";
import FunctionWidget from "../function-widget";
import InteractionCard from "../interaction-card";
import HealthCard from "../health-card";
import BottomCard from "../bottom-card";

export default function InteractionView() {
  const [playAnimation, setPlayAnimation] = useState(false);

  const [modelID, setModelID] = useState(1);

  const handleToggleAnimation = () => {
    setPlayAnimation(!playAnimation);
  };

  const handleChangeModel = (index) => {
    // 处理模型切换逻辑
    console.log("点击底部模型===>", index);
    setModelID(index);
  };

  return (
    <Box sx={{ height: 1 }}>
      <InteractionCard modelID={modelID} playAnimation={playAnimation} />
      <FunctionWidget onToggleAnimation={handleToggleAnimation} />
      <BottomCard onChangeModel={handleChangeModel} />
      <HealthCard />
    </Box>
  );
}
