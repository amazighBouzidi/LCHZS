import React from 'react';
import { makeStyles } from '@mui/material';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from '@mui/material';
import analyseR from '../assets/images/laboratoire.jpg'

const test = () => {

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Trackmania
            </Typography>
            <Typography paragraph>
              As one of the invited participants in the Trackmania World Tour, we looked towards establishing a duo that
              can contend for the trophy. Joining our long-time driver Dennis “massa” Lotze is another world-class German
              driver, Nico “Granady” Gyarmati.
            </Typography>
            <Typography paragraph>
              The two of them will be representing BIG in the Trackmania World Tour starting in 2023, and will be facing
              off against seven other duos in a race for the championship title. With the two best German drivers backing
              us up, we are filled with optimism for the upcoming season and can’t wait to start!
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary">More</Button>
              </Grid>
              <Grid item>
                <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                  {/* Assuming LocateIcon is an SVG component */}
                  <Typography variant="body1" sx={{ ml: 1 }}>Dennis "massa" Lotze</Typography>
                </div>
              </Grid>
              <Grid item>
                <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                  {/* Assuming LocateIcon is an SVG component */}
                  <Typography variant="body1" sx={{ ml: 1 }}>Nico "Granady" Gyarmati</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              alt="Trackmania team"
              src={analyseR}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
                objectFit: 'cover',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default test;
