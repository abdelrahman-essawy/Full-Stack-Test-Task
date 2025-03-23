import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, HttpCode, Logger, UseGuards } from '@nestjs/common';
import { GetProfileResDto } from './dtos';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtUserAuthGuard } from '../auth/guards/jwt-user-auth.guard';
import { type UserDocument } from './user.schema';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(JwtUserAuthGuard)
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  @HttpCode(200)
  @ApiOkResponse({
    type: GetProfileResDto,
  })
  @Get('me')
  @ApiOperation({
    summary: 'Get current user profile',
  })
  async getCurrentUser(
    @GetUser() user: UserDocument
  ): Promise<GetProfileResDto> {
    this.logger.debug(`User ${user.email} requested their profile`);
    return {
      message: 'Profile retrieved successfully',
      user,
    };
  }
}
