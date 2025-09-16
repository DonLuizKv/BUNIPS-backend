import { Appointment } from "./appoiments";
import { Admin, Modder, Patient, Psychologist } from "./user";

interface IntfModel<T> {
    GET: (id: string) => Promise<T>;
    GETALL: () => Promise<T[]>;
    POST: (data: T) => Promise<void>;
    UPDATE: (id: string, data: T) => Promise<void>;
    DELETE: (id: string) => Promise<boolean>;
}

// USER MODELS
export interface IntfPatientModel extends Model<Patient> { };

export interface IntfPsychologistModel extends Model<Psychologist> { };

export interface IntfAdminModel extends Model<Admin> { };

export interface IntfModderModel extends Model<Modder> { };

// OTHERS MODELS
export interface IntfAppointmentModel extends Model<Appointment> { };

