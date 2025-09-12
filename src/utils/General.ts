
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

/**
 * 
 * colores:
 * black
 * red
 * green
 * yellow
 * blue
 * violet
 * cyan
 * white
 * @param
 */
export const Print = (message: string, config: StyleConfig = {}) => {
    const colors: Record<string, string> = {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        violet: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
    };

    const bgColors: Record<string, string> = {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
    };

    const effects: string[] = [];

    if (config.color && colors[config.color.toLowerCase()])
        effects.push(colors[config.color.toLowerCase()]);
    if (config.bgColor && bgColors[config.bgColor.toLowerCase()])
        effects.push(bgColors[config.bgColor.toLowerCase()]);

    if (config.bold) effects.push("\x1b[1m");
    if (config.italic) effects.push("\x1b[3m");
    if (config.underline) effects.push("\x1b[4m");

    const reset = "\x1b[0m";
    const styledMessage = effects.join("") + message + reset;

    console.log(styledMessage);
}

