import { PatientModel } from "../models/patient.model";

export class PatientService {
    private static instance: PatientService;

    constructor(
        private readonly Model: PatientModel = PatientModel.getInstance()
    ) { }

    // singleton
    static getInstance(): PatientService {
        if (!this.instance) {
            this.instance = new PatientService();
        }
        return this.instance;
    }

    // methods
    async getPatient(id: string) {
        this.Model.GET(id)
    }

    async getAllPatients() {

    }

    async createPatient() {

    }

    async updatePatient() {

    }

    async deletePatient() {

    }
}