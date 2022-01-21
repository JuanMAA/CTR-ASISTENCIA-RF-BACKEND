import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UsersTimeDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  day: Date;

  @ApiProperty()
  out: boolean;

  @ApiProperty()
  user_id: number;
}
