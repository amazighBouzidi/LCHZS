import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import { deleteAnalyse } from '../../helper/helperAnalyse';
import { Box } from '@mui/joy';

export default function DeleteAnalyse({ open, onClose, row, onDelete}) {
  const { nom, prix, code, description } = row;
  const handleConfirmDelete = () => {
    deleteAnalyse(row._id)
      .then(({ msg, addedAnalyse}) => {
        // Handle success
        onDelete(row)
        onClose()
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Modal open={open} onClose={onClose} variant='soft'>
      <ModalDialog>
        <ModalClose />
        <div>Confirmation de Suppression d'Analyse</div>
        <div>
          <p>Êtes-vous sûr de vouloir supprimer l'analyse suivante ?</p>
          <p><strong>Nom :</strong> {nom}</p>
          <p><strong>Prix :</strong> {prix}</p>
          <p><strong>Code :</strong> {code}</p>
          <p><strong>Description :</strong> {description}</p>
        </div>
        <Box  sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
        >
          <Button onClick={onClose} variant="soft">Annuler</Button>
          <Button onClick={handleConfirmDelete} variant="solid" color="danger">Confirmer la Suppression</Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
