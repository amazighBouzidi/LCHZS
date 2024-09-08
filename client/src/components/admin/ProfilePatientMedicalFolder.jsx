import React, { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/joy";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PlaceIcon from "@mui/icons-material/Place";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MedicalForlderImg from "../../assets/images/medicalFolder.png";
import Tooltip from "@mui/material/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../data/MedicalFolderStore";

export default function ProfilePatientMedicalFolder({ patient }) {
  const location = useLocation();
  const [test, setTest] = useState(location.state.activeDashboard);
  const navigate = useNavigate();
  const setSelectedMedicalFolder =  useStore(
    (state) => state.setSelectedMedicalFolder
  );

  return (
    <Card
      variant="outlined"
      sx={{
        width: 250,
        margin: "auto",
        overflow: "visible",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          height: 140,
          background: `url(${MedicalForlderImg}) center/cover`,
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          ml: "-16px",
          mt: "-16px",
          mr: "-16px",
        }}
      />
      <Box sx={{ textAlign: "center", marginTop: "-36px" }}>
        <Avatar
          alt={`${patient.firstName} ${patient.lastName}`}
          src={patient.profile}
          sx={{
            width: 72,
            height: 72,
            border: "3px solid white",
            margin: "0 auto",
          }}
        />
      </Box>
      <CardContent sx={{ textAlign: "center", paddingTop: "16px" }}>
        <Typography level="h5" component="div">
          {`${patient.firstName} ${patient.lastName}`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            marginTop: 2,
          }}
        >
          <Tooltip title={patient.email}>
            <IconButton component="a" color="neutral">
              <ContactMailIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={patient.phoneNumber}>
            <IconButton component="a" color="neutral">
              <ContactPhoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={patient.dateBirth.split("T")[0]}>
            <IconButton component="a" color="neutral">
              <CelebrationIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={patient.address}>
            <IconButton component="a" color="neutral">
              <PlaceIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Button
            fullWidth
            sx={{ bgcolor: "#3d8eff", borderRadius: "10px" }}
            onClick={() => {
              setSelectedMedicalFolder(patient._id)
              console.log('patient_id: ', patient._id)
              navigate(
                "/patientMedicalFolderDetail", 
                {state: { activePage: '/medicalFolder', activeDashboard: test }}
              );
            }}
          >
            Consulter
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
