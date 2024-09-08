import * as yup from 'yup';

const validationSchemaAnalyse = yup.object({
  nom: yup
    .string('Entrez votre nom')
    .required('Le nom est requis'),
  code: yup
    .string('Entrez votre code')
    .required('Le code est requis'),
  prix: yup
    .string('Entrez votre prix')
    .required('Le prix est requis'),
  description: yup
    .string('Entrez votre description')
    .required('La description est requise'),
  image: yup
    .string('Entrez votre image')
    .required('L\'image est requise')
    .test('fileSize', 'La taille de l\'image ne doit pas dépasser 1MB', (value) => {
      if (!value) return true; // Allow if no image is provided
      const fileSize = value.length / 1024 / 1024; // Size in MB
      return fileSize <= 1;
    }),
});

export default validationSchemaAnalyse;
