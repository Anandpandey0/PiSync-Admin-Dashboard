import { Router, Request, Response, NextFunction } from 'express';

import { getDevices, seedDevices, syncDevice } from '../services/deviceService';



const router = Router();

/**
 * GET /api/devices
 * List devices with pagination and optional syncStatus filter
 * Query params:
 *  - page (default 1)
 *  - limit (default 10)
 *  - status (optional): 'Success' | 'Pending' | 'Failed'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getDevices({
            page: req.query.page as string,
            limit: req.query.limit as string,
            status: req.query.status as string,
        });
        res.json(data);
    } catch (err) {
        next(err);
    }
});


/**
 * POST /api/devices/:id/sync
 * Trigger a dummy manual sync for the device with given id
 */
router.post('/:id/sync', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const device = await syncDevice(req.params.id);
        res.json({ message: 'Sync successful', device });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/errors/seed
 * Adds dummy data into Device collecion
 */

router.post('/seed', async (req: Request, res: Response) => {
    try {
      const count = parseInt(req.query.count as string) || 20;
      const devices = await seedDevices(count);
      res.status(201).json({ message: `Seeded ${devices.length} devices`, devices });
    } catch (error) {
      console.error('Error seeding devices:', error);
      res.status(500).json({ message: 'Failed to seed devices' });
    }
  });
  
export default router;
