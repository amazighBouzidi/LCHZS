import React, { useEffect, useState } from "react";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import { Avatar, Badge, Card, Grid, Typography } from "@mui/material";
import { getPrescription } from "../../helper/helperPrescription";

export default function PrescriptionDetail({ prescription, isOpen, onClose }) {
  const [prescriptionDetails, setPrescriptionDetails] = useState(null)
  const idPrescription = prescription._id 
  useEffect(() =>{
    getPrescription(idPrescription)
    .then(prescriptionDetails => setPrescriptionDetails(prescriptionDetails))
    .catch(err => console.error("ERROR getting prescription: ", err))
  }, [])

  return (
    <Modal open={isOpen} onClose={onClose}>
        <ModalDialog sx={{ backgroundColor: "white"}}>
            <ModalClose />
            <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)', borderColor: "white" }}>
                <Card sx={{borderColor: "white", backgroundColor: "white"}}>
                    <Grid container spacing={6} p={6}>
                        <Grid item xs={12} md={4}>
                        <Grid container direction="column" alignItems="center" spacing={4}>
                            <Avatar sx={{ width: 160, height: 160 }}>
                            <img 
                                alt="Patient" 
                                src={prescriptionDetails == null ? "" : prescriptionDetails.patientProfile} 
                            />
                            </Avatar>
                            <Grid container direction="column" gap={1} textAlign="center">
                            <Typography variant="h5" fontWeight="bold">{prescription.patientName}</Typography>
                            <Typography variant="body2" color="text.secondary">Age: {prescriptionDetails == null ? "" : prescriptionDetails.patientAge} </Typography>
                            </Grid>
                        </Grid>
                        </Grid>
                        <Grid item xs={12} md={8}>
                        <Grid container direction="column" gap={6}>
                            <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Typography variant="h4" fontWeight="bold">Ordonnace</Typography>
                                <Badge badgeContent="Active" color="success" variant="dot" />
                            </Grid>
                            <Grid container direction="column" gap={1}>
                                <Grid container alignItems="center" justifyContent="space-between">
                                <Typography variant="body1" color="text.secondary">Docteur:</Typography>
                                <Grid container alignItems="center" gap={2}>
                                    <Grid container direction="column">
                                    <Typography variant="body1" fontWeight="bold">{prescriptionDetails == null ? "N/A": prescriptionDetails.doctorFullName}</Typography>
                                    <Typography variant="body2" color="text.secondary">{prescriptionDetails == null ? "N/A": prescriptionDetails.doctorSpecialty}</Typography>
                                    </Grid>
                                </Grid>
                                </Grid>
                                <Grid container alignItems="center" justifyContent="space-between">
                                <Typography variant="body1" color="text.secondary">Date d'ajout:</Typography>
                                <Typography variant="body1">
                                    { prescriptionDetails == null ? 'N/A' : prescriptionDetails.date.split("T")[0]}
                                </Typography>
                                </Grid>
                            </Grid>
                            </Grid>
                            <Grid item>
                            <Typography variant="h6" fontWeight="bold">Liste des analyse faites: </Typography>
                            <Grid container direction="column" gap={1}>
                                {prescriptionDetails == null ? "" : (
                                    prescriptionDetails.analysisNames.map((name, index) => (
                                        <Typography key={index} variant="body1">{name}</Typography>
                                    ))
                                )}
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </ModalDialog>
    </Modal>
  );
}
