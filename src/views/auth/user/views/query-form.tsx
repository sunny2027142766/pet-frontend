import { Box, TextField, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useState } from 'react'

const Form = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearch = (event: any) => {
    setSearchTerm(event.target?.value)
  }
  const handleAdd = () => {
    // 处理新增用户的逻辑
  }

  return (
    <Box component="div" padding="20px">
      <TextField label="Search" value={searchTerm} onChange={handleSearch} fullWidth />
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd}>
        Add User
      </Button>
    </Box>
  )
}

export default Form
