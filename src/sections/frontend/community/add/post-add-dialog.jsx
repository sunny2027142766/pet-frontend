import { useState } from "react";
import PropTypes from "prop-types";

import {
  Alert,
  Stack,
  Dialog,
  Button,
  Snackbar,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Iconify from "src/components/iconify";
import {addPost} from "src/api/modules/post"
import { getItem } from "src/utils/local-storage";

import RichTextEditor from "./rich-text-editor";

export default function PostAddDialog({ open, handleClose }) {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImg, setPostImg] = useState("");

  const [tipOpen, setTipOpen] = useState(false);
  const [tip, setTip] = useState("");

  const handlePost = async () => {
    console.log('帖子内容:', { postTitle, postDesc, postContent, postImg });
    // 从localStroage获取当前发帖的用户
    const userInfo = getItem("userInfo");

    const addPostParams = {
      title: postTitle,
      description: postDesc,
      content: postContent,
      img: postImg ,
      uid:userInfo.uid,
    };
    const res = await addPost(addPostParams);
    console.log('res:', res);
    if (res.code === 200) {
      // 提示添加成功
      handleClose();
      setTip('发帖成功');
      setTipOpen(true);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // 使用你的上传图片的 API 地址
      const response = await fetch('/api/file/upload', {
        method: 'POST',
        body: formData
      });
      

      if (!response.ok) {
        throw new Error('上传图片出错');
      }

      const responseData = await response.json();
      console.log(responseData);
      const imageUrl = responseData.data;

      // 设置帖子图片 URL
      setPostImg(imageUrl);
    } catch (error) {
      setTip('上传图片出错');
      setTipOpen(true);
      console.error('图片上传错误:', error.message);
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        maxWidth="lg"
      >
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
            id="postDesc"
            label="描述"
            color="secondary"
            fullWidth
            variant="outlined"
            value={postDesc}
            onChange={(e) => setPostDesc(e.target.value)}
          />
          <TextField
            margin="dense"
            id="postImg"
            label="帖子背景图片"
            type="file"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          <Stack spacing={2}>
            <Button
              color="secondary"
              variant="info"
            >
              帖子内容
            </Button>
            <RichTextEditor
              text={postContent}
              setText={(text) => setPostContent(text)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            color="info"
            onClick={handleClose}
          >
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

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={tipOpen}
        onClose={() => setTipOpen(false)}
        autoHideDuration={1000}
      >
        <Alert
          severity={tip === '发帖成功' ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {tip}
        </Alert>
      </Snackbar>
    </>
  );
}

PostAddDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
