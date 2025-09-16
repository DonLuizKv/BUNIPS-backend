type Role = "patient" | "psychologist" | "admin" | "modder";

interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface Patient extends User {
    appointments: Appointment[];
    psychologist: PsychologistInPatient[];
    preferences: Preferences;
}

export interface Psychologist extends User { }

export interface Admin extends User { }

export interface Modder extends User { }





// /**
//  * Preferences: Interfaz que representa las preferencias del paciente
//  * momentDay: momentos del dia preferidos
//  * weekDay: dias de la semana preferidos
//  */
// interface Preferences {
//     momentDay: MomentDay[];
//     weekDay: WeekDay[];
// }

// /**
//  * PsychologistInPatient: Interfaz que representa un psicologo del paciente
//  * id: id del psicologo
//  * name: nombre del psicologo
//  * specialty: especialidad del psicologo
//  * experience: experiencia del psicologo
//  */
// interface PsychologistInPatient {
//     id: string;
//     name: string;
//     specialty: string;
//     experience: string;
// }

// /**
//  * Role: Interfaz que representa un rol
//  * patient: paciente
//  * psychologist: psicólogo
//  * admin: administrador
//  */

// /**
//  * MomentDay: Interfaz que representa un momento del dia
//  * morning: mañana
//  * afternoon: tarde
//  * mixed: mañana y tarde
//  */
// type MomentDay = "morning" | "afternoon" | "mixed";

// /**
//  * WeekDay: Interfaz que representa un dia de la semana
//  * monday: lunes
//  * tuesday: martes
//  * wednesday: miércoles
//  * thursday: jueves
//  * friday: viernes
//  */
// type WeekDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";



