import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UsuariosDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  schedule_id: number;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  last_login: Date;

  @ApiProperty()
  date_joined: Date;

  @ApiProperty()
  is_superuser: boolean;

  @ApiProperty()
  username: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  is_staff: boolean;

  @ApiProperty()
  is_active: boolean;
}
