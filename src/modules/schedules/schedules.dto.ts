import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SchedulesDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: number;

  @ApiProperty()
  description: number;
}
