import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import images from '../data/images';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { Box } from '@mui/material';
import { addAppointments } from '../helper/helperCalendar';

export default function AppointmentCard({ data, onRemoveAppointment }) {
  const { doctorAppointment } = images;
  
  const handleSubmit = () => {
    addAppointments(data)
    .then((msg) => {
        onRemoveAppointment(data, msg)
    })
    .catch((error) => console.error(error))
  }

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{borderColor: "white"}}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img
          src={doctorAppointment}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          Rendez-vous avec docteur Zeghaouti
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1} sx={{ color: 'text.tertiary' }}>
            Le {data.startDate.split("T")[0]} de {data.startDate.split("T")[1].split("+")[0]} jusqu'à {data.endDate.split("T")[1].split("+")[0]} 
        </Typography>
        <Box
          sx={{cursor: 'pointer', display: 'flex', flexDirection: 'row-reverse'}} 
          onClick={handleSubmit}
        >
          <AddCircleTwoToneIcon color="primary" size="sm"  />
        </Box>
      </CardContent>
    </Card>
  );
}