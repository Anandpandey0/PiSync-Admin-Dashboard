import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IErrorLog extends Document {
  device: Types.ObjectId;  // reference to Device
  message: string;
  timestamp: Date;
}

const ErrorLogSchema: Schema = new Schema({
  device: { type: Schema.Types.ObjectId, ref: 'Device', required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const ErrorLog = mongoose.model<IErrorLog>('ErrorLog', ErrorLogSchema);

export default ErrorLog;
