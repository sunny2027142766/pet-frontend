import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  Box,
  List,
  Stack,
  Avatar,
  Dialog,
  Button,
  ListItem,
  Container,
  TextField,
  Typography,
  DialogTitle,
  ListItemText,
  DialogContent,
  DialogActions,
  ListItemAvatar,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useRouter } from "src/routes/hooks";
import Iconify from "src/components/iconify";
import { fDate } from "src/utils/format-time";
import { fShortenNumber } from "src/utils/format-number";
import {
  likePost,
  sharePost,
  commentPost,
  getPostDetail,
  getPostCommentList,
} from "src/api/modules/post";

import { getItem } from "src/utils/local-storage";

const PostDetail = ({ comments, postInfo, refresh }) => {
  const { createTime, likeNum, commentNum, shareNum } = postInfo;
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  // 从localStroage获取当前发帖的用户
  const userInfo = getItem("userInfo");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    // 提交评论
    const newComment = {
      pid: postInfo.pid,
      uid: userInfo.uid,
      content: comment,
    };
    const res = await commentPost(newComment);
    console.log("评论 res", res);
    setComment("");
    refresh();
  };

  const handleLike = async () => {
    try {
      if (!liked) {
        const likeParams = {
          pid: postInfo.pid,
          uid: userInfo.uid,
          status: 1,
        };
        await likePost(likeParams);
        setLiked(true);
      } else {
        // 取消点赞
        const likeParams = {
          pid: postInfo.pid,
          uid: userInfo.uid,
          status: 0,
        };
        await likePost(likeParams);
        setLiked(false);
      }
      // 刷新页面
      refresh();
    } catch (error) {
      console.error("点赞失败:", error);
    }
  };

  const handleCloseShareDialog = async () => {
    const shareParams = {
      pid: postInfo.pid,
      uid: userInfo.uid,
    };
    await sharePost(shareParams);
    refresh();
    setShowShareDialog(false);
  };

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: "text.disabled",
        ...{
          opacity: 0.48,
          color: "common.black",
        },
      }}
    >
      {fDate(createTime, "yyyy-MM-dd")}
    </Typography>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        color: "text.disabled",
      }}
    >
      {[
        {
          number: commentNum,
          icon: "eva:message-circle-fill",
          handleClick: () => {},
        },
        {
          number: likeNum,
          icon: liked ? "iconamoon:like-fill" : "iconamoon:like-duotone",
          color: liked ? "error.main" : "text.black",
          handleClick: handleLike,
        },
        {
          number: shareNum,
          icon: "eva:share-fill",
          handleClick: () => setShowShareDialog(true),
        },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={{
            ...{
              opacity: 0.48,
              color: "common.black",
            },
          }}
        >
          <Iconify
            onClick={info.handleClick}
            width={20}
            icon={info.icon}
            color={info.color}
            sx={{ mr: 0.5 }}
          />
          <Typography variant="caption">
            {fShortenNumber(info.number)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Stack direction="column" spacing={2}>
      {/* 帖子内容展示 */}
      <Box
        sx={{
          maxHeight: "400px", // 设置固定的最大高度
          overflowY: "auto", // 添加滚动条
          padding: "16px", // 添加内边距
          backgroundColor: "rgba(99, 115, 129, 0.08)", // 设置背景色
          borderRadius: "8px", // 添加圆角
        }}
      >
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {renderDate}
        {renderInfo}
      </Stack>

      {/* 评论输入框和按钮 */}
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        label="发表评论"
        value={comment}
        onChange={handleCommentChange}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCommentSubmit}
      >
        发表评论
      </Button>

      {/* 评论列表 */}
      {comments.length > 0 ? (
        <List>
          {comments.map((com, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={com.avatar} src={`/preview${com.avatar}`} />
              </ListItemAvatar>
              <ListItemText
                primary={com.username}
                secondary={
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {com.content}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {fDate(com.createTime, "yyyy-MM-dd")}
                    </Typography>
                  </Stack>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary" align="center">
          暂时还没有人发表评论，快去发表吧！
        </Typography>
      )}

      {/* 分享弹框 */}
      <Dialog open={showShareDialog}>
        <DialogTitle>分享</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            点击复制链接进行分享: {window.location.href}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShareDialog}>确定</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

PostDetail.propTypes = {
  comments: PropTypes.array.isRequired,
  postInfo: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default function PostDetailView() {
  const router = useRouter();
  const { pid } = useParams();
  const [loading, setLoading] = useState(true); // 添加 loading 状态
  const [comments, setComments] = useState([]);
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    getPostInfo(pid);
  }, [pid]);

  const getPostInfo = async (postId) => {
    try {
      const { data: post } = await getPostDetail(postId);
      setPostInfo(post);
      const { data: coms } = await getPostCommentList(postId);
      setComments(coms);
      setLoading(false); // 数据加载完成后设置 loading 为 false
    } catch (error) {
      console.error("获取帖子信息失败:", error);
      setLoading(false);
    }
  };

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
            router.back();
          }}
        >
          返回
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h4">{postInfo.title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Stack>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <PostDetail
          comments={comments}
          postInfo={postInfo}
          refresh={() => getPostInfo(pid)}
        />
      )}
    </Container>
  );
}
