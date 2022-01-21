import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DaysBlockedDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  start_datetime: Date;

  @ApiProperty()
  end_datetime: Date;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  block_list: boolean;
}
