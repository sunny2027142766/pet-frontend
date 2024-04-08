import { Button, Box } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const RightBar = () => {
  return (
    <Box component="div" display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ marginBottom: 2 }}>
        发布帖子
      </Button>
      {/* 其他功能按钮 */}
    </Box>
  )
}

export default RightBar
