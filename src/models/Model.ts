import { Database } from "../lib/Database";
import { IntfModel } from "../types/Models";

export class Model<T> implements IntfModel<T> {
    constructor(
        protected table: string,
        protected db: Database = Database.getInstance()
    ) { };

    async GET(id: string): Promise<T> {
        const row = await this.db.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
        return row[0];
    }

    async GETALL(): Promise<T[]> {
        return [];
    }

    async POST(data: T): Promise<void> { }

    async UPDATE(id: string): Promise<void> { }

    async DELETE(id: string): Promise<boolean> {
        return true;
    }
}