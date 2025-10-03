import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apartmentsRouter from './routes/apartment.route';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';


const app = express();
app.use(helmet());
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/uploads", (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    next();
});

app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);
//apartments route
app.use('/api/v1/apartments', apartmentsRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`,
    });
});

// Error handler
app.use(errorHandler);
const PORT = process.env.PORT || 5000

// Initialize database and start server
const startServer = async () => {
    try {

        connectDB()
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);

        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception thrown:', error);
    process.exit(1);
});
startServer();

