import { Server, Socket } from "socket.io";

type Channel = "gen" | "adm" | "mod" | "psy" | "pa";
type Actions = "CREATE" | "UPDATE" | "DELETE" | "ACCEPT" | "CANCEL";

// Formato de recibimiento del backend
interface Package {
    type: "direct" | "broadcast";
    to: string | Channel[];
    data: Record<string, any>;
}

// Configuración interna del evento
interface Direction {
    channel: Channel;
    entity?: string;
    action?: Actions;
}

export class Events {
    constructor(
        private io: Server,
        private socket: Socket,
        private connectedUsers: Map<string, string> // userId -> socketId
    ) { }

    /**
     * Genera la direccion de envio: CHANNEL:ENTITY:ACTION o CHANNEL:ENTITY
     */
    private generateDirective(config: Direction): string {
        const parts = [config.channel.toUpperCase()];

        if (config.entity) {
            parts.push(config.entity.toUpperCase());
        }

        if (config.action) {
            parts.push(config.action.toUpperCase());
        }

        return parts.join(':');
    }

    /**
     * Procesa múltiples configuraciones de envío
     */
    private processDispatchConfigs(Packages: Package[], sourceEventConfig: Direction) {
        Packages.forEach(PackageConfig => {
            if (PackageConfig.type === "direct") {
                this.handleDirectDispatch(PackageConfig, sourceEventConfig);
            } else if (PackageConfig.type === "broadcast") {
                this.BroadcastDispatch(PackageConfig, sourceEventConfig);
            }
        });
    }

    /**
     * Envío directo a un usuario específico
     */
    private handleDirectDispatch(PackageConfig: Package, DirectionConfig: Direction) {
        const targetID = PackageConfig.to as string;
        const targetSocketID = this.connectedUsers.get(targetID);

        if (!targetSocketID) {
            console.warn(`User ${targetID} not connected`);
            return;
        }

        // Determinar el canal del receptor desde el ID (PA-12434 -> pa)
        const targetChannel = targetID.split('-')[0].toUpperCase() as Channel;

        // Generar el evento que recibirá el cliente
        const receptionDirective = this.generateDirective({
            channel: targetChannel,
            entity: DirectionConfig.entity,
            action: DirectionConfig.action
        });

        this.io.to(targetSocketID).emit(receptionDirective, {
            from: this.socket.id,
            data: PackageConfig.data,
            timestamp: Date.now()
        });

        console.log(`Direct event sent: ${receptionDirective} -> ${targetID}`);
    }

    /**
     * Broadcast a múltiples canales
     */
    private BroadcastDispatch(PackageConfig: Package, sourceEventConfig: Direction) {
        const targetChannels = PackageConfig.to as Channel[];

        targetChannels.forEach(channel => {
            const receptionDirective = this.generateDirective({
                channel: channel,
                entity: sourceEventConfig.entity,
                action: sourceEventConfig.action
            });

            this.io.to(channel).emit(receptionDirective, {
                from: this.socket.id,
                data: PackageConfig.data,
                timestamp: Date.now()
            });

            console.log(`Broadcast event sent: ${receptionDirective} -> ${channel} room`);
        });
    }

    /**
     * Eventos de citas
     */
    private initAppointmentEvents() {
        // Psicólogo cancela cita
        this.socket.on("PSY:APPOINTMENT:CANCEL", (Packages: Package[]) => {
            this.processDispatchConfigs(Packages, {
                channel: "psy",
                entity: "APPOINTMENT",
                action: "CANCEL"
            });
        });

        // Paciente acepta cita
        this.socket.on("PA:APPOINTMENT:ACCEPT", (Packages: Package[]) => {
            this.processDispatchConfigs(Packages, {
                channel: "pa",
                entity: "APPOINTMENT",
                action: "ACCEPT"
            });
        });

        // Crear nueva cita
        this.socket.on("PSY:APPOINTMENT:CREATE", (Packages: Package[]) => {
            this.processDispatchConfigs(Packages, {
                channel: "psy",
                entity: "APPOINTMENT",
                action: "CREATE"
            });
        });

        // Cancelar cita (genérico)
        this.socket.on("APPOINTMENT:CANCEL", (Packages: Package[]) => {
            this.processDispatchConfigs(Packages, {
                channel: "gen",
                entity: "APPOINTMENT",
                action: "CANCEL"
            });
        });
    }

    /**
     * Eventos de perfil
     */
    private initProfileEvents() {
        // Actualizar perfil de psicólogo
        this.socket.on("PSY:PROFILE:UPDATE", (Packages: Package[]) => {
            this.processDispatchConfigs(Packages, {
                channel: "psy",
                entity: "PROFILE",
                action: "UPDATE"
            });
        });

        // Actualizar perfil de paciente
        this.socket.on("PA:PROFILE:UPDATE", (Packages: Package[]) => {
            this.processDispatchConfigs(Packages, {
                channel: "pa",
                entity: "PROFILE",
                action: "UPDATE"
            });
        });
    }

    /**
     * Eventos de notificaciones
     */
    private initNotificationEvents() {
        // Crear notificación general
        this.socket.on("GEN:NOTIFICATION:CREATE", (Packages: Package[]) => {
            this.processDispatchConfigs(Packages, {
                channel: "gen",
                entity: "NOTIFICATION",
                action: "CREATE"
            });
        });

        // Notificación desde administrador
        this.socket.on("ADM:NOTIFICATION:CREATE", (Packages: Package[]) => {
            this.processDispatchConfigs(Packages, {
                channel: "adm",
                entity: "NOTIFICATION",
                action: "CREATE"
            });
        });
    }

    // /**
    //  * Eventos de chat/mensajería
    //  */
    // private initChatEvents() {
    //     this.socket.on("CHAT:MESSAGE:SEND", (Packages: Package[]) => {
    //         this.processDispatchConfigs(Packages, {
    //             channel: "gen",
    //             entity: "CHAT",
    //             action: "CREATE"
    //         });
    //     });
    // }

    /**
     * Inicializa todos los listeners de eventos
     */
    public init() {
        this.initAppointmentEvents();
        this.initProfileEvents();
        this.initNotificationEvents();
        // this.initChatEvents();

        // Evento genérico para debugging
        this.socket.on('debug:event', (data) => {
            console.log('Debug event received:', data);
        });
    }
}
