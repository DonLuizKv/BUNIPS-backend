import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import { Database } from "./lib/Database";
import Logger from "./lib/Logger";
import patientRoutes from "./routes/patients.routes"
import { Sockets } from "./lib/Sockets";

// env
dotenv.config();
const PORT = process.env.PORT || 5000;
const ORIGINS = process.env.ORIGINS?.split(",") || [];

// Server
const app = express();
const server = http.createServer(app);
// const DBConnection = Database.getInstance();
const SocketServer = new Sockets(server);

// configs
const CorsOptions = {
    origin: ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

// WebSocket & Database
// DBConnection.initialize();
SocketServer.initialize();

// Middleware
app.use(cors(CorsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(Logger.httpMiddleware())

// Routes
// app.use("/auth", authRoutes);
app.use("/patient", patientRoutes);

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`, { prefix: "\n" })
});