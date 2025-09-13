
import { StyleConfig } from "../types/Generic";
import { randomBytes } from "crypto";
import * as argon2 from "argon2";

export const HASH = async (plainPassword: string): Promise<string> => {
    const hash = await argon2.hash(plainPassword);
    return hash;
};

export const COMPARE = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    const comparation = await argon2.verify(hashedPassword, plainPassword);
    return comparation;
};

export const GenerateID = (prefix: string, size: number = 5): string => {
    // 5 bytes ≈ 10 caracteres hex
    const randomPart = randomBytes(size).toString("hex");
    return `${prefix}-${randomPart}`;
};