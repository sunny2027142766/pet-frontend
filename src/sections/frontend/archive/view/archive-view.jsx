import { Box, Paper, Container, Typography } from "@mui/material";

const Banner = (
  <Paper elevation={3} sx={{ p: 2 }}>
    <Typography variant="h4" gutterBottom>
      欢迎 来到 虚拟宠物互动平台
    </Typography>
    <Typography variant="body1">这是首页板块.</Typography>
  </Paper>
);

export default function ArchiveView() {
  return (
    <Container>
      <Box component="div" display="flex" flex="1" flexDirection="column">
        {Banner}
      </Box>
    </Container>
  );
}
