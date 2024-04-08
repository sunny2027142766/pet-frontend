import { Box, Grid } from '@mui/material'
import SideBar from './sideBar'
import PostList from './postList'
import RightBar from './rightBar'

const Community = () => {
  return (
    <Box component="div" display="flex" flex="1" flexDirection="column">
      <Box component="h1" sx={{ fontSize: '1rem', fontWeight: 'bold', margin: '1rem auto' }}>
        宠物交流社区
      </Box>
      <Grid container spacing={2} flex="1">
        <Grid item xs={12} md={2}>
          <SideBar />
        </Grid>
        <Grid item xs={12} md={8}>
          <PostList />
        </Grid>
        <Grid item xs={12} md={2}>
          <RightBar />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Community
