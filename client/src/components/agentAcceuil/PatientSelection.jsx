import React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/joy/TextField';
import Avatar from '@mui/joy/Avatar';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { getAllPatients } from '../../helper/helperUser';
import useStore from '../../data/patientStore';  // Adjust the path as necessary

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default function PatientSelection() {
  const [patients, setPatients] = React.useState([]);
  const setSelectedPatient = useStore(state => state.setSelectedPatient);

  const sortedOptions = React.useMemo(() => {
    return patients
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
  }, [patients]);

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (open) {
      getAllPatients()
        .then(users => {
          setPatients(users);
        })
        .catch(error => console.log(error));
    }
  }, [open]);

  return (
    <FormControl id="asynchronous-demo">
      <FormLabel>Selectionnner un patient</FormLabel>
      <Autocomplete
        sx={{ width: 310 }}
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
          option.address.toLowerCase().includes(state.inputValue.toLowerCase()) ||
          option.email.toLowerCase().includes(state.inputValue.toLowerCase())
        )}
        onChange={(event, newValue) => {
          setSelectedPatient(newValue);
        }}
        renderOption={(props, option) => {
            const { ownerState, ...rest } = props; // Destructure ownerState from props
            const updatedProps = { ...rest, ownerstate: ownerState }; // Create new object with updated property
            return (
              <li {...updatedProps}>
                <ListItemDecorator>
                  <Avatar size="sm" src={option.profile} sx={{ marginLeft: "8px" }} />
                  <p sx={{ marginLeft: "80px" }}>{option.fullname}</p>
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
    </FormControl>
  );
}
