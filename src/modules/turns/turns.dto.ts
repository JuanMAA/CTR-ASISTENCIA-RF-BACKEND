import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TurnsDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: number;

  @ApiProperty()
  day: number;

  @ApiProperty()
  start: string;

  @ApiProperty()
  end: string;

  @ApiProperty()
  max_end: number;

  @ApiProperty()
  max_start: number;

  @ApiProperty()
  min_start: number;

  @ApiProperty()
  min_end: number;
}
