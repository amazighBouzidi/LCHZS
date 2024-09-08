import React from 'react'
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GoogleIcon from '../components/GoogleIcon';
import { GoogleLogin } from 'react-google-login';
import{ registerUserWithGoogle, registerUserWithForm, authentificationUserWithForm } from '../helper/helperUser'
import { useNavigate } from 'react-router-dom'
import images from '../data/images';
import convertToBase64 from '../helper/convert';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Key from '@mui/icons-material/Key';
import { useFormik } from "formik";
import validationSchema from '../utils/validationSchemaUser';
import validationSchemaAuth from '../utils/validationSchemaLogin';
import convertAndCompress from '../helper/convertAndCompress';


interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}

const logoStyle = {
  width: '95px',
  height: 'auto',
  backgroundSize: 'cover',
  cursor: 'pointer',
};

const styles = {
  profile: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
  },
  profileImg: {
    border: '4px solid #E5E7EB',
    width: '135px',
    height: '135px',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      border: '4px solid #D1D5DB',
    },
  },
  input: {
    display: 'none',
  },
};

const { logo, loginF, loginF2 } = images;

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      sx={{height: 20}}
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      {...other}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Login() {
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [file, setFile] = React.useState('')
  const [error, setError] = React.useState('')
  const { Avatars } = images

  const onUpload = async e => {
    const base64 = await convertAndCompress(e.target.files[0]);
    setFile(base64);
  }

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const googleSuccess = async (res) => {
    const { googleId, profileObj } = res;
    console.log('googleSuccessful');
    registerUserWithGoogle(googleId, profileObj)
    .then(({msg, userType}) => {
        console.log('Registration successful:', msg);
        userType === 'client' ? navigate('/homeClient', {state: { activePage: '/homeClient', activeDashboard: true }}) 
          : userType === 'agentAcceuil' ? navigate('/homeAgentAcceuil', { state: { activePage: '/homeAgentAcceuil', activeDashboard: true }})
          : userType === 'technicienLaboratoire' ? navigate('/homeTechnicienLaboratoire', { state: { activePage: '/homeTechnicienLaboratoire', activeDashboard: true } }) 
          : userType === 'administrateur' ? navigate('/homeAdmin', { state: { activePage: '/homeAdmin', activeDashboard: true } }) 
          : navigate('/login')
    })
    .catch(error => {
        console.error('Registration failed:', error);
    });
    
  }

  const googleFailure = async (error) => {
    console.log(error);
    console.log('google Sign In was unsuccessful. Try Again Later');
  }

  const handleSubmit = async (values) => {
    registerUserWithForm(values, file)
    .then(msg => {
      console.log('Registration successful:', msg);
      navigate('/login')
    })
    .catch(error => {
      console.error('Registration failed:', error);
    });
  }

  const handleSubmitAuthentification =async (values) => {
    authentificationUserWithForm(values)
    .then(user =>{
      console.log('Sign In Successfuly')
      user.userType === 'patient' ? navigate('/homeClient', {state: { activePage: '/homeClient', activeDashboard: true }})
        : user.userType === 'agentAccueil' ? navigate('/homeAgentAcceuil', { state: { activePage: '/homeAgentAcceuil', activeDashboard: true }})
        : user.userType === 'technicienLaboratoire' ? navigate('/homeTechnicienLaboratoire', { state: { activePage: '/homeTechnicienLaboratoire', activeDashboard: true } })
        : user.userType === 'administrateur' ? navigate('/homeAdmin', { state: { activePage: '/homeAdmin', activeDashboard: true } })
        : navigate('/login')
    })
    .catch(error =>{
      setError(error.message)
      console.log('authentification failed: ',error)
    })
  }

  const initialValues = {
    lastName: '',
    firstName: '',
    address: '',
    phoneNumber: '',
    dateBirth: '',
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  const formikAuth = useFormik({
    initialValues : {
      email: '',
      password: ''
    },
    onSubmit: handleSubmitAuthentification,
    validationSchema: validationSchemaAuth,
  })

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton >
                <Link href='/'>
                  <img src={logo} style={logoStyle} />
                </Link>
              </IconButton>
              <Typography level="title-lg">Docteur Zeghouati Salim</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            {!isRegistering ? (
              <Stack gap={4} sx={{ mb: 2 }}>
                <Stack gap={1}>
                  <Typography component="h1" level="h3">
                    Connexion
                  </Typography>
                  <Typography level="body-sm">
                    Vous n'etes pas inscrit?{' '}
                    <Link onClick={toggleForm} level="title-sm">
                      Inscrivez-vous!
                    </Link>
                  </Typography>
                </Stack>
                <GoogleLogin 
                  clientId= ""
                  render={(renderProps) => (
                    <Button
                      variant="soft"
                      color="neutral"
                      fullWidth
                      startDecorator={<GoogleIcon />}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                    Continue Avec Google
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </Stack>
            ): (
              <Stack gap={1}>
                  <Typography component="h1" level="h3">
                    Inscription
                  </Typography>
                  <Typography level="body-sm">
                    Vous etes déja inscrit?{' '}
                    <Link onClick={toggleForm} level="title-sm">
                      Connectz-vous!
                    </Link>
                  </Typography>
              </Stack>
            )}
            {!isRegistering ?(
              <Divider
                sx={(theme) => ({
                  [theme.getColorSchemeSelector('light')]: {
                    color: { xs: '#FFF', md: 'text.tertiary' },
                  },
                })}
              >
                or
              </Divider>
            ) : ''}
            <Stack gap={4} sx={{ mt: 2 }}>
              {!isRegistering ? (
                <form onSubmit={formikAuth.handleSubmit}>
                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input  
                      type="email"  
                      {...formikAuth.getFieldProps('email')}
                      error={
                        formikAuth.touched.email && Boolean(formikAuth.errors.email)
                      } 
                    />
                    {(formikAuth.touched.email && formikAuth.errors.email) && <Typography color="danger" level="body-sm" >{formikAuth.errors.email}</Typography>}
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Mot De Passe</FormLabel>
                    <Input 
                      type='password'
                      placeholder="Type in here…"
                      {...formikAuth.getFieldProps('password')}
                      error={
                        formikAuth.touched.password && Boolean(formikAuth.errors.password)
                      }                        
                    />
                    {(formikAuth.touched.password && formikAuth.errors.password) && <Typography color="danger" level="body-sm" >{formikAuth.errors.password}</Typography>}
                  </FormControl>
                  {error && (<Typography color="danger" level="body-sm" >{error}</Typography>)}
                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Checkbox size="sm" label="Se Souvenir de moi" name="persistent" />
                      <Link level="title-sm" href="#replace-with-a-link">
                        Mot De Passe Oublié?
                      </Link>
                    </Box>
                    <Button type="submit" fullWidth>
                      Se Connecter
                    </Button>
                  </Stack>
                </form>
              ) : (
                <Container component="main" maxWidth="lg">
                  <div style={styles.profile}>
                    <label htmlFor="profile">
                      <img
                        alt="avatar"
                        src={file || Avatars}
                        style={styles.profileImg}
                      />
                    </label>

                    <input
                      onChange={onUpload}
                      accept="image/*"
                      style={styles.input}
                      id="profile"
                      type="file"
                    />
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} maxWidth="lg">
                      <Grid item xs={12} sm={6} md={6}>
                        <FormControl required>
                          <FormLabel>Nom</FormLabel>
                          <Input 
                            type="text" 
                            size="md" 
                            {...formik.getFieldProps('lastName')}
                            error={
                              formik.touched.lastName && Boolean(formik.errors.lastName)
                            }   
                          />
                          {(formik.touched.lastName && formik.errors.lastName) && <Typography color="danger" level="body-sm" >{formik.errors.lastName}</Typography>}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl required>
                          <FormLabel>Prénom</FormLabel>
                          <Input 
                            type="text" 
                            size="md"
                            {...formik.getFieldProps('firstName')}
                            error={
                              formik.touched.firstName && Boolean(formik.errors.firstName)
                            }    
                          />
                          {(formik.touched.firstName && formik.errors.firstName) && <Typography color="danger" level="body-sm" >{formik.errors.firstName}</Typography>}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl required>
                          <FormLabel>Adresse</FormLabel>
                          <Input 
                            type="text" 
                            size="md"
                            {...formik.getFieldProps('address')}
                            error={
                              formik.touched.address && Boolean(formik.errors.address)
                            }  
                          />
                          {(formik.touched.address && formik.errors.address) && <Typography color="danger" level="body-sm" >{formik.errors.address}</Typography>}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl required>
                          <FormLabel>Téléphone</FormLabel>
                          <Input 
                            type="text" 
                            size="md" 
                            {...formik.getFieldProps('phoneNumber')}
                            error={
                              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
                            }
                          />
                          {(formik.touched.phoneNumber && formik.errors.phoneNumber) && <Typography color="danger" level="body-sm" >{formik.errors.phoneNumber}</Typography>}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl required>
                          <FormLabel>Date De Naisance</FormLabel>
                          <Input 
                            type="date" 
                            size="md" 
                            {...formik.getFieldProps('dateBirth')}
                            error={
                              formik.touched.dateBirth && Boolean(formik.errors.dateBirth)
                            } 
                          />
                          {(formik.touched.dateBirth && formik.errors.dateBirth) && <Typography color="danger" level="body-sm" >{formik.errors.dateBirth}</Typography>}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl required>
                          <FormLabel>Email</FormLabel>
                          <Input 
                            type="email" 
                            size="md" 
                            {...formik.getFieldProps('email')}
                            error={
                              formik.touched.email && Boolean(formik.errors.email)
                            } 
                          />
                          {(formik.touched.email && formik.errors.email) && <Typography color="danger" level="body-sm" >{formik.errors.email}</Typography>}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl required>
                          <FormLabel>Mot De Passe</FormLabel>
                          <Input
                            type="password"
                            placeholder="Type in here…"
                            startDecorator={<Key />}
                            size="md"
                            {...formik.getFieldProps('password')}
                            error={
                              formik.touched.password && Boolean(formik.errors.password)
                            }                        
                          />
                          {(formik.touched.password && formik.errors.password) && <Typography color="danger" level="body-sm" >{formik.errors.password}</Typography>}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button
                          type="submit"
                          fullWidth
                          sx={{ mt: 3, mb: 2 }}
                        >
                          S'inscrire
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Container>
              )}
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${loginF})`,
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
            `url(${loginF2})`,
          },
        })}
      />
    </CssVarsProvider>
  )
}
