import * as yup from 'yup';

const validationSchemaEmployer = yup.object({
    lastName: yup
      .string('Entrez votre nom')
      .required('Le nom est requis'),
    firstName: yup
      .string('Entrez votre prénom')
      .required('Le prénom est requis'),
    address: yup
      .string('Entrez votre adresse')
      .required('L\'adresse est requise'),
    userType: yup
      .string('Entrez le Type Employer')
      .required('Le Type Employer est requis'),  
    phoneNumber: yup
      .string('Entrez votre numéro de téléphone')
      .required('Le numéro de téléphone est requis')
      .matches(/^\d+$/, 'Entrez un numéro de téléphone valide'),  
    dateBirth: yup
      .date('Entrez votre date de naissance').required('La date de naissance est requise')
      .max(new Date(), 'La date de naissance ne peut pas être dans le futur'), 
    email: yup
      .string('Entrez votre adresse email')
      .email('Entrez une adresse email valide')
      .required('L\'adresse email est requise'),
    image: yup
      .string('Entrez votre image')
      .required('L\'image est requise')
      .test('fileSize', 'La taille de l\'image ne doit pas dépasser 1MB', (value) => {
        if (!value) return true; // Allow if no image is provided
        const fileSize = value.length / 1024 / 1024; // Size in MB
        return fileSize <= 1;
      }),
});
  
export default validationSchemaEmployer;