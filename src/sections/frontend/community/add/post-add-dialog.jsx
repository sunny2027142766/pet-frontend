import { useState } from "react";
import PropTypes from "prop-types";

import {
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Iconify from "src/components/iconify";

import RichTextEditor from "./rich-text-editor";

export default function PostAddDialog({ open, handleClose }) {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    console.log("帖子内容:", postContent);
    handleClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle>发表帖子</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="post"
          label="帖子标题"
          type="text"
          color="secondary"
          fullWidth
          variant="outlined"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          multiline
          rows={2}
          id="post"
          label="内容描述"
          color="secondary"
          fullWidth
          variant="outlined"
          value={postDesc}
          onChange={(e) => setPostDesc(e.target.value)}
        />
        <TextField
          margin="dense"
          multiline
          rows={2}
          id="post"
          label="帖子内容"
          color="secondary"
          fullWidth
          variant="outlined"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <Stack spacing={2}>
          <Button color="secondary" variant="info">
            帖子内容
          </Button>
          <RichTextEditor />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={handleClose}>
          取消
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Iconify icon="iconamoon:send-duotone" />}
          onClick={handlePost}
        >
          发表
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PostAddDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
