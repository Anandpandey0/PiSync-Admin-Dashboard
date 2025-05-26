import Device from '../models/Device';
import ErrorLog from '../models/ErrorLog';

interface ErrorLogFilters {
  deviceId?: string;
  startTime?: string;
  endTime?: string;
}


//Function to get the error logs with pagination
export async function getErrorLogs(
  page: number,
  limit: number,
  filters: ErrorLogFilters
) {
  const query: any = {};

  if (filters.deviceId) {
    query.device = filters.deviceId;
  }

  if (filters.startTime || filters.endTime) {
    query.createdAt = {};
    if (filters.startTime) {
      query.createdAt.$gte = new Date(filters.startTime);
    }
    if (filters.endTime) {
      query.createdAt.$lte = new Date(filters.endTime);
    }
  }

  const skip = (page - 1) * limit;

  const errors = await ErrorLog.find(query)
    .populate('device', 'name')  
    .sort({ createdAt: -1 })     // Sort by creation time descending
    .skip(skip)
    .limit(limit);

  const total = await ErrorLog.countDocuments(query);

  return {
    page,
    limit,
    total,
    errors,
  };
}


const errorMessages = [
  'Connection timeout',
  'Sync failed',
  'Unexpected device response',
  'Low battery',
  'Sensor malfunction',
];

// Adds random error logs linked to random devices
export async function seedErrorLogs(count: number): Promise<void> {
  // Get all device IDs from DB
  const devices = await Device.find({}, '_id').lean();
  if (devices.length === 0) {
    throw new Error('No devices found to seed error logs');
  }

  const logsToInsert = [];
  for (let i = 0; i < count; i++) {
    // Pick a random device ID
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];
    // Pick a random error message
    const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
   

    logsToInsert.push({
      device: randomDevice._id,
      message: randomMessage,
    });
  }

  await ErrorLog.insertMany(logsToInsert);
}