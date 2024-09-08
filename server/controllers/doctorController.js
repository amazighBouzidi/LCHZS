import Doctor from '../model/Doctor.model.js';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import bcrypt from 'bcrypt';

export async function getAllDoctors(req, res) {
    try {
      const { userId } = req.user;
      // Find all users
      if (userId) {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
      } else {
        return res.status(401).send({ error: "Error user...!" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }