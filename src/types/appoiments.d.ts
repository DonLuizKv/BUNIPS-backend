/**
 * Pending: Cuando se envio la solicitud
 * Confirmed: Cuando el psicologo acepta la solicitud
 * In Progress: Cuando el paciente esta en la sesion
 * Completed: Cuando el paciente termina la sesion
 * Cancelled: Cuando el paciente cancela la sesion
 */

type AppointmentStatus = "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";

/**
 * Appointment: Interfaz que representa una cita
 * id: id de la cita
 * patientName?: nombre del paciente
 * psychologistName?: nombre del psicologo
 * date: fecha de la cita
 * time: hora de la cita
 * status: estado de la cita
 * reason?: motivo de la cita
 * revised: si la cita fue revisada
 */
interface Appointment {
    id: string;
    patientName?: string;
    psychologistName?: string;
    date: string;
    time: string;
    status: AppointmentStatus;
    reason?: string;
    revised: boolean;
}