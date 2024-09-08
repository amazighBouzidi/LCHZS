import React from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import { Box } from '@mui/material';
import { deleteUser } from '../../helper/helperUser';

export default function DeletePatient({ open, onClose, row, onDelete }) {
  const { lastName, firstName, phoneNumber, address, dateBirth, email, userType  } = row

  const handleCofirmDelete = () => {
    deleteUser(row._id)
    .then((msg) => {
      console.log(msg)
      onDelete(row)
      onClose()
    }).catch(err=>console.log('error', err))
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <div>Confirmation de Suppression du patient</div>
        <div>
          <p>Êtes-vous sûr de vouloir supprimer patient suivant ?</p>
          <p><strong>Nom :</strong> {lastName}</p>
          <p><strong>Prénom :</strong> {firstName}</p>
          <p><strong>Téléphone :</strong> {phoneNumber}</p>
          <p><strong>Adresse :</strong> {address}</p>
          <p><strong>Date de Naissance :</strong> {dateBirth}</p>
          <p><strong>Email :</strong> {email}</p>
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
          <Button variant="solid" color="danger"  onClick={handleCofirmDelete} >Confirmer la Suppression</Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}
