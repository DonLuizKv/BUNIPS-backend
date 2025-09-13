
// create
// update
// get
// getAll
// delete

import { Request, Response } from "express";
import Logger from "../lib/Logger";
import { PatientService } from "../services/patient.service";

const Service = new PatientService();

export default async function GetPatient(req: Request, res: Response): Promise<any> {
    try {
        const id = req.params.id;
        const patient = await Service.getPatient(id);
        console.log(patient);
        
        return res.status(200).json({ data: patient })
    } catch (error) {
        Logger.error("Error to get patient");
        res.status(400).json({ msg: "Error to get patient" })
    }
}