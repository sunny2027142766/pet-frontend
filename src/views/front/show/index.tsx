import { Box } from '@mui/material'

const Show = () => {
  return (
    <Box component="div" display="flex" flex="1" flexDirection="column">
      <Box component="h1" sx={{ fontSize: '1rem', fontWeight: 'bold', margin: '1rem auto' }}>
        宠物展示
      </Box>
    </Box>
  )
}

export default Show
