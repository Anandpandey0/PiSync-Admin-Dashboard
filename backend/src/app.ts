import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './utils/db';  // import after dotenv.config()

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import routes
import deviceRoutes from './routes/deviceRoutes';
import errorRoutes from './routes/errorRoutes';

async function startServer() {
  try {
    // Await DB connection before anything else
    await connectDB();

    // Register routes
    app.use('/api/devices', deviceRoutes);
    app.use('/api/errors', errorRoutes);

    // Root route
    app.get('/', (req: Request, res: Response) => {
      res.send('Server running...');
    });

    // 404 handler
    app.use((req: Request, res: Response) => {
      res.status(404).json({ message: 'Route not found' });
    });

    // Global error handler
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error(err);
      res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
      });
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to DB or start server:', error);
    process.exit(1);
  }
}

startServer();
