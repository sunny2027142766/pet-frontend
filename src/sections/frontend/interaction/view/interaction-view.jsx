import { Box } from "@mui/material";
import { useState } from "react";
import FunctionWidget from "../function-widget";
import InteractionCard from "../interaction-card";
import HealthCard from "../health-card";

export default function InteractionView() {
  const [playAnimation, setPlayAnimation] = useState(false);

  const handleToggleAnimation = () => {
    setPlayAnimation(!playAnimation);
  };

  return (
    <Box sx={{ height: 1 }}>
      <InteractionCard playAnimation={playAnimation} />
      <FunctionWidget onToggleAnimation={handleToggleAnimation} />
      <HealthCard />
    </Box>
  );
}
