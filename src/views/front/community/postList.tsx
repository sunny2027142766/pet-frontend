import { Box, Grid, Pagination } from '@mui/material'
import Post from './post'
import { ChangeEvent, useState } from 'react'

// 假设的帖子数据
const posts = [
  {
    id: 1,
    title: '我家的狗狗',
    author: '小明',
    content: '今天我家的狗狗又做了一件可爱的事情...',
    likes: 5,
    alt: '我家的狗狗'
  },
  { id: 2, title: '关于猫咪的饮食', author: '猫奴', content: '猫咪应该怎么喂养呢？', likes: 3, alt: '关于猫咪的饮食' },
  { id: 3, title: '关于猫咪的饮食', author: '猫奴', content: '猫咪应该怎么喂养呢？', likes: 3, alt: '关于猫咪的饮食' },
  { id: 4, title: '关于猫咪的饮食', author: '猫奴', content: '猫咪应该怎么喂养呢？', likes: 3, alt: '关于猫咪的饮食' },
  { id: 5, title: '关于猫咪的饮食', author: '猫奴', content: '猫咪应该怎么喂养呢？', likes: 3, alt: '关于猫咪的饮食' },
  { id: 6, title: '关于猫咪的饮食', author: '猫奴', content: '猫咪应该怎么喂养呢？', likes: 3, alt: '关于猫咪的饮食' }
  // 可以添加更多帖子...
]
const pageSize = 5 // 每页显示的帖子数

const PostList = () => {
  const [page, setPage] = useState(1) // 当前页码
  const handleChangePage = (_event: ChangeEvent<any>, newPage: number) => {
    setPage(newPage)
  }

  // 计算当前页的帖子
  const currentPosts = posts.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div>
      <Box component="div" sx={{ maxHeight: 'calc(100vh - (65px + 65px + 64px + 48px))', overflowY: 'auto' }}>
        <Grid container spacing={2}>
          {currentPosts.map(post => (
            <Grid item key={post.id} xs={12}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* 分页组件 */}
      <Box component="div" sx={{ textAlign: 'center', marginTop: 'auto' }}>
        <Pagination
          count={Math.ceil(posts.length / pageSize)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
        />
      </Box>
    </div>
  )
}

export default PostList
