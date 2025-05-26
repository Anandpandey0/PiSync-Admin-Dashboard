import { Router, Request, Response, NextFunction } from 'express';
import { getErrorLogs, seedErrorLogs } from '../services/errorService';




const router = Router();


/**
 * GET /api/errors/
 * Fetch recent error logs with pagination
 * Query params:
 *  - page (default 1)
 *  - limit (default 10)
 */

router.get('/', async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const filters = {
            deviceId: req.query.deviceId as string,
            startTime: req.query.startTime as string,
            endTime: req.query.endTime as string,
        };

        const result = await getErrorLogs(page, limit, filters);

        res.json(result);
    } catch (error) {
        console.error('Error fetching error logs:', error);
        res.status(500).json({ message: 'Failed to fetch error logs' });
    }
});

/**
 * POST /api/errors/seed
 * Adds dummy data into error logs collecion
 */

router.post('/seed', async (req: Request, res: Response) => {
    try {
      const count = parseInt(req.query.count as string) || 20;
      await seedErrorLogs(count);
      res.status(201).json({ message: `Seeded ${count} error logs` });
    } catch (error) {
      console.error('Error seeding error logs:', error);
      res.status(500).json({ message: 'Failed to seed error logs' });
    }
  });

export default router;