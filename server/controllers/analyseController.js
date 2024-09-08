import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import bcrypt from 'bcrypt';
import Analyse from '../model/Analyse.model.js';

export async function addAnalyse(req, res) {
    try {
        const { userId } = req.user
        if (userId) {
            const { newAnalyse } = req.body;
            const parseAnalyse =  JSON.parse(newAnalyse);
            const existingAnalyse = await  Analyse.findOne({ nom: parseAnalyse.nom})
            if (existingAnalyse) {
                res.status(409).json({ msg: 'Cet analyse existe déja' })
            }
            const analyse = new Analyse({ 
                nom: parseAnalyse.nom,
                code: parseAnalyse.code,
                image: parseAnalyse.image,
                description: parseAnalyse.description,
                prix: parseAnalyse.prix 
            });
            await analyse.save();
            res.status(201).json({ msg: 'Analyse Ajouter Avec Succes', addedAnalyse: analyse });
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error('Error adding analysis:', error);
        return res.status(500).send({ error: error.message });
    }
}

export async function getAllAnalyse(req, res) {
    try {
        const { userId } = req.user
        if (userId) {
            const analyses = await Analyse.find();
            res.status(200).json(analyses);
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error('Error getting analysis:', error);
        return res.status(500).send({ error: error.message });
    }
}

export async function updateAnalyse(req, res) {
    try {
        const { userId } = req.user;
        console.log('User:', userId);
        if (userId) {
            const { analyseId } = req.params;
            const { updateAnalyse } = req.body
            const parseUpdateAnalyse =  JSON.parse(updateAnalyse);
            const existingAnalyse = await Analyse.findById(analyseId);
            if (!existingAnalyse) {
                return res.status(404).json({ msg: 'Analyse not found' });
            }
            // Update the existing analysis
            existingAnalyse.nom = parseUpdateAnalyse.nom;
            existingAnalyse.code = parseUpdateAnalyse.code;
            existingAnalyse.description = parseUpdateAnalyse.description;
            existingAnalyse.prix = parseUpdateAnalyse.prix;
            existingAnalyse.image = parseUpdateAnalyse.image;

            // Save the updated analysis
            const updatedAnalyse = await existingAnalyse.save();

            // Return the updated analysis
            res.status(200).json({ msg:'Analyse Modifie Avec Success', newUpdatedAnalyse: updatedAnalyse});
        }else{
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error('Error deleting analysis:', error);
        return res.status(500).send({ error: error.message });
    }
}

export async function deleteAnalyse(req, res) {
    try {
        const { userId } = req.user
        if (userId) {
            const { analyseId } = req.params;
            const analyse = await Analyse.findById(analyseId);
            if (analyse) {
                await Analyse.findByIdAndDelete(analyseId);
                res.status(200).json({ msg: 'Analyse Supprimer Avec Succes', deletedAnalyse: analyse });
            } else {
                return res.status(404).json({ error: "Analyse Not Found...!" });
            }
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error('Error deleting analysis:', error);
        return res.status(500).send({ error: error.message });
    }
}