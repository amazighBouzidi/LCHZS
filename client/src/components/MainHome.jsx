import React from 'react'
import { Container, Box, Grid, Typography, CardMedia, Link, Button } from '@mui/material';
import laboratoire from '../assets/images/laboratoire.jpg'
import patientE from '../assets/images/patientE1.jpg'
import analyseR from '../assets/images/analyseR1.jpg'
import placeHolder from '../assets/images/placeholders.jpg'

export default function MainHome() {
  return (
    <>
      <Box py={{ xs: 12, md: 12, xl: 16 }} className="w-full">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <CardMedia
                component="img"
                image={laboratoire}
                alt="Image"
                title="Laboratory Services"
                sx={{
                  width: '100%',
                  height: 310,
                  borderRadius: '1rem',
                  objectFit: 'cover',
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6} container spacing={2}>
              <Typography variant="h3" component="h3" fontWeight="bold">
                Service de laboratoire complet pour des diagnostics précis
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Dans notre laboratoire d'hématologie et bureau, nous proposons une large gamme de services pour analyser
                des échantillons de sang et des spécimens de pathologie. Notre équipe d'experts utilise des technologies
                et des techniques de pointe pour fournir des diagnostics précis et des résultats en temps opportun.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h4" fontWeight="bold">
                Résultats de sang
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Équipements à la pointe de la technologie pour des tests et analyses précis du sang.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h4" fontWeight="bold">
                Services pathologistes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Des pathologistes experts examinent des échantillons de tissus pour identifier des maladies et des
                conditions.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={{ xs: 12, md: 12, lg: 16 }} className="w-full" style={{backgroundColor: '#A9CCE3', backdropFilter: 'blur(12px)'}}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6} container direction="column" justifyContent="center" spacing={4}>
              <Box>
                <Grid container spacing={1.5}>
                  <Grid item xs={8}>
                    <Typography fontWeight="bold" variant='h5'>1. Services complets pour vous</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="text.secondary" variant="body1">
                      Nous offrons une large gamme de services comprenant des consultations en cabinet et des programmes éducatifs pour les patients.
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography fontWeight="bold" variant='h5'>2. Consultations d'experts disponibles</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="text.secondary" variant="body1">
                      Notre équipe de professionnels expérimentés est prête à vous fournir des consultations expertes.
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography fontWeight="bold" variant='h5'>3. Programmes d'éducation des patients</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="text.secondary" variant="body1">
                      Nous proposons des programmes éducatifs pour donner aux patients les connaissances nécessaires concernant leur état de santé.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <CardMedia
                component="img"
                image={patientE}
                alt="Service Image"
                sx={{
                  height: 400,
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  borderRadius: '1rem',
                  objectFit: 'cover',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={{ xs: 12, md: 12 }} className="w-full">
        <Container className="flex flex-col items-center space-y-4" maxWidth='lg'>
          <Box className="text-center space-y-2">
            <Typography variant="h2" component="h3" className="font-bold tracking-tighter" sx={{ fontSize: { xs: '3rem', sm: '5rem' } }}>
              Our Analyses
            </Typography>
            <Typography className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Our laboratory provides a variety of analyses to help you better understand your samples.
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 12, lg: 6 }}  justifyContent="center">
            {/* Repeat this Grid item for each analysis type */}
            <Grid item className="flex flex-col items-center space-y-2">
              <CardMedia
                component="img"
                image={placeHolder}
                alt="Microscopy"
                className="rounded-full"
                sx={{
                  height: 150,
                  width: 150,
                  aspectRatio: '1',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
              <Typography variant="h4" component="h3" className="font-bold">
                Blood Tests
              </Typography>
              <Button variant='contained'>
                Learn More
              </Button>
            </Grid>
            <Grid item className="flex flex-col items-center space-y-2">
              <CardMedia
                component="img"
                image={placeHolder}
                alt="Microscopy"
                className="rounded-full"
                sx={{
                  height: 150,
                  width: 150,
                  aspectRatio: '1',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
              <Typography variant="h4" component="h3" className="font-bold">
                Spectroscopy
              </Typography>
              <Button variant='contained'>
                Learn More
              </Button>
            </Grid>
            <Grid item className="flex flex-col items-center space-y-2">
              <CardMedia
                component="img"
                image={placeHolder}
                alt="Microscopy"
                className="rounded-full"
                sx={{
                  height: 150,
                  width: 150,
                  aspectRatio: '1',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
              <Typography variant="h4" component="h3" className="font-bold">
                Microscopy
              </Typography>
              <Button variant='contained'>
                Learn More
              </Button>
            </Grid>
            <Grid item className="flex flex-col items-center space-y-2">
              <CardMedia
                component="img"
                image={placeHolder}
                alt="Microscopy"
                className="rounded-full"
                sx={{
                  height: 150,
                  width: 150,
                  aspectRatio: '1',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
              <Typography variant="h4" component="h3" className="font-bold">
                Chromatography
              </Typography>
              <Button variant='contained'>
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={{ xs: 12, lg: 24 }} className="w-full" style={{ backgroundColor: '#3BC8E3'}}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={7}>
              <CardMedia
                component="img"
                image={analyseR}
                alt="Image"
                sx={{
                  mx: 'auto',
                  height: 338,
                  width: 600,
                  borderRadius: '1rem',
                  objectFit: 'cover',
                }}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <Box display="flex" flexDirection="column" justifyContent="center" gap={4}>
                <Typography variant="h2" component="h2" fontWeight="bold">
                  Accédez facilement et en toute sécurité à vos résultats
                </Typography>
                <Typography sx={{ maxWidth: 700, color: 'text.secondary', typography: { md: 'h6', lg: 'body1', xl: 'h6' } }}>
                  Notre portail patient fournit une plateforme sécurisée et conviviale pour que vous puissiez accéder à vos résultats de tests médicaux. 
                  En quelques clics seulement, vous pouvez consulter vos résultats depuis le confort de votre domicile.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" fontWeight="bold">
                      Accès pratique
                    </Typography>
                    <Typography color="text.secondary" variant='body1'>
                      Consultez et téléchargez facilement vos résultats de tests de laboratoire, à tout moment et n'importe où.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" fontWeight="bold">
                      Expérience simplifiée
                    </Typography>
                    <Typography color="text.secondary"  variant='body1' >
                      Gérez vos rendez-vous, communiquez avec votre fournisseur de soins de santé et accédez à des ressources éducatives.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
