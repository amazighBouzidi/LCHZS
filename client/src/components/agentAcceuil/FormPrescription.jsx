import React, { useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/joy/TextField';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/joy/Typography';
import DoctorSelection from './DoctorSelection';
import { getAllAnalyses } from '../../helper/helperAnalyse';
import toast, { Toaster } from 'react-hot-toast';
import useStore from "../../data/patientStore";
import { registerPrescription } from '../../helper/helperPrescription';

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default function FormPrescription() {
  const [analysis, setAnalysis] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const selectedPatientStore = useStore((state) => state.selectedPatient);
  const selectedDoctorStore = useStore((state) => state.selectedDoctor);
  const setSelectedPatientStore = useStore(state => state.setSelectedPatient)
  const setSelectedDoctorStore = useStore(state => state.setSelectedDoctor);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1000);

      if (active) {
        setOptions([...analyses]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, analyses]);

  useEffect(() => {
    if (open) {
      getAllAnalyses()
        .then((analyses) => {
          const formattedAnalyses = analyses.map(analysis => ({
            _id: analysis._id,
            nom: analysis.nom
          }));
          setAnalyses(formattedAnalyses);
          setOptions(formattedAnalyses);
        })
        .catch((error) => console.log(error));
    }
  }, [open]);

  const handleAddAnalysis = () => {
    if (selectedAnalysis) {
      let findAnalyis = false
      analysis.map(((analysis) => {
        if(analysis.nom == selectedAnalysis.nom){
          findAnalyis = true
        }
      }))
      if (findAnalyis) {
        toast.error('Analyse est déjà ajouter');
      } else {
        setAnalysis((prevAnalysis) => [...prevAnalysis, selectedAnalysis]);
        setSelectedAnalysis(null);
      }
    }
  };

  const handleAddPrescription = async () => {
    if (!selectedDoctorStore) {
      return toast.error('Veuillez choisir un médecin');
    }else{
      if(!selectedDoctorStore.lastName || !selectedDoctorStore.firstName || 
        !selectedDoctorStore.phoneNumber || !selectedDoctorStore.email || 
        !selectedDoctorStore.officeAddress || !selectedDoctorStore.speciality){
        return toast.error('Veuillez renseigner les informations du nouveau médecin');
      }
    }

    if (!selectedPatientStore) {
      return toast.error('Veuillez choisir un patient');
    }

    if (analysis.length === 0) {
      return toast.error('Veuillez ajouter des analyses a traiter');
    }
    const selectedPatientID = { _id : selectedPatientStore._id}
    const doctor = selectedDoctorStore._id ?  { _id : selectedDoctorStore._id} : selectedDoctorStore
    const prescription = analysis.map(obj => obj._id)
    
    registerPrescription(prescription, doctor, selectedPatientID)
    .then((msg) => {
      toast.success(msg)
      setAnalysis([])
      setSelectedPatientStore(null)
      setSelectedDoctorStore(null)
      
    })
    .catch(err => console.log("ERR : ", err))
  }

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue, 10));
    setPage(0);
  };

  const labelDisplayedRows = ({ from, to, count }) => {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  };

  const getLabelDisplayedRowsTo = () => {
    if (analysis.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? analysis.length
      : Math.min(analysis.length, (page + 1) * rowsPerPage);
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - analysis.length);

  return (
    <Stack direction="column" spacing={2} sx={{ display: 'flex', my: 1 }}>
      <DoctorSelection />
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Stack direction="row" spacing={2} alignItems="center">
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>Choisir les analyses</FormLabel>
          <Autocomplete
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionLabel={(option) => option.nom}
            options={options}
            loading={loading}
            onChange={(event, newValue) => {
              if (newValue) {
                setSelectedAnalysis(newValue);
              }
            }}
            renderTags={(params) => (
              <TextField
                {...params}
                placeholder="Search analyses"
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
        <Button onClick={handleAddAnalysis} sx={{ width: "200px", marginTop: '25px !important' }}>ajouter au tableau</Button>
      </Stack>

      <Table
        aria-label="analysis table"
        sx={{
          border: '3px black #BBBBBB',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <thead sx={{ borderRadius: '10px' }}>
          <tr>
            <th>Analyses</th>
          </tr>
        </thead>
        <tbody>
        {analysis.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
          <tr key={index}>
            <td>{item.nom}</td>
          </tr>
        ))}
          {emptyRows > 0 && (
            <tr
              style={{
                height: 53 * emptyRows,
              }}
            >
              <td colSpan={1} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={1}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  justifyContent: 'flex-end',
                }}
              >
                <Typography textAlign="center" sx={{ minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: analysis.length === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: analysis.length === -1 ? -1 : analysis.length,
                  })}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: 'background.surface' }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={
                      analysis.length !== -1
                        ? page >= Math.ceil(analysis.length / rowsPerPage) - 1
                        : false
                    }
                    onClick={() => handleChangePage(page + 1)}
                    sx={{ bgcolor: 'background.surface' }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Button onClick={handleAddPrescription} sx={{ marginTop: '25px !important' }} fullWidth>ajouter Ordonnance</Button>
    </Stack>
  );
}
