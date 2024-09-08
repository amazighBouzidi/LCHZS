import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Paper, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Divider, Stack } from '@mui/material';
import { Edit, Delete, Settings, Phone, Email, LocationOn } from '@mui/icons-material';
import useStore from '../../data/MedicalFolderStore';
import { fullMedicalFolderPatient } from '../../helper/helperUser';
import CelebrationIcon from '@mui/icons-material/Celebration';

export default function ProfileMedicalDetails() {
  const selectedMedicalFolder = useStore()
  const [fullMedicalFolder, setFullMedicalFolder] = useState({})

  useEffect(() => {
    fullMedicalFolderPatient(selectedMedicalFolder)
    .then((fullMedicalFolder) => {
      setFullMedicalFolder(fullMedicalFolder)
    })
    .catch(error => console.error("ERR: ", error))
  }, [])

    return (
        <Box p={2} sx={{ backgroundColor: '#eee', minHeight: '100vh', borderRadius: "15px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, borderRadius: '14px' }}>
                <Stack alignItems="center" spacing={2}>
                  <Avatar 
                    alt={fullMedicalFolder?.informationPersonnelPatient?.firstName} 
                    src={  fullMedicalFolder?.informationPersonnelPatient ? fullMedicalFolder.informationPersonnelPatient.profile : "" } 
                    sx={{ width: 120, height: 120 }} 
                  />
                  <Typography variant="h5">{fullMedicalFolder?.informationPersonnelPatient?.firstName} {fullMedicalFolder?.informationPersonnelPatient?.lastName}</Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, borderRadius: '14px' }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6">Contact Information</Typography>
                    <Divider />
                    <Box display="flex" alignItems="center" mt={1}>
                      <Email sx={{ mr: 1 }} />
                      <Typography>{fullMedicalFolder?.informationPersonnelPatient?.email}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                      <Phone sx={{ mr: 1 }} />
                      <Typography>{fullMedicalFolder?.informationPersonnelPatient?.phoneNumber}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                      <LocationOn sx={{ mr: 1 }} />
                      <Typography>{fullMedicalFolder?.informationPersonnelPatient?.address}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                      <CelebrationIcon sx={{ mr: 1 }} />
                      <Typography>{fullMedicalFolder?.informationPersonnelPatient?.dateBirth.split("T")[0]}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6">Controle Regulier</Typography>
                    <Divider />
                    {fullMedicalFolder?.prescriptions?.map((doctor, index) => (
                      <Typography key={index} mt={1}>
                        Dr. {doctor?.prescription?.informationPersonnelDoctor?.firstName} {doctor?.prescription?.informationPersonnelDoctor?.lastName} - {doctor?.prescription?.informationPersonnelDoctor?.speciality}
                      </Typography>
                    ))}
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, borderRadius: '14px' }}>
                <Typography variant="h6">Historiques Médicale</Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {fullMedicalFolder?.prescriptions?.map((prescription, index) => (
                    <ListItem
                      sx={{mt: "5px"}} 
                      key={index} 
                      secondaryAction={
                        <>
                          <IconButton 
                            onClick={() => {
                              console.log(prescription?.prescription)
                            }}
                            edge="end"
                          >
                            <Edit />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={`/static/images/avatar/${index + 3}.jpg`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Dr - ${prescription?.prescription?.informationPersonnelDoctor?.firstName} ${prescription?.prescription?.informationPersonnelDoctor?.lastName}`}
                        secondary={
                          <div style={{display: "flex", flexDirection: 'column'}}>
                            <Typography component="span">Date: {prescription?.dateCreationOfPrescription.split("T")[0]}</Typography>
                            <Typography component="span">Location: {prescription?.prescription?.informationPersonnelDoctor?.officeAddress}</Typography>
                          </div>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      );
}
