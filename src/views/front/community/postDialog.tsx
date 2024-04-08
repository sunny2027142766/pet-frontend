import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Button,
  IconButton,
  Paper,
  type PaperProps
} from '@mui/material'
import { DropzoneArea } from 'material-ui-dropzone'
import CloseIcon from '@mui/icons-material/Close'
import Draggable from 'react-draggable'

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const PostDialog = ({ open, onClose }: any) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState<any[]>([])

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value)
  }

  const handleContentChange = (event: any) => {
    setContent(event.target.value)
  }

  const handleImageUpload = (files: any) => {
    setImages([...images, ...files])
  }

  const handlePost = () => {
    // 处理发表帖子的逻辑，可以发送到后端或执行其他操作
    const postData = {
      title,
      content,
      images
    }
    console.log(postData)
    // 关闭弹框
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth PaperComponent={PaperComponent}>
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        发表帖子
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          variant="outlined"
          fullWidth
          label="帖子标题"
          value={content}
          onChange={handleTitleChange}
        />
        <TextField
          multiline
          rows={4}
          margin="dense"
          variant="outlined"
          fullWidth
          label="帖子内容"
          value={content}
          onChange={handleContentChange}
        />
        <DropzoneArea
          acceptedFiles={['image/jpeg', 'image/png']}
          filesLimit={3}
          dropzoneText="将图片拖放到此处，或点击选择"
          onChange={handleImageUpload}
        />
        <Typography variant="body2" color="textSecondary">
          最多可上传3张图片
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          取消
        </Button>
        <Button onClick={handlePost} color="info" variant="contained" disabled={!content && images.length === 0}>
          发表帖子
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PostDialog
