import React, { useState, useEffect } from "react";
import { getAllPatients } from "../../helper/helperUser";
import ProfilePatientMedicalFolder from "./ProfilePatientMedicalFolder";
import { Box, Input, Grid } from "@mui/joy"; // Import Input component
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export default function ListMedicalFolder() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllPatients()
      .then(users => setPatients(users))
      .catch(error => console.log(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    const query = searchQuery.toLowerCase();
    return (
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query) ||
      patient.phoneNumber.toLowerCase().includes(query) ||
      patient.address.toLowerCase().includes(query) ||
      // Assuming patient object has a dateBirth property
      patient.dateBirth.toLowerCase().includes(query)
    );
  });

  return (
    <Box>
      <Input
        placeholder="Rechercher patients..."
        value={searchQuery}
        startDecorator={<PersonSearchIcon />}
        onChange={handleSearchChange}
        sx={{ mb: 2, borderRadius: '9px' }} // Add some margin bottom for spacing
      />
      <Grid container spacing={2}>
        {filteredPatients.map((patient, index) => (
          <Grid item='true' xs={12} sm={6} md={4} lg={3} key={index}>
            <ProfilePatientMedicalFolder patient={patient} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
