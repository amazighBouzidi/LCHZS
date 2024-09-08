import React from 'react'
import { Box, Typography, Button } from '@mui/material';

export default function NotFoundPage() {
  return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100vw"
        bgcolor="background.paper"
        color="text.primary"
    >
        <Typography variant="h1" component="h1" gutterBottom>
            404
        </Typography>
        <Typography variant="h4" gutterBottom>
            Oops! The page you're looking for isn't here.
        </Typography>
        <Typography variant="h5">
            You might have the wrong address, or the page may have moved.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 6 }}>
            Back to home
        </Button>
    </Box>
  )
}
