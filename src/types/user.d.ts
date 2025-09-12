/**
 * Role: Interfaz que representa un rol
 * patient: paciente
 * psychologist: psicólogo
 * admin: administrador
 */
type Role = "patient" | "psychologist" | "admin";

/**
 * MomentDay: Interfaz que representa un momento del dia
 * morning: mañana
 * afternoon: tarde
 * mixed: mañana y tarde
 */
type MomentDay = "morning" | "afternoon" | "mixed";

/**
 * WeekDay: Interfaz que representa un dia de la semana
 * monday: lunes
 * tuesday: martes
 * wednesday: miércoles
 * thursday: jueves
 * friday: viernes
 */
type WeekDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

/**
 * User: Interfaz que representa un usuario
 * id: id del usuario
 * name: nombre del usuario
 * email: correo del usuario
 * role: rol del usuario
 * patient?: paciente del usuario
 */
interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    patient?: Patient
}

/**
 * Patient: Interfaz que representa un paciente
 * appointments: citas del paciente
 * psychologists: psicologos del paciente
 * preferences: preferencias del paciente
 */
interface Patient {
    appointments: Appointment[],
    psychologists: PsychologistInPatient[],
    preferences: Preferences
}

/**
 * Preferences: Interfaz que representa las preferencias del paciente
 * momentDay: momentos del dia preferidos
 * weekDay: dias de la semana preferidos
 */
interface Preferences {
    momentDay: MomentDay[];
    weekDay: WeekDay[];
}

/**
 * PsychologistInPatient: Interfaz que representa un psicologo del paciente
 * id: id del psicologo
 * name: nombre del psicologo
 * specialty: especialidad del psicologo
 * experience: experiencia del psicologo
 */
interface PsychologistInPatient {
    id: string;
    name: string;
    specialty: string;
    experience: string;
}