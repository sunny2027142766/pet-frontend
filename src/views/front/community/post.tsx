import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import CommentIcon from '@mui/icons-material/Comment'
import { useState } from 'react'
import { Card, CardContent, CardActions, Typography, IconButton, Box, CardMedia } from '@mui/material'

const Post = ({ post }: any) => {
  const [likes, setLikes] = useState(post.likes || 0)
  const handleLike = () => {
    setLikes(likes + 1) // 简单的点赞功能，不涉及后端存储
  }

  return (
    <Card sx={{ marginBottom: 2, display: 'flex', flexDirection: 'column' }}>
      <Box component="div" sx={{ display: 'flex' }}>
        <CardContent sx={{ width: '80%' }}>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {post.author}
          </Typography>
          <Typography variant="body2">{post.content}</Typography>
        </CardContent>
        <CardMedia component="img" sx={{ width: '20%' }} image={post.image} alt={post.alt} />
      </Box>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={handleLike}>
          <ThumbUpAltIcon />
          <Typography sx={{ marginLeft: 0.5 }}>{likes}</Typography>
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Post
