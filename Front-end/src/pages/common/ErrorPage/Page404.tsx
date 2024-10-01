import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const naivigate = useNavigate();

  const handleGoHome = () => {
    naivigate(-1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      textAlign="center"
      sx={{
        backgroundImage: 'url("/login.jpg")',
        backgroundSize: "cover",
      }}
    >
       <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", p: 5 }}
      >
        <Box
          sx={{
            // m: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
      <Typography variant="h1" component="h1" color="primary">
        404
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Trang không tìm thấy
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ marginTop: 2 }}
      >
        Quay trở về
      </Button>
      </Box>
      </Container>
    </Box>
  );
};

export default Page404;
