// Import React and other necessary components
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
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
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import images from '../../data/images';
import convertAndCompress from '../../helper/convertAndCompress';
import validationSchemaEmployer from '../../utils/validationSchemaEmployer';
import { useFormik } from 'formik';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Checkbox, FormControlLabel } from '@mui/material';
import { registerEmployer } from '../../helper/helperUser';

const initialValues = {
    lastName: '',
    firstName: '',
    address: '',
    phoneNumber: '',
    dateBirth: '',
    email: '',
    userType: '',
    image: ''
}

// Define the MyProfile component
export default function AddEmployer(props) {   
    const { Avatars } = images
    const [image, setImage] = React.useState("");
    const [userType, setUserType] = React.useState()
    const [userTypeError, setUserTypeError] = React.useState('')

    const handleRegistration = async (values) => {
        registerEmployer(values)
        .then(({ msg, addEmployer }) =>{
            let employee = {
                _id: addEmployer._id,
                lastName: addEmployer.lastName,
                firstName: addEmployer.firstName,
                address: addEmployer.address,
                phoneNumber: addEmployer.phoneNumber,
                dateBirth: addEmployer.dateBirth,
                email: addEmployer.email,
                userType: addEmployer.userType,
                profile: addEmployer.profile
            }
            props.onAddEmployer(employee, msg);
            props.handleClose()
 
        }).catch( (err) =>{
            props.onErrorAddEmployer()
            props.handleClose()
            console.error(`Error Adding the Employer : ${err}`)     
        })
    }

    const onUpload = async e => {
        const base64 = await convertAndCompress(e.target.files[0]);
        formikInscription.setFieldValue('image', base64);
        setImage(base64)
    }

    const handleChange = (newValue) => {
        formikInscription.setFieldValue('userType',newValue);
        setUserType(newValue)
        setUserTypeError('')
    };

    const formikInscription = useFormik({
        initialValues,
        onSubmit: handleRegistration,
        validationSchema: validationSchemaEmployer 
    })

    return (
        <Modal open={props.show} onClose={props.handleClose} variant="soft">
            <ModalDialog>
                <ModalClose />
                <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
                    <form onSubmit={formikInscription.handleSubmit}>
                        <Card style={{width: "600px", borderColor: 'white'}}>
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
                                            src={image === '' ? Avatars : image}
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
                                            top: 100,
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
                                    {(formikInscription.touched.image && formikInscription.errors.image) && <Typography color="danger" level="body-sm" >{formikInscription.errors.image}</Typography>}
                                </Stack>
                                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                    <Stack spacing={1}>
                                        <FormLabel>Nom Complet</FormLabel>
                                        <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                                            <Input
                                                size="sm"
                                                type="text"
                                                placeholder="Prénom"
                                                {...formikInscription.getFieldProps('firstName')}
                                                error={
                                                    formikInscription.touched.firstName && Boolean(formikInscription.errors.firstName)
                                                }
                                                sx={{ flexGrow: 1 }} 
                                            />
                                            {(formikInscription.touched.firstName && formikInscription.errors.firstName) && <Typography color="danger" level="body-sm" >{formikInscription.errors.firstName}</Typography>}
                                        </FormControl>
                                        <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                                            <Input 
                                                size="sm" 
                                                type="text"
                                                {...formikInscription.getFieldProps('lastName')}
                                                error={
                                                    formikInscription.touched.lastName && Boolean(formikInscription.errors.lastName)
                                                }
                                                placeholder="Nom"    
                                                sx={{ flexGrow: 1 }} 
                                            />
                                            {(formikInscription.touched.lastName && formikInscription.errors.lastName) && <Typography color="danger" level="body-sm" >{formikInscription.errors.lastName}</Typography>}
                                        </FormControl>
                                    </Stack>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Date De Naissance</FormLabel>
                                        <Input 
                                            size='sm'
                                            type='date'
                                            {...formikInscription.getFieldProps('dateBirth')}
                                            error={
                                                formikInscription.touched.dateBirth && Boolean(formikInscription.errors.dateBirth)
                                            }
                                        />
                                        {(formikInscription.touched.dateBirth && formikInscription.errors.dateBirth) && <Typography color="danger" level="body-sm" >{formikInscription.errors.dateBirth}</Typography>}
                                    </FormControl>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Adresse</FormLabel>
                                        <Input 
                                            size='sm'
                                            type='text'
                                            {...formikInscription.getFieldProps('address')}
                                            error={
                                                formikInscription.touched.address && Boolean(formikInscription.errors.address)
                                            }
                                            placeholder="Addresse"
                                        />
                                        {(formikInscription.touched.address && formikInscription.errors.address) && <Typography color="danger" level="body-sm" >{formikInscription.errors.address}</Typography>}
                                    </FormControl>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Téléphone</FormLabel>
                                        <Input 
                                            size='sm'
                                            type='text'
                                            {...formikInscription.getFieldProps('phoneNumber')}
                                            error={
                                                formikInscription.touched.phoneNumber && Boolean(formikInscription.errors.phoneNumber)
                                            }
                                            placeholder="Numéro Téléphone"
                                        />
                                    {(formikInscription.touched.phoneNumber && formikInscription.errors.phoneNumber) && <Typography color="danger" level="body-sm" >{formikInscription.errors.phoneNumber}</Typography>}
                                    </FormControl>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            size="sm"
                                            type="email"
                                            {...formikInscription.getFieldProps('email')}
                                            error={
                                                formikInscription.touched.email && Boolean(formikInscription.errors.email)
                                            }
                                            startDecorator={<EmailRoundedIcon />}
                                            placeholder="email"
                                            sx={{ flexGrow: 1 }}
                                        />
                                        {(formikInscription.touched.email && formikInscription.errors.email) && <Typography color="danger" level="body-sm" >{formikInscription.errors.email}</Typography>}
                                    </FormControl>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Type Employer</FormLabel>
                                        <div style={{display: 'flex', flexDirection: "row"}}>
                                            <FormControlLabel
                                                control={<Checkbox checked={formikInscription.values.userType === 'agentAccueil'} onChange={() => handleChange('agentAccueil')} />}
                                                label="Agent Accueil"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={formikInscription.values.userType === 'biologisteClinique'} onChange={() => handleChange('biologisteClinique')} />}
                                                label="Biologiste Clinique"
                                            />
                                        </div>
                                        <FormControlLabel
                                            control={<Checkbox checked={formikInscription.values.userType === 'technicienLaboratoire'} onChange={() => handleChange('technicienLaboratoire')} />}
                                            label="Technicien Laboratoire"
                                        />
                                        {formikInscription.errors.userType && ( <Typography color="danger" level="body-sm" >{formikInscription.errors.userType}</Typography> )}
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
                                                src={image === '' ? Avatars : image}
                                                loading='lazy'
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
                                                left: 85,
                                                top: 100,
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
                                        {(formikInscription.touched.image && formikInscription.errors.image) && <Typography color="danger" level="body-sm" >{formikInscription.errors.image}</Typography>}
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
                                                placeholder="Prénom" 
                                                {...formikInscription.getFieldProps('firstName')}
                                                error={
                                                    formikInscription.touched.firstName && Boolean(formikInscription.errors.firstName)
                                                }
                                            />
                                            {(formikInscription.touched.firstName && formikInscription.errors.firstName) && <Typography color="danger" level="body-sm" >{formikInscription.errors.firstName}</Typography>}
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
                                                placeholder="Nom"
                                                {...formikInscription.getFieldProps('lastName')}
                                                error={
                                                    formikInscription.touched.lastName && Boolean(formikInscription.errors.lastName)
                                                }
                                            />
                                            {(formikInscription.touched.lastName && formikInscription.errors.lastName) && <Typography color="danger" level="body-sm" >{formikInscription.errors.lastName}</Typography>}
                                        </FormControl>
                                    </Stack>
                                </Stack>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Date De Naissance</FormLabel>
                                    <Input 
                                        size='sm'
                                        type='date'
                                        {...formikInscription.getFieldProps('dateBirth')}
                                        error={
                                            formikInscription.touched.dateBirth && Boolean(formikInscription.errors.dateBirth)
                                        }
                                    />
                                    {(formikInscription.touched.dateBirth && formikInscription.errors.dateBirth) && <Typography color="danger" level="body-sm" >{formikInscription.errors.dateBirth}</Typography>}
                                </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Adresse</FormLabel>
                                    <Input 
                                        size='sm'
                                        type='text'
                                        {...formikInscription.getFieldProps('address')}
                                        error={
                                            formikInscription.touched.address && Boolean(formikInscription.errors.address)
                                        }
                                        placeholder="Addresse"
                                    />
                                    {(formikInscription.touched.address && formikInscription.errors.address) && <Typography color="danger" level="body-sm" >{formikInscription.errors.address}</Typography>}
                                </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Téléphone</FormLabel>
                                        <Input 
                                            size='sm'
                                            type='text'
                                            {...formikInscription.getFieldProps('phoneNumber')}
                                            error={
                                                formikInscription.touched.phoneNumber && Boolean(formikInscription.errors.phoneNumber)
                                            }
                                            placeholder="Numéro Téléphone"
                                        />
                                        {(formikInscription.touched.phoneNumber && formikInscription.errors.phoneNumber) && <Typography color="danger" level="body-sm" >{formikInscription.errors.phoneNumber}</Typography>}
                                    </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        size="sm"
                                        type="email"
                                        {...formikInscription.getFieldProps('email')}
                                        error={
                                            formikInscription.touched.email && Boolean(formikInscription.errors.email)
                                        }
                                        startDecorator={<EmailRoundedIcon />}
                                        placeholder="email"
                                        sx={{ flexGrow: 1 }}
                                    />
                                    {(formikInscription.touched.email && formikInscription.errors.email) && <Typography color="danger" level="body-sm" >{formikInscription.errors.email}</Typography>}
                                </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Type Employer</FormLabel>
                                    <div style={{display: 'flex', flexDirection: "row"}}>
                                        <FormControlLabel
                                            control={<Checkbox checked={formikInscription.values.userType === 'agentAccueil'} onChange={() => handleChange('agentAccueil')} />}
                                            label="Agent Accueil"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={formikInscription.values.userType === 'biologisteClinique'} onChange={() => handleChange('biologisteClinique')} />}
                                            label="Biologiste Clinique"
                                        />
                                    </div>
                                    <FormControlLabel
                                        control={<Checkbox checked={formikInscription.values.userType === 'technicienLaboratoire'} onChange={() => handleChange('technicienLaboratoire')} />}
                                        label="Technicien Laboratoire"
                                    />
                                    {formikInscription.errors.userType && ( <Typography color="danger" level="body-sm" >{formikInscription.errors.userType}</Typography> )}
                                </FormControl>
                            </Stack>
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button onClick={props.handleClose} color="primary">
                                        Annuler
                                    </Button>
                                    <Button size="sm" type='submit' variant="solid">
                                        Enregistrer
                                    </Button>
                                </CardActions>
                            </CardOverflow>
                        </Card>
                    </form>    
                </div>
            </ModalDialog>
        </Modal>
    );
}
