import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';;
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import patientE from '../assets/images/patientE.png'

export default function ControlCard(props) {

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        display: 'flex',
        flexWrap: 'wrap',
        zIndex: 1,
      }}
    >
      <CardMedia
        component="img"
        width="100"
        height="100"
        alt= 'patient'
        src={patientE}
        sx={{
          borderRadius: '6px',
          width: { xs: '100%', sm: 100 },
        }}
      />
      <Box sx={{ alignSelf: 'center', ml: 2 }}>
        <Typography variant="body2" color="text.secondary" fontWeight="regular">
          123 Main St, Phoenix, AZ, USA
        </Typography>
        <Typography fontWeight="bold" noWrap gutterBottom>
          $280k - $310k
        </Typography>
        <Chip
          size="small"
          variant="outlined"
          label="Confidence score: 85%"
          sx={(theme) => ({
            '.MuiChip-icon': { fontSize: 16, ml: '4px', color: 'success.500' },
            bgcolor: 'success.50',
            borderColor: 'success.100',
            color: 'success.900',
          })}
        />
      </Box>
    </Card>
  );
}