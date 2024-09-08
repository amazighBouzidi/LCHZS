import * as yup from 'yup';

const validationSchemaDoctor= yup.object({
    lastName: yup
      .string('Entrez votre nom')
      .required('Le nom est requis'),
    firstName: yup
      .string('Entrez votre prénom')
      .required('Le prénom est requis'),
    officeAddress: yup
      .string('Entrez votre adresse')
      .required('L\'adresse est requise'),
    speciality: yup
      .string('Entrez la specialité ')
      .required('la specialité est requise'),  
    phoneNumber: yup
      .string('Entrez votre numéro de téléphone')
      .required('Le numéro de téléphone est requis')
      .matches(/^\d+$/, 'Entrez un numéro de téléphone valide'),  
    email: yup
      .string('Entrez votre adresse email')
      .email('Entrez une adresse email valide')
      .required('L\'adresse email est requise'),
});
  
export default validationSchemaDoctor;