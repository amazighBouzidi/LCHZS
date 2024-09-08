// Import React and other necessary components
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyIcon from '@mui/icons-material/Key';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { getProfileUser, updateProfileUser } from '../helper/helperUser';
import images from '../data/images';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import validationSchemaProfile from '../utils/validationSchemaProfile';
import convertAndCompress from '../helper/convertAndCompress';
import toast, { Toaster } from 'react-hot-toast';



// Define the MyProfile component
export default function MyProfile({ userProfile }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [image, setImage] = React.useState("")
    const initialValues = {
        lastName: "",
        firstName: '',
        address: '',
        phoneNumber: '',
        dateBirth: "",
        email: '',
        password: '',
        profile: '',
    }
    const { avatars } = images

    const onUpload = async e => {
        const base64 = await convertAndCompress(e.target.files[0]);
        formikUpdateProfile.setFieldValue("profile", base64)
        setImage(base64)
    }
    

    const handleSubmit = (values) => {
       console.log('IMG:', image)
       updateProfileUser(values)
       .then((msg) => {
            console.log("MSG SUCCESS: ", msg)
            toast.success(msg)
       })
       .catch((error) => console.error("MSG ERROR: ", error))
    };

    const formikUpdateProfile = useFormik({
        initialValues,
        onSubmit:handleSubmit,
        validationSchema: validationSchemaProfile 
    })

    React.useEffect(() =>{
        getProfileUser()
        .then(user => {
            setImage(user.profile)
            formikUpdateProfile.setValues({
                lastName: user.lastName,
                firstName: user.firstName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                dateBirth: user.dateBirth.split("T")[0],
                email: user.email,
                password: user.password,
                profile: user.profile,
            })
        })

    }, [])

    return (
        <form onSubmit={formikUpdateProfile.handleSubmit}>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Card>
                <Box>
                    <Typography level="title-md">Information Personnel</Typography>
                    <Typography level="body-sm">
                        Vous pouvez modifier les informations de votre profil ci-dessous.
                    </Typography>
                </Box>
                <Divider />
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                    <Stack direction="column" spacing={1}>
                        <AspectRatio
                            ratio="1"
                            maxHeight={200}
                            sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                        >
                            <img
                                src={image || avatars}
                                loading="lazy"
                                alt=""
                            />
                        </AspectRatio>
                        <IconButton
                            aria-label="upload new picture"
                            size="sm"
                            variant="outlined"
                            color="neutral"
                            sx={{
                                bgcolor: 'background.body',
                                position: 'absolute',
                                zIndex: 2,
                                borderRadius: '50%',
                                left: 100,
                                top: 170,
                                boxShadow: 'sm',
                            }}
                            >
                            <input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={onUpload}
                            />
                            <label htmlFor="icon-button-file">
                                <EditRoundedIcon style={{cursor: 'pointer'}} />
                            </label>
                        </IconButton>
                    </Stack>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        <Stack spacing={1}>
                            <FormLabel>Nom Complet</FormLabel>
                            <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                                <Input
                                    size="sm"
                                    type="text"
                                    {...formikUpdateProfile.getFieldProps('firstName')}
                                    disabled
                                    placeholder="First name"
                                    sx={{ flexGrow: 1 }} 
                                />
                            </FormControl>
                            <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                                <Input 
                                    size="sm" 
                                    type="text"
                                    {...formikUpdateProfile.getFieldProps('lastName')}
                                    disabled
                                    placeholder="Last name"    
                                    sx={{ flexGrow: 1 }} 
                                />
                            </FormControl>
                        </Stack>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Date De Naissance</FormLabel>
                            <Input 
                                size='sm'
                                type='date'
                                {...formikUpdateProfile.getFieldProps('dateBirth')}
                                error={
                                    formikUpdateProfile.touched.dateBirth && Boolean(formikUpdateProfile.errors.dateBirth)
                                }
                            />
                            {formikUpdateProfile.touched.dateBirth && formikUpdateProfile.errors.dateBirth && typeof formikUpdateProfile.errors.dateBirth === 'string' && (
                                <Typography color="danger" level="body-sm">
                                    {formikUpdateProfile.errors.dateBirth}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Adresse</FormLabel>
                            <Input 
                                size='sm'
                                type='text'
                                placeholder='Addresse'
                                {...formikUpdateProfile.getFieldProps('address')}
                                error={
                                    formikUpdateProfile.touched.address && Boolean(formikUpdateProfile.errors.address)
                                }
                            />
                            {formikUpdateProfile.touched.address && formikUpdateProfile.errors.address && typeof formikUpdateProfile.errors.address === 'string' && (
                                <Typography color="danger" level="body-sm">
                                    {formikUpdateProfile.errors.address}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Téléphone</FormLabel>
                            <Input 
                                size='sm'
                                type='text'
                                placeholder='Numéro Téléphone'
                                {...formikUpdateProfile.getFieldProps('phoneNumber')}
                                error={
                                    formikUpdateProfile.touched.phoneNumber && Boolean(formikUpdateProfile.errors.phoneNumber)
                                }
                            />
                            {formikUpdateProfile.touched.phoneNumber && formikUpdateProfile.errors.phoneNumber && typeof formikUpdateProfile.errors.phoneNumber === 'string' && (
                                <Typography color="danger" level="body-sm">
                                    {formikUpdateProfile.errors.phoneNumber}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                size="sm"
                                type="email"
                                startDecorator={<EmailRoundedIcon />}
                                placeholder="email"
                                sx={{ flexGrow: 1 }}
                                {...formikUpdateProfile.getFieldProps('email')}
                                error={
                                    formikUpdateProfile.touched.email && Boolean(formikUpdateProfile.errors.email)
                                }
                            />
                            {formikUpdateProfile.touched.email && formikUpdateProfile.errors.email && typeof formikUpdateProfile.errors.email === 'string' && (
                                <Typography color="danger" level="body-sm">
                                    {formikUpdateProfile.errors.email}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Mot  de passe</FormLabel>
                            <Input
                                size="sm"
                                type="password"
                                startDecorator={<KeyIcon />}
                                placeholder="password"
                                sx={{ flexGrow: 1 }}
                                {...formikUpdateProfile.getFieldProps('password')}
                                error={
                                    formikUpdateProfile.touched.password && Boolean(formikUpdateProfile.errors.password)
                                }
                            />
                            {formikUpdateProfile.touched.password && formikUpdateProfile.errors.password && typeof formikUpdateProfile.errors.password === 'string' && (
                                <Typography color="danger" level="body-sm">
                                    {formikUpdateProfile.errors.password}
                                </Typography>
                            )}
                        </FormControl>
                    </Stack>
                </Stack>
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
                >
                    <Stack direction="row" spacing={2}>
                        <Stack direction="column" spacing={1}>
                            <AspectRatio
                                ratio="1"
                                maxHeight={108}
                                sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
                            >
                                <img 
                                    src={image || avatars}
                                    loading='lazy'
                                    alt="profile IMG" 
                                />
                            </AspectRatio>
                            <IconButton
                                aria-label="upload new picture"
                                size="sm"
                                variant="outlined"
                                color="neutral"
                                sx={{
                                    bgcolor: 'background.body',
                                    position: 'absolute',
                                    zIndex: 2,
                                    borderRadius: '50%',
                                    left: 85,
                                    top: 180,
                                    boxShadow: 'sm',
                                }}
                            >
                                <input
                                    accept="image/*"
                                    id="icon-button-file"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={onUpload}
                                />
                                <label htmlFor="icon-button-file">
                                    <EditRoundedIcon style={{cursor: 'pointer'}} />
                                </label>
                            </IconButton>
                        </Stack>
                        <Stack spacing={1} sx={{ flexGrow: 1 }}>
                            <FormLabel>Nom Complet</FormLabel>
                            <FormControl
                                sx={{
                                    display: {
                                        sm: 'flex-column',
                                        md: 'flex-row',
                                    },
                                    gap: 2,
                                }}
                            >
                                <Input 
                                    size="sm" 
                                    placeholder="First name" 
                                    {...formikUpdateProfile.getFieldProps('firstName')}
                                    disabled
                                />
                            </FormControl>
                            <FormControl
                                sx={{
                                    display: {
                                        sm: 'flex-column',
                                        md: 'flex-row',
                                    },
                                    gap: 2,
                                }}
                            >
                                <Input 
                                    size="sm" 
                                    placeholder="Last name"
                                    {...formikUpdateProfile.getFieldProps('lastName')}
                                    disabled 
                                />
                            </FormControl>
                        </Stack>
                    </Stack>
                    <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel>Date De Naissance</FormLabel>
                        <Input 
                            size='sm'
                            type='date'
                            {...formikUpdateProfile.getFieldProps('dateBirth')}
                            error={
                                formikUpdateProfile.touched.dateBirth && Boolean(formikUpdateProfile.errors.dateBirth)
                            }
                        />
                        {formikUpdateProfile.touched.dateBirth && formikUpdateProfile.errors.dateBirth && typeof formikUpdateProfile.errors.dateBirth === 'string' && (
                            <Typography color="danger" level="body-sm">
                                {formikUpdateProfile.errors.dateBirth}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel>Adresse</FormLabel>
                        <Input 
                            size='sm'
                            type='text'
                            placeholder="Addresse"
                            {...formikUpdateProfile.getFieldProps('address')}
                            error={
                                formikUpdateProfile.touched.address && Boolean(formikUpdateProfile.errors.address)
                            }
                        />
                        {formikUpdateProfile.touched.address && formikUpdateProfile.errors.address && typeof formikUpdateProfile.errors.address === 'string' && (
                            <Typography color="danger" level="body-sm">
                                {formikUpdateProfile.errors.address}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Téléphone</FormLabel>
                            <Input 
                                size='sm'
                                type='text'
                                placeholder="Numéro Téléphone"
                                {...formikUpdateProfile.getFieldProps('phoneNumber')}
                                error={
                                    formikUpdateProfile.touched.phoneNumber && Boolean(formikUpdateProfile.errors.phoneNumber)
                                }
                            />
                            {formikUpdateProfile.touched.phoneNumber && formikUpdateProfile.errors.phoneNumber && typeof formikUpdateProfile.errors.phoneNumber === 'string' && (
                                <Typography color="danger" level="body-sm">
                                    {formikUpdateProfile.errors.phoneNumber}
                                </Typography>
                            )}
                        </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            size="sm"
                            type="email"
                            startDecorator={<EmailRoundedIcon />}
                            placeholder="email"
                            sx={{ flexGrow: 1 }}
                            {...formikUpdateProfile.getFieldProps('email')}
                            error={
                                formikUpdateProfile.touched.email && Boolean(formikUpdateProfile.errors.email)
                            }
                        />
                        {formikUpdateProfile.touched.email && formikUpdateProfile.errors.email && typeof formikUpdateProfile.errors.email === 'string' && (
                            <Typography color="danger" level="body-sm">
                                {formikUpdateProfile.errors.email}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel>Mot  de passe</FormLabel>
                        <Input
                            size="sm"
                            type="password"
                            startDecorator={<KeyIcon />}
                            placeholder="password"
                            sx={{ flexGrow: 1 }}
                            {...formikUpdateProfile.getFieldProps('password')}
                            error={
                                formikUpdateProfile.touched.password && Boolean(formikUpdateProfile.errors.password)
                            }
                        />
                        {formikUpdateProfile.touched.password && formikUpdateProfile.errors.password && typeof formikUpdateProfile.errors.password === 'string' && (
                            <Typography color="danger" level="body-sm">
                                {formikUpdateProfile.errors.password}
                            </Typography>
                        )}
                    </FormControl>
                </Stack>
                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button size="sm" variant="solid" type='submit'>
                            Sauvgardez
                        </Button>
                    </CardActions>
                </CardOverflow>
            </Card>
        </form>    
    );
}
