import React, { useState, useEffect, useMemo } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/joy/TextField';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Checkbox from '@mui/joy/Checkbox';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import { Typography } from '@mui/joy';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { getAllDoctors } from '../../helper/helperDoctor';
import useStore from '../../data/patientStore'; // Adjust the path as necessary
import validationSchemaDoctor from '../../utils/validationSchemaDoctor'; // Assuming this is a Yup schema

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default function DoctorSelection() {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [options, setOptions] = useState([]);
  const [disabledSelectDoctor, setDisabledSelectDoctor] = useState(false);
  const [addNewDoctor, setAddNewDoctor] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    officeAddress: '',
    phoneNumber: '',
    speciality: '',
  });
  const [errors, setErrors] = useState({});

  const loading = open && options.length === 0;
  const setSelectedDoctorStore = useStore(state => state.setSelectedDoctor);

  const sortedOptions = useMemo(() => {
    return doctors
      .filter(option => option.firstName && option.lastName)
      .map(option => {
        const fullname = `${option.firstName} ${option.lastName}`;
        const firstLetter = fullname[0].toUpperCase();
        return {
          ...option,
          fullname,
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        };
      })
      .sort((a, b) => a.firstLetter.localeCompare(b.firstLetter));
  }, [doctors]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1000);

      if (active) {
        setOptions([...sortedOptions]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, sortedOptions]);

  useEffect(() => {
    if (open) {
      getAllDoctors()
        .then(doctors => {
          setDoctors(doctors);
        })
        .catch(error => console.log(error));
    }
  }, [open]);

  const handleCheckboxChange = (event) => {
    setAddNewDoctor(event.target.checked);
    setSelectedDoctorStore(null)
    setDisabledSelectDoctor(!disabledSelectDoctor);
    setNewDoctor({
          firstName: '',
          lastName: '',
          email: '',
          officeAddress: '',
          phoneNumber: '',
          speciality: '',
    });
    setErrors({});
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const validateInputs = async (name, value) => {
    try {
      await validationSchemaDoctor.validateAt(name, { [name]: value });
      setErrors({
        ...errors,
        [name]: '',
      });
    } catch (error) {
      setErrors({
        ...errors,
        [name]: error.message,
      });
    }
  };

  const handleAddNewDoctor = async () => {
    if (addNewDoctor) {
        setSelectedDoctor(newDoctor);
        setSelectedDoctorStore(newDoctor);
    }
  };

  useEffect(() => {
    handleAddNewDoctor();
  }, [newDoctor]);

  return (
    <FormControl id="doctor-selection">
      <FormLabel>Selectionner un docteur</FormLabel>
      <Autocomplete
        disabled={disabledSelectDoctor}
        sx={{ width: 300 }}
        placeholder="Search"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.fullname === value.fullname}
        getOptionLabel={(option) => option.fullname || ''}
        options={sortedOptions}
        groupBy={(option) => option.firstLetter}
        loading={loading}
        filterOptions={(options, state) => options.filter(option =>
          option.fullname.toLowerCase().includes(state.inputValue.toLowerCase()) ||
          option.phoneNumber.includes(state.inputValue) ||
          option.officeAddress.toLowerCase().includes(state.inputValue.toLowerCase()) ||
          option.email.toLowerCase().includes(state.inputValue.toLowerCase()) ||
          option.speciality.toLowerCase().includes(state.inputValue.toLowerCase())
        )}
        onChange={(event, newValue) => {
          setSelectedDoctor(newValue);
          setSelectedDoctorStore(newValue);
        }}
        renderOption={(props, option) => {
          const { ownerState, ...rest } = props;
          const updatedProps = { ...rest, ownerstate: ownerState };
          return (
            <li {...updatedProps}>
              <ListItemDecorator sx={{ marginLeft: "15px" }}>
                {option.fullname}
              </ListItemDecorator>
            </li>
          );
        }}
        renderTags={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <FormControl sx={{ display: "flex", flexDirection: "row", marginTop: "7px" }}>
        <div>
          <Checkbox checked={addNewDoctor} onChange={handleCheckboxChange} />
        </div>
        <div style={{ marginLeft: "5px" }}>
          <FormLabel>ajouter un nouveau docteur</FormLabel>
        </div>
      </FormControl>

      {addNewDoctor && (
        <Stack direction="column" spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Last Name</FormLabel>
              <Input
                size="sm"
                placeholder="Last Name"
                name="lastName"
                value={newDoctor.lastName}
                onChange={(e) =>{
                    handleInputChange(e)
                    validateInputs('lastName', e.target.value)
                }}
              />
              {errors.lastName && <Typography sx={{ color: "red !important" }} level="body-sm" >{errors.lastName}</Typography>}
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>First Name</FormLabel>
              <Input
                size="sm"
                placeholder="First Name"
                name="firstName"
                value={newDoctor.firstName}
                onChange={(e) =>{
                    handleInputChange(e)
                    validateInputs('firstName', e.target.value)
                }}
              />
              {errors.firstName && <Typography sx={{ color: "red !important" }} level="body-sm" >{errors.firstName}</Typography>}
            </FormControl>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                placeholder="Email"
                name="email"
                value={newDoctor.email}
                startDecorator={<EmailRoundedIcon />}
                onChange={(e) =>{
                    handleInputChange(e)
                    validateInputs('email', e.target.value)
                }}
              />
              {errors.email && <Typography sx={{ color: "red !important" }} level="body-sm" >{errors.email}</Typography>}
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Office Address</FormLabel>
              <Input
                size="sm"
                type="text"
                placeholder="Office Address"
                name="officeAddress"
                value={newDoctor.officeAddress}
                onChange={(e) =>{
                    handleInputChange(e)
                    validateInputs('officeAddress', e.target.value)
                }}
              />
              {errors.officeAddress&& <Typography sx={{ color: "red !important" }} level="body-sm" >{errors.officeAddress}</Typography>}
            </FormControl>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                size="sm"
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={newDoctor.phoneNumber}
                onChange={(e) =>{
                    handleInputChange(e)
                    validateInputs('phoneNumber', e.target.value)
                }}
              />
              {errors.phoneNumber&& <Typography sx={{ color: "red !important" }} level="body-sm" >{errors.phoneNumber}</Typography>}
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Speciality</FormLabel>
              <Input
                size="sm"
                placeholder="Speciality"
                name="speciality"
                value={newDoctor.speciality}
                onChange={(e) =>{
                    handleInputChange(e)
                    validateInputs('speciality', e.target.value)
                }}
              />
              {errors.speciality && <Typography sx={{ color: "red !important" }} level="body-sm" >{errors.speciality}</Typography>}
            </FormControl>
          </Stack>
        </Stack>
      )}
    </FormControl>
  );
}
