import { Grid } from '@mui/material'
import SideBar from './sideBar'
import PostList from './postList'
import RightBar from './rightBar'

const Community = () => {
  return (
    <Grid container spacing={2}>
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
  )
}

export default Community
