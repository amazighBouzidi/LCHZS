import React from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PlaceIcon from "@mui/icons-material/Place";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { styled } from "@mui/system";
import useStore from "../../data/patientStore";
import images from "../../data/images";

const ProfileCardContainer = styled(Box)({
  width: 310,
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
});

const ProfileHeader = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1.5rem",
});

const ProfileMenu = styled(List)({
  padding: 0,
});

export default function ProfilePrescription({ user }) {
  const { placeHolder } = images
  const selectedPatient = useStore((state) => state.selectedPatient);
  return (
    <>
      <ProfileCardContainer>
        <ProfileHeader>
          <Avatar
            src={selectedPatient == null ? placeHolder : selectedPatient.profile}
            alt="Profile Picture"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h6">
            {selectedPatient == null? "Nom Complet du Patient" : <>{selectedPatient.lastName} {selectedPatient.firstName}</>}
          </Typography>
        </ProfileHeader>
        <Divider />
        <ProfileMenu>
          <ListItem button>
            <ListItemIcon>
              <ContactPhoneIcon />
            </ListItemIcon>
            <ListItemText primary={selectedPatient == null? "Numéro de telephone" : selectedPatient.phoneNumber} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary={selectedPatient == null? "Adresse" : selectedPatient.address} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CelebrationIcon />
            </ListItemIcon>
            <ListItemText primary={selectedPatient == null? "Date naissance" : selectedPatient.dateBirth.split("T")[0]} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary={selectedPatient == null? "Email" : selectedPatient.email} />
          </ListItem>
        </ProfileMenu>
      </ProfileCardContainer>
    </>
  );
}
