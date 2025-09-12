
import dotenv from 'dotenv';
import { Pool } from "pg";
import { Print } from "../../utils/General";
dotenv.config();

export class Database {

    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            max: 20, // numero maximo de conexiones
            idleTimeoutMillis: 30000, // tiempo de espera de conexiones inactivas
        })
    }

    async initialize() {
        try {
            const client = await this.pool.connect();
            const req = await client.query("SELECT NOW()");
            Print(`- Connected to the ${process.env.DB_NAME} database :) - ${req.rows[0]}`, { color: "green", bold: true, });
            client.release()
        } catch (error) {
            Print(`- Error connecting to the database: ${error}`, {
                color: "red",
                bold: true,
            })
            process.exit(1)
        }
    }
}