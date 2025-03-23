import { ApiProperty } from '@nestjs/swagger';

export class BackendResponseDto {
  @ApiProperty({
    description: 'Message to the user',
    example: 'Operation successful',
  })
  message: string;
}
