import Prescription from "../model/Prescription.model.js";
import User from "../model/User.model.js";
import Analyse from "../model/Analyse.model.js";
import Result from "../model/dataAnalysis.model.js";
import { ObjectId } from "mongodb";
import mongoose from 'mongoose';

export async function getAllResults(req, res) {
  try {
    const { userId } = req.user;
    if (userId) {
      const results = await Result.find({ validatePrescription: { $ne: 'validated' } });

      // Initialize an array to store formatted result data
      const formattedResults = [];

      // Loop through each result
      for (const result of results) {
        // Fetch prescription details
        const prescription = await Prescription.findById(result.prescriptionId);

        // Fetch patient details
        const patient = await User.findById(prescription.selectedPatient);

        // Extract analysis IDs and validation statuses from listAnalysis
        const analysisInfo = result.listAnalysis.map((item) => ({
          _id: item.analysis,
          validateAnalysis: item.validateAnalysis,
        }));

        // Fetch analyses corresponding to the IDs
        const analyses = await Analyse.find({
          _id: { $in: analysisInfo.map((item) => item._id) },
        });

        // Format analyses with _id, nom, and validatedAnalysis
        const formattedAnalyses = analyses.map((analysis) => {
          const info = analysisInfo.find((item) =>
            item._id.equals(analysis._id)
          );
          return {
            _id: analysis._id,
            nom: analysis.nom,
            validateAnalysis: info ? info.validateAnalysis : null,
            // Add other attributes of the analysis as needed
          };
        });

        // Format the result data
        const formattedResult = {
          _id: result._id,
          patientName: `${patient.firstName} ${patient.lastName}`,
          prescriptionID: result.prescriptionID,
          analyses: formattedAnalyses,
          validatePrescription: result.validatePrescription,
          dateCreation: result.dateCreation,
        };

        // Push the formatted result data to the array
        formattedResults.push(formattedResult);
      }

      // Send the formatted result data as a response
      res.status(200).json(formattedResults);
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.error("Error getting results: ", error);
    return res.status(500).send({ error: error.message });
  }
}

export async function interpretatePrescription(req, res) {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).send({ error: "User Not Found...!" });
    }

    // Extract results from the request body
    const results = req.body;

    // Convert resultsID to ObjectId
    const objectId = new ObjectId(results.resultsID);

    // Update validatePrescription field to "evaluating"
    await Result.updateOne(
      { _id: objectId },
      { $set: { validatePrescription: "evaluating" } }
    );

    // Iterate over resultsInterpretation and update each analysis individually
    const updatePromises = Object.entries(results.resultsInterpretation).map(
      async ([key, value]) => {
        return Result.updateOne(
          {
            _id: objectId,
            "listAnalysis.analysis": new ObjectId(key),
          },
          {
            $set: {
              "listAnalysis.$.result": value, // Assuming value is the interpretation result
            },
          }
        );
      }
    );

    // Execute all update operations
    await Promise.all(updatePromises);

    // Respond to the client with the result
    res.status(200).json({ msg: "Update successful" });
  } catch (error) {
    console.error("Error getting results: ", error);
    return res.status(500).send({ error: error.message });
  }
}

export async function getAllResultsNotValidate(req, res) {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).send({ error: "User Not Found...!" });
    }
    const results = await Result.find({ validatePrescription: "evaluating" });

    // Initialize an array to store formatted result data
    const formattedResults = [];

    // Loop through each result
    for (const result of results) {
      // Fetch prescription details
      const prescription = await Prescription.findById(result.prescriptionId);

      // Fetch patient details
      const patient = await User.findById(prescription.selectedPatient);

      // Extract analysis IDs and validation statuses from listAnalysis
      const analysisInfo = result.listAnalysis.map((item) => ({
        _id: item.analysis,
        result: item.result,
        validateAnalysis: item.validateAnalysis,
      }));

      // Fetch analyses corresponding to the IDs
      const analyses = await Analyse.find({
        _id: { $in: analysisInfo.map((item) => item._id) },
      });

      // Format analyses with _id, nom, and validatedAnalysis
      const formattedAnalyses = analyses.map((analysis) => {
        const info = analysisInfo.find((item) => item._id.equals(analysis._id));
        return {
          _id: analysis._id,
          nom: analysis.nom,
          result : info.result,
          validateAnalysis: info ? info.validateAnalysis : null,
          // Add other attributes of the analysis as needed
        };
      });

      // Format the result data
      const formattedResult = {
        _id: result._id,
        patientName: `${patient.firstName} ${patient.lastName}`,
        prescriptionID: result.prescriptionID,
        analyses: formattedAnalyses,
        validatePrescription: result.validatePrescription,
        dateCreation: result.dateCreation,
      };

      // Push the formatted result data to the array
      formattedResults.push(formattedResult);
    }

    // Send the formatted result data as a response
    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error getting results: ", error);
    return res.status(500).send({ error: error.message });
  }
}

export async function validateResultsPrescription(req, res){
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).send({ error: "User Not Found...!" });
    }

    const finalResults = req.body
    // Validate the _id
    if (!mongoose.Types.ObjectId.isValid(finalResults._id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Find the existing result object by _id
    const existingResult = await Result.findById(finalResults._id);
    if (!existingResult) {
      return res.status(404).json({ error: 'Result not found' });
    }

    // Update the validatePrescription field
    existingResult.validatePrescription = finalResults.validatePrescription;

    // Update the listAnalysis field
    existingResult.listAnalysis.forEach(analysis => {
      if (finalResults.ListAnalysisResults[analysis.analysis.toString()] !== undefined) {
        analysis.validateAnalysis = finalResults.ListAnalysisResults[analysis.analysis.toString()];
      }
    });

    // Save the updated result object back to the database
    await existingResult.save();

    // Respond with the updated result
    res.status(200).json({ msg: "validation des résultat a été fait avec succes" });

  } catch(error){
    console.error("Error getting results: ", error);
    return res.status(500).send({ error: error.message });
  }
}