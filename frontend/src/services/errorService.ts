import axios from 'axios';
import { Types } from 'mongoose';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export type ErrorLog = {
  _id: Types.ObjectId;
  device: Types.ObjectId;  // or use a populated type if backend populates 'device'
  message: string;
  timestamp: Date;
};

export type ApiResponse = {
  errors: ErrorLog[];
  total: number;
  limit: number;
  page: number;
};

export type ErrorLogFilters = {
  deviceId?: string;
  startTime?: string; // ISO string expected
  endTime?: string;
};

/**
 * Fetches error logs with pagination and optional filters.
 */
export async function fetchErrors(
  page = 1,
  limit = 10,
  filters: ErrorLogFilters = {}
): Promise<ApiResponse> {
  const params: Record<string, any> = { page, limit };

  if (filters.deviceId) params.deviceId = filters.deviceId;
  if (filters.startTime) params.startTime = filters.startTime;
  if (filters.endTime) params.endTime = filters.endTime;

  const { data } = await axios.get<ApiResponse>(`${API_BASE}/api/errors`, {
    params,
  });

  return data;
}

//Async service function to Add dummy data to the Eroor Logs table- Hits Backend
export async function addDummyErrorData(): Promise<void> {
  await axios.post(`${API_BASE}/api/errors/seed`);
}
