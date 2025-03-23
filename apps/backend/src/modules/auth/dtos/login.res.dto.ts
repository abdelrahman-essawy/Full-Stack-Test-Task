import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.schema';
import { BackendResponseDto } from '../../../common/dto/backend-response.dto';

export class LoginResDto extends BackendResponseDto {
  @ApiProperty({
    description: 'Access token for the user',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User details',
    type: User,
  })
  user: User;

  constructor(message: string, accessToken: string, user: User) {
    super();
    this.message = message;
    this.accessToken = accessToken;
    delete user.password;
    this.user = user;
  }
}
