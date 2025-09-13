import { patientModel, PatientModel } from "../models/patient.model";

export class PatientService {
    constructor(private readonly Model: patientModel = PatientModel) { }

    getPatient(id: string) {
        return this.Model.GET(id);
    }

    getAllPatients() {

    }

    createPatient() {

    }

    updatePatient() {

    }

    deletePatient() {

    }
}