import { Box } from '@mui/material'
import Header from '../../components/common/header/Header'
import { Outlet } from 'react-router-dom'

const WrapLayoutUser = () => {
  return (
    <Box>
        <Header />
        <Outlet/>
    </Box>
  )
}

export default WrapLayoutUser