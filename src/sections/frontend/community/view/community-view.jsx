import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";
import { Stack, Button, Container, Typography } from "@mui/material";

import Iconify from "src/components/iconify";

import { getPostList } from "src/api/modules/post";

import PostCard from "../post-card";
import PostSearch from "../post-search";
import PostAddDialog from "../add/post-add-dialog";

export default function CommunityView() {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const getPostListData = async (title = "") => {
    const { data } = await getPostList({ title });
    setPosts(data);
  };

  const handleSearch = (value) => {
    getPostListData(value);
  };

  useEffect(() => {
    getPostListData();
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">宠物社区</Typography>

        <PostSearch onSearch={handleSearch} />

        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            setOpen(true);
          }}
        >
          发表帖子
        </Button>
        <PostAddDialog
          open={open}
          handleClose={() => {
            setOpen(false);
            getPostListData();
          }}
        />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.pid} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
