import User from "../model/User.model.js";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import bcrypt from "bcrypt";
import Analyse from "../model/Analyse.model.js";
import Result from "../model/dataAnalysis.model.js";
import Prescription from "../model/Prescription.model.js";
import Doctor from "../model/Doctor.model.js";
import mongoose from "mongoose";

//generate Random String
function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

// Create a user with Google account
export async function registerUserWithGoogle(req, res) {
  try {
    const { profileObj } = req.body;
    const existingUser = await User.findOne({ email: profileObj.email });
    if (existingUser) {
      console.log("User exists");
      const token = jwt.sign({ userId: existingUser._id }, ENV.JWT_SECRET, {
        expiresIn: "24h",
      });
      return res
        .status(200)
        .send({
          userType: existingUser.userType,
          msg: "user exist already",
          token,
        });
    } else {
      console.log("User does not exist");
    }

    const user = new User({
      lastName: profileObj.familyName,
      firstName: profileObj.givenName,
      phoneNumber: profileObj.phoneNumbers || "null", // Set to empty string if not provided
      address: profileObj.address || "null",
      dateBirth: profileObj.dateBirth, // Set to empty string if not provided
      profile: profileObj.imageUrl || "null", // Set to empty string if not provided
      email: profileObj.email,
      password: Math.random().toString(36).slice(-8),
      userType: "patient",
    });
    await user.save();
    const userFind = await User.findOne({ email: profileObj.email });
    const token = jwt.sign({ userId: userFind._id }, ENV.JWT_SECRET, {
      expiresIn: "24h",
    });
    console.log("token new: ", token);
    res
      .status(201)
      .send({
        msg: "User created successfully",
        userType: user.userType,
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
}

// Create a user with Google account
export async function registerUserWithForm(req, res) {
  try {
    const { parsedProfileUser, file } = req.body;
    const profileUser = JSON.parse(parsedProfileUser);
    const existingUser = await User.findOne({ email: profileUser.email });
    if (existingUser) {
      console.log("User exists");
      return res
        .status(200)
        .send({ msg: "User with the given email already exists" });
    } else {
      console.log("User does not exist");
    }

    const user = new User({
      lastName: profileUser.lastName,
      firstName: profileUser.firstName,
      phoneNumber: profileUser.phoneNumber || "null", // Set to empty string if not provided
      address: profileUser.address || "null",
      dateBirth: profileUser.dateBirth,
      profile: file || "null", // Set to empty string if not provided
      email: profileUser.email,
      password: profileUser.password,
      userType: "patient",
    });
    await user.save();
    const userFind = await User.findOne({ email: user.email });
    const token = jwt.sign({ userId: userFind._id }, ENV.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(201).send({ msg: "User created successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
}

// Get user by ID
export async function authUser(req, res) {
  const { email, password } = req.body; // Access email and password directly from req.body
  try {
    // Check if user exists and password matches
    const user = await User.findOne({ email, password });
    if (!user) {
      console.log("user not found");
      // If user not found or password doesn't match, return 401 Unauthorized
      return res.status(401).json({ error: "Wrong email or password" });
    }

    // If user is found and password matches, return success
    // User exists, generate a JWT
    const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ msg: "Login successful", user, token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
}

export async function getUser(req, res) {
  const { userId } = req.user;
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
}

export async function updateUser(req, res) {
  try {
    const { userId } = req.user;
    //console.log('user ID: ',userId)

    if (userId) {
      const { parsedProfileUser } = req.body;
      const parseUpdateProfileUser = JSON.parse(parsedProfileUser);
      //console.log("Parse Update Profile: ",parseUpdateProfileUser)
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      (existingUser.firstName = parseUpdateProfileUser.firstName),
        (existingUser.lastName = parseUpdateProfileUser.lastName),
        (existingUser.email = parseUpdateProfileUser.email),
        (existingUser.phoneNumber = parseUpdateProfileUser.phoneNumber),
        (existingUser.address = parseUpdateProfileUser.address),
        (existingUser.profile = parseUpdateProfileUser.profile),
        (existingUser.password = parseUpdateProfileUser.password);

      await existingUser.save();
      return res
        .status(201)
        .send({ msg: "Votre Profile a été modifier avec succes" });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.error("ERROR IN USER UPDATE : ", error);
    return res.status(500).send({ error: error.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const { userId } = req.user;
    // Find all users
    if (userId) {
      const stringValue = "[ 'administrateur', 'patient' ]";
      const value = eval(stringValue);
      const users = await User.find({ userType: { $nin: value } });
      res.status(200).json(users);
    } else {
      return res.status(401).send({ error: "Error user...!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.user;
    if (userId) {
      const { employerId } = req.params;
      const deletedUser = await User.deleteOne({ _id: employerId });
      if (deletedUser.deletedCount > 0) {
        return res.status(200).send({ msg: "Employer Deleted...!" });
      } else {
        return res.status(404).send({ error: "User Not Found...!" });
      }
    } else {
      return res.status(401).send({ error: "Error user...!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function addEmployer(req, res, next) {
  try {
    const { userId } = req.user;
    if (userId) {
      const { newEmployer } = req.body;
      const parseEmployer = JSON.parse(newEmployer);
      const existingEmployer = await User.findOne({
        email: parseEmployer.email,
      });
      if (existingEmployer) {
        res.status(409).json({ msg: "Employer existe déja" });
      }
      const employer = new User({
        lastName: parseEmployer.lastName,
        firstName: parseEmployer.firstName,
        phoneNumber: parseEmployer.phoneNumber,
        address: parseEmployer.address,
        dateBirth: parseEmployer.dateBirth,
        profile: parseEmployer.image,
        email: parseEmployer.email,
        password: generateRandomString(),
        userType: parseEmployer.userType,
      });
      await employer.save();

      req.newEmployer = employer;

      next();
      //res.status(201).json({ msg: 'Employer Ajouter Avec Succes', addEmployer: employer });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.error("Error adding Employer:", error);
    return res.status(500).send({ error: error.message });
  }
}

export async function getAllPatients(req, res) {
  try {
    const { userId } = req.user;
    // Find all users
    if (userId) {
      const stringValue = [
        "administrateur",
        "biologisteClinique",
        "technicienLaboratoire",
        "agentAccueil",
      ];
      const value = eval(stringValue);
      const users = await User.find({ userType: { $nin: value } });
      res.status(200).json(users);
    } else {
      return res.status(401).send({ error: "Error user...!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function fullMedicalFolderPatient(req, res) {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).send({ error: "User Not Found...!" });
    }

    const { patientID } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(patientID)) {
        return res.status(400).json({ error: 'Invalid patient ID' });
      }
    
      // Fetch patient information
      const patient = await User.findById(patientID).select("-password"); // Excluding password for security
    
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      // Fetch prescriptions for the patient
      const prescriptions = await Prescription.find({
        selectedPatient: patientID,
      })
        .populate(
          "selectedDoctor",
          "firstName lastName phoneNumber officeAddress speciality email"
        )
        .populate("analysis", "nom");

      // Construct the full medical folder response
      const fullMedicalFolder = {
        informationPersonnelPatient: {
          lastName: patient.lastName,
          firstName: patient.firstName,
          phoneNumber: patient.phoneNumber,
          address: patient.address,
          dateBirth: patient.dateBirth,
          profile: patient.profile,
          email: patient.email,
          accountCreationDate: patient.accountCreationDate,
        },
        prescriptions: [],
      };

      // Fetch the results associated with each prescription and structure the response
      for (const prescription of prescriptions) {
        const results = await Result.findOne({
          prescriptionId: prescription._id,
        }).populate("listAnalysis.analysis", "nom");

        const prescriptionInfo = {
          prescription: {
            informationPersonnelDoctor: {
              lastName: prescription.selectedDoctor.lastName,
              firstName: prescription.selectedDoctor.firstName,
              phoneNumber: prescription.selectedDoctor.phoneNumber,
              officeAddress: prescription.selectedDoctor.officeAddress,
              speciality: prescription.selectedDoctor.speciality,
              email: prescription.selectedDoctor.email,
            },
            listAnalysis: results
              ? results.listAnalysis.map((item) => ({
                  nom: item.analysis.nom,
                  result: item.result,
                }))
              : [],
          },
          dateCreationOfPrescription: prescription.dateCreation,
        };

        fullMedicalFolder.prescriptions.push(prescriptionInfo);
      }
      res.status(201).json(fullMedicalFolder);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the medical folder" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function countData(req, res){
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).send({ error: "User Not Found...!" });
    }

    // Get the count of analyses
    const analyseCount = await Analyse.countDocuments();

    // Get the count of patients grouped by their user type
    const patientCount = await User.countDocuments({ userType: 'patient' });

    // Get the total count of employers
    const employerCount = await User.countDocuments({
      userType: { $in: ['agentAccueil', 'biologisteClinique', 'technicienLaboratoire'] }
    });

    const notValidatedResultPrescription = await Result.countDocuments({
      validatePrescription: { $in: ['redo', 'evaluating'] }
    });

    res.json({ analyseCount, patientCount, employerCount, notValidatedResultPrescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}
