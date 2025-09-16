import { IntfPatientModel } from "../types/Models";
import { Patient } from "../types/user";
import { Model } from "./Model";

export class PatientModel extends Model<Patient> implements IntfPatientModel {
    private static instance: PatientModel;

    constructor() {
        super("patients");
    }

    // singleton
    static getInstance(): PatientModel {
        if (!this.instance) {
            this.instance = new PatientModel();
        }
        return this.instance;
    }

    // patients methods
    async getAppointments(){}
}