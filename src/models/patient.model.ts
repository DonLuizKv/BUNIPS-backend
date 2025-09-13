import { Database } from "../lib/Database";

export type patientModel = {
    GET: (id: string) => Promise<any>;
    POST: (data: any) => Promise<any>;
    UPDATE: (id: string, data: any) => Promise<any>;
    DELETE: (id: string) => Promise<any>;
}

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
    console.log(result);
    
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