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
import Textarea from '@mui/joy/Textarea';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import images from '../../data/images';
import convertAndCompress from '../../helper/convertAndCompress';
import { useFormik } from "formik";
import validationSchemaAnalyse from '../../utils/validationSchemaAnalyse';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import { registerAnalyse } from '../../helper/helperAnalyse';
import { useNavigate } from 'react-router-dom'



// Define the AddAnalyse component
export default function AddAnalyse(props) {
    const navigate = useNavigate()
    const initialValues = {
        nom: '',
        code: '',
        prix: '',
        description: '',
        image: ''
    }
    const [image, setImage] = React.useState("");
    const { placeHolder } = images

    const handleSubmit = async (values) => {
        console.log(values)
        registerAnalyse(values)
        .then(({msg, addedAnalyse})=>{
            console.log(msg)
            // Update store with new analysis
            props.handleClose()
            navigate('/listeAnalyses', {state: { activePage: '/listeAnalyses', activeDashboard: props.test }})

        })
        .catch((err)=>console.error(`Error Adding the Analyse : ${err}`))
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchemaAnalyse,
    });
    

    const onUpload = async e => {
        const base64 = await convertAndCompress(e.target.files[0]);
        setImage(base64);
        formik.setFieldValue('image', base64);
    }

    return (
        <Modal open={props.show} onClose={props.handleClose} variant='soft'>
            <ModalDialog>
                <ModalClose />
                <form onSubmit={formik.handleSubmit}>
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
                                    sx={{ flex: 1, minWidth: 120, borderRadius: '100%'}}
                                >
                                    <img
                                        src={image === '' ? placeHolder : image}
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
                                <Typography color="danger" level="body-sm">{formik.errors.image}</Typography>
                            </Stack>
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Nom et Code</FormLabel>
                                    <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                                        <Input
                                            size="sm"
                                            type="text"
                                            placeholder="Nom"
                                            sx={{ flexGrow: 1 }} 
                                            {...formik.getFieldProps('nom')}
                                            error={
                                            formik.touched.nom && Boolean(formik.errors.nom)
                                            }
                                        />
                                        {(formik.touched.nom && formik.errors.nom) && <Typography color="danger" level="body-sm" >{formik.errors.nom}</Typography>}
                                    </FormControl>
                                    <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                                        <Input 
                                            size="sm" 
                                            type="text"
                                            placeholder="Code"    
                                            sx={{ flexGrow: 1 }} 
                                            {...formik.getFieldProps('code')}
                                            error={
                                            formik.touched.code && Boolean(formik.errors.code)
                                            }
                                        />
                                        {(formik.touched.code && formik.errors.code) && <Typography color="danger" level="body-sm" >{formik.errors.code}</Typography>}
                                    </FormControl>
                                </Stack>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Prix</FormLabel>
                                    <Input 
                                        size='sm'
                                        type='text'
                                        placeholder="prix"
                                        {...formik.getFieldProps('prix')}
                                        error={
                                        formik.touched.prix && Boolean(formik.errors.prix)
                                        }
                                    />
                                    {(formik.touched.prix && formik.errors.prix) && <Typography color="danger" level="body-sm" >{formik.errors.prix}</Typography>}
                                </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        minRows={3}
                                        size="lg"
                                        variant="outlined"
                                        placeholder="Description"
                                        {...formik.getFieldProps('description')}
                                        error={
                                        formik.touched.description && Boolean(formik.errors.description)
                                        }
                                    />
                                    {(formik.touched.description && formik.errors.description) && <Typography color="danger" level="body-sm" >{formik.errors.description}</Typography>}
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
                                            src={image === '' ? placeHolder : image}
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
                                    <Typography color="danger" level="body-sm">{formik.errors.image}</Typography>
                                </Stack>
                                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                    <FormLabel>Nom et Code</FormLabel>
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
                                            {...formik.getFieldProps('nom')}
                                            error={
                                            formik.touched.nom && Boolean(formik.errors.nom)
                                            } 
                                        />
                                        {(formik.touched.nom && formik.errors.nom) && <Typography color="danger" level="body-sm" >{formik.errors.nom}</Typography>}
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
                                            placeholder="code"
                                            {...formik.getFieldProps('code')}
                                            error={
                                            formik.touched.code && Boolean(formik.errors.code)
                                            }
                                        />
                                        {(formik.touched.code && formik.errors.code) && <Typography color="danger" level="body-sm" >{formik.errors.code}</Typography>}
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Prix</FormLabel>
                                <Input 
                                    size='sm'
                                    type='text'
                                    placeholder="prix"
                                    {...formik.getFieldProps('prix')}
                                    error={
                                    formik.touched.prix && Boolean(formik.errors.prix)
                                    }
                                />
                                {(formik.touched.prix && formik.errors.prix) && <Typography color="danger" level="body-sm" >{formik.errors.prix}</Typography>}
                            </FormControl>
                            <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        minRows={3}
                                        size="lg"
                                        variant="outlined"
                                        placeholder="Description"
                                        {...formik.getFieldProps('description')}
                                        error={
                                        formik.touched.description && Boolean(formik.errors.description)
                                        }
                                    />
                                    {(formik.touched.description && formik.errors.description) && <Typography color="danger" level="body-sm" >{formik.errors.description}</Typography>}
                                </FormControl>
                        </Stack>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button onClick={props.handleClose} color="primary">
                                    Close
                                </Button>
                                <Button size="sm" type='submit' variant="solid">
                                    Ajouter
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>
                </form>
            </ModalDialog>
        </Modal>
    );
}
