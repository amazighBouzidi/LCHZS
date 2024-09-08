import React from 'react';
import { createBrowserRouter} from 'react-router-dom';
import Catalogue from '../pages/Catalogue'
import Home from '../pages/Home'
import Login from '../pages/Login'
import HomeClient from '../pages/HomeClient';
import HomeAdmin from '../pages/HomeAdmin';
import HomeAgentAcceuil from '../pages/HomeAgentAcceuil';
import AdminProfile from '../pages/admin/AdminProfile';
import Employer from '../pages/admin/Employer';
import Analyse from '../pages/admin/Analyse';
import Patient from '../pages/agentAcceuil/Patient';
import Appointement from '../pages/patient/Appointement';
import PatientProfile from '../pages/patient/PatientProfile';
import Prescription from '../pages/agentAcceuil/Prescription';
import AddPrescription from '../pages/agentAcceuil/AddPrescription';
import HomeTechnicienLaboratoire from '../pages/HomeTechnicienLaboratoire';
import TechnicienLaboratoireProfile from '../pages/technicienLaboratoire/TechnicienLaboratoireProfile';
import InterpretationAnalysis from '../pages/technicienLaboratoire/InterpretationAnalysis';
import AddResultInterpretationAnalysis from '../pages/technicienLaboratoire/AddResultInterpretationAnalysis';
import ValidatePrescriptionResults from '../pages/admin/ValidatePrescriptionResults';
import ValidateAnalyse from '../pages/admin/ValidateAnalyse';
import MedicalFolder from '../pages/admin/MedicalFolder';
import PatientMedicalFolderDetail from '../pages/admin/PatientMedicalFolderDetail';

const routes = [
    {
        path: '/',
        name: 'Acceuil',
        element: <Home/>
    },
    {
        path: '/login',
        name: 'Login',
        element: <Login />
    },
    {
        path: '/catalogues',
        name: 'Catalogues',
        element: <Catalogue />
    },
    {
        path: '/homeClient',
        name: 'homeClient',
        element: <HomeClient />
    },
    {
        path: '/homeAdmin',
        name: 'homeAdmin',
        element: <HomeAdmin />
    }, 
    {
        path: '/homeAgentAcceuil',
        name: 'homeAgentAcceuil',
        element: <HomeAgentAcceuil />
    }, 
    {
        path: '/profileAdmin',
        name: 'profileAdmin',
        element: <AdminProfile />
    },
    {
        path: '/profilePatient',
        name: 'profilePatient',
        element: <PatientProfile />
    }, 
    {
        path: '/listeEmployers',
        name: 'listeEmployers',
        element: <Employer />
    },
    {
        path: '/listeAnalyses',
        name: 'listeAnalyses',
        element: <Analyse />
    },
    {
        path: "/listePatients",
        name: "listePatients",
        element: <Patient />
    },
    {
        path: "/listAppointement",
        name: "listAppointement",
        element: <Appointement />
    },
    {
        path: "/listePrescriptions",
        name: "listePrescriptions",
        element: <Prescription />
    },
    {
        path: "/addPrescriptions",
        name: "addPrescriptions",
        element: <AddPrescription />
    },
    {
        path: '/homeTechnicienLaboratoire',
        name: 'homeTechnicienLaboratoire',
        element: <HomeTechnicienLaboratoire />
    },
    {
        path: '/profileTechnicienLaboratoire',
        name: 'profileTechnicienLaboratoire',
        element: <TechnicienLaboratoireProfile />
    },
    {
        path: "/InterpretationAnalysis",
        name: "InterpretationAnalysis",
        element: <InterpretationAnalysis />
    },
    {
        path: "/addResultInterpretationAnalysis",
        name: "addResultInterpretationAnalysis",
        element: <AddResultInterpretationAnalysis />
    },
    {
        path: "/validatePrescriptionResults",
        name: "validatePrescriptionResults",
        element: <ValidatePrescriptionResults />
    },
    {
        path: "/validateResult",
        name: "validateResult",
        element: <ValidateAnalyse />
    },
    {
        path: "/medicalFolder",
        name: " medicalFolder",
        element: <MedicalFolder />
    },
    {
        path: "/patientMedicalFolderDetail",
        name: "patientMedicalFolderDetail",
        element: <PatientMedicalFolderDetail />
    }
]

const router = createBrowserRouter(routes)

export default router