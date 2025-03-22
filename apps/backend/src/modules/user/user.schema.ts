import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '643405452324db8c464c0584',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'john@example.com',
  })
  @Prop({
    required: true,
  })
  email: string;

  @ApiHideProperty()
  @Prop()
  password?: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @Prop()
  name?: string;

  @ApiProperty({
    description: 'Date of creation',
  })
  @Prop()
  createdAt?: Date;

  @ApiProperty({
    description: 'Date of last update',
  })
  @Prop()
  updatedAt?: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  static toResponse(dto: Partial<User>) {
    const { _id, email, name, createdAt, updatedAt } = dto;
    return new User({ _id, email, name, createdAt, updatedAt });
  }
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });
