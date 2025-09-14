export type patientModel = {
    GET: (id: string) => Promise<any>;
    POST: (data: any) => Promise<any>;
    UPDATE: (id: string, data: any) => Promise<any>;
    DELETE: (id: string) => Promise<any>;
}

export type pysichologistModel = {
    GET: (id: string) => Promise<any>;
    POST: (data: any) => Promise<any>;
    UPDATE: (id: string, data: any) => Promise<any>;
    DELETE: (id: string) => Promise<any>;
}

export type adminModel = {
    GET: (id: string) => Promise<any>;
    POST: (data: any) => Promise<any>;
    UPDATE: (id: string, data: any) => Promise<any>;
    DELETE: (id: string) => Promise<any>;
}