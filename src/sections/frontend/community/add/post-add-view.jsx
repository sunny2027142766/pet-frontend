import { useNavigate } from "react-router-dom";

import { Box, Stack, Button, Container, Typography } from "@mui/material";

import Iconify from "src/components/iconify";

export default function PostAddView() {
  const navigate = useNavigate();
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Button
          variant="text"
          color="secondary"
          startIcon={<Iconify icon="icon-park-outline:back" />}
          onClick={() => {
            navigate("/front/community");
          }}
        >
          返回
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h4">发表帖子</Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Stack>
    </Container>
  );
}
