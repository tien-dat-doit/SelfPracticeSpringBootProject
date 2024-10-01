import { Box } from '@mui/material'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import ScrollToTopButton from '../scrollToTop/ScrollToTopButton'

const WrapLayoutCustomer = () => {
  return (
    <Box>
        <Header />
        <ScrollToTopButton />
        <Outlet/>
        <Footer/>
    </Box>
  )
}

export default WrapLayoutCustomer