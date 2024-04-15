import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import CommentIcon from '@mui/icons-material/Comment'
import { useState } from 'react'
import { Card, CardContent, CardActions, Typography, IconButton, CardMedia, CardHeader, Avatar } from '@mui/material'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const Post = ({ post }: any) => {
  const [likes, setLikes] = useState(post.likes || 0)
  const handleLike = () => {
    setLikes(likes + 1) // 简单的点赞功能，不涉及后端存储
  }

  const cardHeaderStyles = {
    '& .MuiCardHeader-title': {
      color: '#3f51b5',
      fontSize: '1.2rem'
    }
  }

  return (
    <Card
      sx={{
        margin: 2,
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        sx={cardHeaderStyles}
        title={post.title}
        subheader={post.author}
      />
      <CardContent sx={{ width: '80%' }}>
        <Typography variant="body2">{post.content}</Typography>
        <CardMedia component="img" sx={{ width: '20%' }} image={post.image} alt={post.alt} />
      </CardContent>
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
