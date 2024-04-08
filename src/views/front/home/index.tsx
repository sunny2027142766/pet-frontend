import { Box, Paper, Typography } from '@mui/material'

const Banner = () => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        欢迎 来到 虚拟宠物互动平台
      </Typography>
      <Typography variant="body1">这是首页板块.</Typography>
    </Paper>
  )
}

const Home = () => {
  return (
    <Box component="div" display="flex" flex="1" flexDirection="column">
      <Banner />
    </Box>
  )
}

export default Home
