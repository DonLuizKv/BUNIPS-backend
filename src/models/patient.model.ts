import { Database } from "../lib/Database";
import { patientModel } from "../types/Models";

const db = Database.getInstance();

type patient = {
    id:string,
    name:string,
    email:string,
    faculty:string,
    semester:number,
}

const GET = async (id:string) => {
    const [result]= await db.query<patient>("SELECT * FROM patient WHERE id = $1",[id]);    
    return result;
};

const POST = async () => { };

const UPDATE = async () => { };

const DELETE = async () => { };

export const PatientModel: patientModel = {
    GET,
    POST,
    UPDATE,
    DELETE
};