import React from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import { Box } from '@mui/material';
import { deleteUser } from '../../helper/helperUser';

export default function BlockPatient({ open, onClose, row, onBlock }) {
  const { lastName, firstName, phoneNumber, address, dateBirth, email, userType  } = row
  const handleCofirmBlock = () => {
    
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <div>Confirmation de Suspension d'Employé</div>
        <div>
          <p>Êtes-vous sûr de vouloir susppendre l'employé suivant ?</p>
          <p><strong>Nom :</strong> {lastName}</p>
          <p><strong>Prénom :</strong> {firstName}</p>
          <p><strong>Téléphone :</strong> {phoneNumber}</p>
          <p><strong>Adresse :</strong> {address}</p>
          <p><strong>Date de Naissance :</strong> {dateBirth}</p>
          <p><strong>Email :</strong> {email}</p>
          <p><strong>Type d'Utilisateur :</strong> {userType}</p>
        </div>
        <Box
        sx={{
          mt: 1,
          display: 'flex',
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row-reverse' },
        }}
        >
          <Button variant='soft' onClick={onClose}>Annuler</Button>
          <Button variant="solid" color="danger"  onClick={handleCofirmBlock} >Confirmer la Suspension</Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}
