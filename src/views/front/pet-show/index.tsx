import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import Top from './top'

const Banner = () => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        欢迎 来到 虚拟宠物互动平台
      </Typography>
      <Typography variant="body1">This is a banner section. You can put your banner content here.</Typography>
    </Paper>
  )
}

const Footer = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFAE01' }}>
      <Toolbar>
        <Typography variant="body1" color="inherit">
          © {new Date().getFullYear()} Virtual Pet. @zcy
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const Home = () => {
  return (
    <div>
      <Top children={<div>Top</div>} />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {[1, 2, 3, 4, 5, 6, 7].map(item => (
              <Banner key={item} />
            ))}
          </Grid>
          {/* Other sections can be added here */}
        </Grid>
      </Container>
      <Footer />
    </div>
  )
}

const PetShow = () => {
  return <Home />
}

export default PetShow
