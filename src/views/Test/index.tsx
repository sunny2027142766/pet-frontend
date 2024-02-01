import { Box } from "@mui/material";

import Header from "../../components/Header";

const Test = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="测试" subtitle="测试小标题" />
      </Box>
    </Box>
  );
};

export default Test;
