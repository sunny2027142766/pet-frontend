import { Paper, Box, Typography } from '@mui/material'

const SideBar = () => {
  return (
    <div>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6">公告板</Typography>
        <Box component="div">
          {/* 公告内容 */}
          <Typography>欢迎来到宠物社区！</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6">反馈</Typography>
        <Box component="div">
          {/* 反馈内容 */}
          <Typography>有任何建议，请告诉我们。</Typography>
        </Box>
      </Paper>
    </div>
  )
}

export default SideBar
