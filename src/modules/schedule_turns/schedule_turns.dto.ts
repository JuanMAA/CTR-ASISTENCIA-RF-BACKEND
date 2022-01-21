import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ScheduleTurnsDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  schedule_id: number;

  @ApiProperty()
  turn_id: number;

  @ApiProperty()
  week: number;

  @ApiProperty()
  year: number;
}
