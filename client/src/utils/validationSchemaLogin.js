import * as yup from 'yup';

const validationSchemaAuth = yup.object({
    email: yup
      .string('Entrez votre adresse email')
      .email('Entrez une adresse email valide')
      .required('L\'adresse email est requise'),
    password: yup
      .string('Entrez votre mot de passe')
      .required('Le mot de passe est requis'),
});
  
export default validationSchemaAuth;