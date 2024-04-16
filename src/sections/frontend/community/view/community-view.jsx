import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";
import { Stack, Button, Container, Typography } from "@mui/material";

import { posts } from "src/_mock/blog";

import Iconify from "src/components/iconify";

import PostCard from "../post-card";
import PostSort from "../post-sort";
import PostSearch from "../post-search";
import PostAddDialog from "../add/post-add-dialog";

export default function CommunityView() {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">宠物社区</Typography>

        <PostSearch posts={posts} />

        <PostSort
          options={[
            { value: "latest", label: "最新" },
            { value: "popular", label: "流行" },
            { value: "oldest", label: "热门" },
          ]}
        />
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            // navigate("/front/community/add");
            setOpen(true);
          }}
        >
          发表帖子
        </Button>
        <PostAddDialog open={open} handleClose={() => setOpen(false)} />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
