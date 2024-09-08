import Doctor from '../model/Doctor.model.js'
import Prescription from '../model/Prescription.model.js';
import User from '../model/User.model.js';
import Analyse from '../model/Analyse.model.js';
import Result from '../model/dataAnalysis.model.js';

export async function addPrescription(req, res) {
    try {
        const { userId } = req.user
        if (userId) {
            const { prescription, doctor, selectedPatientID } = req.body

            let doctorId;
            // Check if the doctor object has an _id
            if (doctor._id) {
                // If _id exists, use the existing doctor ID
                doctorId = doctor._id;
            } else {
                // If no _id, create a new doctor and save it to the database
                const newDoctor = new Doctor({
                    firstName: doctor.firstName,
                    lastName: doctor.lastName,
                    phoneNumber: doctor.phoneNumber,
                    officeAddress: doctor.officeAddress,
                    speciality: doctor.speciality,
                    email: doctor.email  
                });
                const savedDoctor = await newDoctor.save();
                doctorId = savedDoctor._id;
            }

            // Create a new Prescription document
            const newPrescription = new Prescription({
                selectedPatient: selectedPatientID._id,
                selectedDoctor: doctorId,
                analysis: prescription,
                dateCreation: new Date() // This is optional as it defaults to Date.now
            });
        
            // Save the prescription to the database
            const savedPrescription = await newPrescription.save();
            console.log('_id : ', savedPrescription._id)

            const listAnalysis = prescription.map(analysis =>{
                return {
                    analysis: analysis,
                    result : '',
                    validateAnalysis : false
                }
            })

            const newDataAnalysis = new Result({
                prescriptionId: savedPrescription._id,
                listAnalysis: listAnalysis,
                validatePrescription: "notValuated", 
                dateCreation: new Date()
            });

            // Save the data analysis to the database
            await newDataAnalysis.save();
        
            // Send the saved prescription as a response
            res.status(201).json({ msg: "L'ordonnance a été ajouter avec succés" });


        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error('Error adding prescription:', error);
        return res.status(500).send({ error: error.message });
    }
}

export async function getAllPrescriptions(req, res){
    try {
        const { userId } = req.user
        if (userId) {
            const prescriptions = await Prescription.find();

            // Initialize an array to store formatted prescription data
            const formattedPrescriptions = [];

            // Loop through each prescription
            for (const prescription of prescriptions) {
            // Fetch patient details
            const patient = await User.findById(prescription.selectedPatient);

            // Fetch doctor details
            const doctor = await Doctor.findById(prescription.selectedDoctor);

            // Extract required information and format the prescription data
            const formattedPrescription = {
                _id: prescription._id,
                patientName: `${patient.firstName} ${patient.lastName}`,
                doctorName: `${doctor.firstName} ${doctor.lastName}`,
                numberOfAnalyses: prescription.analysis.length,
                dateCreation: prescription.dateCreation
            };

            // Push the formatted prescription data to the array
            formattedPrescriptions.push(formattedPrescription);
            }

            // Send the formatted prescription data as a response
            res.status(200).json(formattedPrescriptions);

        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error('Error getting prescriptions: ', error);
        return res.status(500).send({ error: error.message });
    }
}

export async function getPrescriptionById(req, res){
    try {
        const { userId } = req.user
        if (userId) {
            // Extract the _id of the prescription from the request parameters
            const { idPrescription } = req.params;

            // Find the prescription by _id
            const prescription = await Prescription.findById(idPrescription);

            // Check if the prescription exists
            if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
            }

            // Find the associated patient details using the selectedPatientID in the prescription
            const patient = await User.findById(prescription.selectedPatient);

            // Calculate the age based on the patient's date of birth
            const today = new Date();
            const birthDate = new Date(patient.dateBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            // Find the associated doctor details using the selectedDoctorID in the prescription
            const doctor = await Doctor.findById(prescription.selectedDoctor);

            // Find the associated analyses using the analysis IDs in the prescription
            const analyses = await Analyse.find({ _id: { $in: prescription.analysis } });

            // Extract the names of the analyses
            const analysisNames = analyses.map((analysis) => analysis.nom);

            // Extract the required information
            const prescriptionDetails = {
                _id: prescription._id,
                date: prescription.dateCreation,
                patientLastName: patient.lastName,
                patientProfile: patient.profile,
                patientFirstName: patient.firstName,
                patientAge: age,
                doctorFullName: `${doctor.firstName} ${doctor.lastName}`,
                doctorSpecialty: doctor.speciality,
                analysisNames: analysisNames
            };

            // Send the prescription details as a response
            res.status(200).json(prescriptionDetails);

        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error('Error getting prescriptions: ', error);
        return res.status(500).send({ error: error.message });
    }
}