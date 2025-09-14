import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import Logger from './Logger';

export class Sockets {
    private io: Server;
    private ActiveUsers = new Map<string, string>();

    constructor(server: HTTPServer) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
                methods: ["GET", "POST"]
            },
        });
    }

    public initialize() {
        this.io.on('connection', (socket: Socket) => {
            Logger.socket(`Client Connected: ${socket.id}`);

            socket.on("login", ({ userID }) => {
                this.ActiveUsers.set(userID, socket.id);
            })

            socket.on('disconnect', () => {
                Logger.socket(`Client Disconnected: ${socket.id}`, { styles: { msg: { color: "red" } } });
                this.ActiveUsers.forEach((socketID, userID) => {
                    if (socketID === socket.id) {
                        this.ActiveUsers.delete(userID)
                    }
                });
            });

            socket.on('error', (error: Error) => {
                Logger.error(`Error from client: ${error}`);
            });
        });
    }
}