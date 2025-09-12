import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import { Print } from "./utils/General";
import { Database } from "./lib/Database/db";

// env
dotenv.config();
const PORT = process.env.PORT || 5000;
const ORIGINS = process.env.ORIGINS?.split(",") || [];

// Server
const app = express();
const server = http.createServer(app);
const database = new Database();

// configs
const CorsOptions = {
    origin: ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

// WebSocket & Database
database.initialize();

// Middleware
app.use(cors(CorsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
// app.use("/auth", authRoutes);
// app.use("/user", Authenticate, userRoutes);

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
    Print(`\n- Server is running on port ${PORT}`, { color: "cyan", bold: true, italic: true });
});