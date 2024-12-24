import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        py: 2,
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      <Typography variant="body1">© 2024 My Website</Typography>
      <Typography variant="body2">All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;