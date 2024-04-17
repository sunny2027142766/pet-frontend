import { Box, Paper, Container, Typography } from "@mui/material";

import FunctionWidget from "../function-widget";

const Banner = (
  <Paper elevation={3} sx={{ p: 2 }}>
    <Typography variant="h4" gutterBottom>
      欢迎 来到 虚拟宠物互动平台
    </Typography>
    <Typography variant="body1">这是首页板块.</Typography>
  </Paper>
);

export default function InteractionView() {
  return (
    <Container sx={{ height: 1 }}>
      <Box display="flex" flex="1" flexDirection="column">
        {Banner}
      </Box>
      <FunctionWidget />
    </Container>
  );
}
