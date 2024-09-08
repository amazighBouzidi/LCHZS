import React from 'react'
import { Box, Grid, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import virus from '../assets/images/humandna.png'
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import MainHome from '../components/MainHome';
import '../assets/css/home.css'

export default function Home() {
  const logoStyle = {
    width: '115px',
    height: 'auto',
    cursor: 'pointer',
  };
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppAppBar />
      <div className="mainC">  
        <div className="wave"> 
        </div>     
      </div> 
      <Grid container>
        <Grid item xs={12} md={4} lg={6}>
          <Typography variant='h3' className='textH2' >
            Transformant l'hématologie avec des solutions innovantes
          </Typography>
          <Typography variant='h6' className='textbody'>
                Bienvenue dans notre laboratoire et bureau d'hématologie à la pointe de la technologie. 
            Nous sommes spécialisés dans la fourniture de solutions de pointe pour des diagnostics précis et efficaces.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
          <img src={virus} className='virusImage' /> 
        </Grid>
      </Grid>
      <Box sx={{mt: '45rem'}} />
      <MainHome />
      <Box sx={{mt: '15rem'}} />
      <Footer />
    </React.Fragment>
  )
}
