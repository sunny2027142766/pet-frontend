import { Button, Box } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import PostDialog from './postDialog'
import { useState } from 'react'

const RightBar = () => {
  const [open, setOpen] = useState(false)
  const handleSendPost = () => {
    setOpen(true)
  }
  const handleClosePost = () => {
    setOpen(false)
  }

  return (
    <Box component="div" display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Button
        variant="contained"
        color="info"
        startIcon={<AddCircleOutlineIcon />}
        sx={{ marginBottom: 2 }}
        onClick={handleSendPost}
      >
        发布帖子
      </Button>
      <PostDialog open={open} onClose={handleClosePost} />
    </Box>
  )
}

export default RightBar
