import { timeStamp } from 'console';
import mongoose, { Document, Schema } from 'mongoose';

export interface IDevice extends Document {
  name:String;
  lastSyncTime: Date | null;
  syncStatus: 'Success' | 'Pending' | 'Failed';
}

const DeviceSchema: Schema = new Schema({
  name:{type:String,required:true},
  lastSyncTime: { type: Date, default: null },
  syncStatus: {
    type: String,
    enum: ['Success', 'Pending', 'Failed'],
    default: 'Pending',
  },
}, { timestamps: true });

const Device = mongoose.model<IDevice>('Device', DeviceSchema);

export default Device;
