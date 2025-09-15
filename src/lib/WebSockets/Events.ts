// SocketEventsOn.ts
import { Server, Socket } from "socket.io";
import Logger from "../Logger";

// <room>:<entity>:<action>
// pacientes : notification : new
const enventconfig = {
    rooms: ["gen", "psy", "pat", "mod", "adm"],
    actions: ["CREATE", "UPDATE", "DELETE", "CANCEL", "ACCEPT"]
}

type channel = {
    channel: string[],
    data: Record<string, string | number | boolean>;
}


export class Events {
    constructor(private io: Server, private socket: Socket) { }

    distpatch(data: any, channels: channel[]) {
        // channels.forEach(channel => {
        //     this.socket.emit(channel, data)
        //     console.log(channel);

        // })
    }

    adminEvent() {
        this.socket.on("adm:psy:create", (data: any) => {
            this.distpatch(data.data, data.redirect)
            Logger.info(data.data);
        });
    }

    init() {
        this.adminEvent();
    }
}
