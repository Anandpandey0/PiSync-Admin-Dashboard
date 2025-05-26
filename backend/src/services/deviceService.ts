import { lstatSync } from "fs";
import Device,{IDevice} from "../models/Device";
interface GetDevicesOptions {
    page?: string | null;
    limit?: string | null;
    status?: string | null;
  }

//Async function to get all the the device - Has filters , sort and limit
export async function getDevices({ page, limit, status }: GetDevicesOptions) {
  try {
    const pageNumber = parseInt(page || '1', 10);
    const limitNumber = parseInt(limit || '10', 10);

    const filter = status ? { syncStatus: status } : {};

    const total = await Device.countDocuments(filter);

    if (total === 0) {
      return {
        page: pageNumber,
        limit: limitNumber,
        total: 0,
        devices: [],
        message: 'No devices found',
      };
    }

    const devices = await Device.find(filter)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .sort({ lstatSync: -1 });

    return {
      page: pageNumber,
      limit: limitNumber,
      total,
      devices,
    };
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw new Error('Failed to fetch devices');
  }
}

//Async function to sync a device with a given deviceId
export async function syncDevice(deviceId:string):Promise<IDevice>{
    const device = await Device.findById(deviceId);
    if(!device){
        const error = new Error('Device with the given Id not found');
        (error as any).status = 404;
        throw error;
    }
    device.lastSyncTime = new Date();
    device.syncStatus = 'Success';
    await device.save();
    return device
}


const statuses: ('Success' | 'Pending' | 'Failed')[] = ['Success', 'Pending', 'Failed'];



//ADD dummy data 
export async function seedDevices(count: number): Promise<IDevice[]> {
  const dummyDevices = [];

  for (let i = 0; i < count; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    dummyDevices.push({
      name: `Device-${Date.now()}-${i}`,
      lastSyncTime: null, // you can also randomize this if you want
      syncStatus: randomStatus,
    });
  }

  const createdDevices = await Device.insertMany(dummyDevices);
  return createdDevices;
}
