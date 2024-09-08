import React from 'react';
import { Box, Typography, Grid, Link, SvgIcon } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';



export default function Footer() {
  return (
    <Box maxWidth="4xl" mx="auto" px={6} py={12} style={{backgroundColor: '#FAFAFA'}}>
      <Box textAlign="center">
        <Typography variant="subtitle2" gutterBottom color="text.secondary" textTransform="uppercase" fontWeight="bold">
          Reliable
        </Typography>
        <Typography variant="h2" gutterBottom component="h2" fontWeight="bold">
          Get in Touch
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We're here to answer any questions you may have.
        </Typography>
      </Box>
      <Grid container spacing={8} mt={10}>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <SvgIcon component={MailOutlineIcon} color="action" sx={{ fontSize: 40 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Email
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Send us an email and we'll get back to you.
          </Typography>
          <Link href="#" color="primary" underline="hover">
            hello@reliume.io
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <SvgIcon component={ChatIcon} color="action" sx={{ fontSize: 40 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Live Chat
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Chat with our team in real-time for quick assistance.
          </Typography>
          <Link href="#" color="primary" underline="hover">
            Start a Chat
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <SvgIcon component={PhoneIcon} color="action" sx={{ fontSize: 40 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Phone
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Give us a call for any inquiries or support.
          </Typography>
          <Link href="#" color="primary" underline="hover">
            +1-555-000-0000
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <SvgIcon component={LocationOnIcon} color="action" sx={{ fontSize: 40 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Office
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Visit our office during business hours for in-person assistance.
          </Typography>
          <Link href="#" color="primary" underline="hover">
            123 Sample St., Sydney NSW 2000 AU
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}
