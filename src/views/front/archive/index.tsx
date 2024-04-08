import { Box } from '@mui/material'
import PetArchive from './petArchive'

const petData = [
  { name: '咪咪', species: '猫', age: 3, description: '一只白色的猫.' },
  { name: '旺财', species: '狗', age: 5, description: '一个棕色的小狗.' },
  { name: '旺财', species: '狗', age: 5, description: '一个棕色的小狗.' },
  { name: '旺财', species: '狗', age: 5, description: '一个棕色的小狗.' },
  { name: '旺财', species: '狗', age: 5, description: '一个棕色的小狗.' },
  { name: '旺财', species: '狗', age: 5, description: '一个棕色的小狗.' },
  { name: '旺财', species: '狗', age: 5, description: '一个棕色的小狗.' }
  // Add more pet data as needed
]

const Archive = () => {
  return (
    <Box component="div" display="flex" flex="1" flexDirection="column">
      <Box component="h1" sx={{ fontSize: '1rem', fontWeight: 'bold', margin: '1rem auto' }}>
        宠物档案馆
      </Box>
      <PetArchive pets={petData} />
    </Box>
  )
}

export default Archive
