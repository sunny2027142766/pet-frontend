import { Paper, Typography } from '@mui/material'

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
    <div>
      <Banner />
    </div>
  )
}

export default Home
