import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'

const PetArchive = ({ pets }: any) => {
  return (
    <Grid container spacing={2}>
      {pets.map((pet: any, index: number) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Card>
            <CardMedia component="img" sx={{ height: 140 }} image={pet.image} title="Pet" />
            <CardContent>
              <Typography variant="h5" component="h2">
                {pet.name}
              </Typography>
              <Typography color="textSecondary">种类: {pet.species}</Typography>
              <Typography color="textSecondary">年龄: {pet.age}</Typography>
              <Typography color="textSecondary">描述: {pet.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">分享</Button>
              <Button size="small">了解更多</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default PetArchive
