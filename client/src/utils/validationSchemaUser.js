import * as yup from 'yup';

const validationSchema = yup.object({
    lastName: yup
      .string('Entrez votre nom')
      .required('Le nom est requis'),
    firstName: yup
      .string('Entrez votre prénom')
      .required('Le prénom est requis'),
    address: yup
      .string('Entrez votre adresse')
      .required('L\'adresse est requise'),
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
    password: yup
      .string('Entrez votre mot de passe')
      .required('Le mot de passe est requis')
      .min(8, 'Le mot de passe doit comporter au moins 8 caractères'),
});
  
export default validationSchema;