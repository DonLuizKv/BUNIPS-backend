import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import Logger from '../Logger';
import { Events } from './Events';

export class SocketServer {
    private io: Server;
    private connectedSockets: Map<string, string> = new Map();

    constructor(server: HTTPServer) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
                methods: ["GET", "POST"]
            },
        });
    }

    initialize() {
        this.io.on('connection', (socket: Socket) => {
            Logger.socket(`Client Connected: ${socket.id}`);

            this.connected(socket)
            socket.join("adm");
            socket.join("psy");
            socket.join("pa");
            const events = new Events(
                this.io,
                socket,
                this.connectedSockets
            );

            events.init();

            // info Events
            this.disconnected(socket);
            this.error(socket);
        });
    }

    private connected(socket: Socket) {
    }

    private disconnected(socket: Socket) {
        socket.on("disconnect", () => {
            Logger.socket(`Client Disconnected: ${socket.id}`, {
                styles: {
                    msg: { color: "red" }
                }
            });
            this.connectedSockets.delete(socket.id)
        });
    }

    private error(socket: Socket) {
        socket.on("error", (error: Error) => {
            Logger.error(`Error from client: ${error}`);
        });
    }

    getConnectedClients(): string[] {
        return Array.from(this.connectedSockets.keys());
    }

    getTotalClients(): number {
        return this.connectedSockets.size;
    }

}