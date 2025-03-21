import { Types } from 'mongoose';

export interface JwtUserPayload {
  user: Types.ObjectId;
  email: string;
}
