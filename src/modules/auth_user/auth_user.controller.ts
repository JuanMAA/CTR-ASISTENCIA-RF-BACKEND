import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './auth_user.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async getUsuarios(): Promise<any> {
    return this.usuariosService.getUsuarios();
  }

  @Post('signin')
  async signIn(@Body() body): Promise<any> {
    return this.usuariosService.validaLoginAuth(body);
  }

  @Get(':id_usuario')
  async getUsuarioById(@Param('id_usuario') id_usuario): Promise<any> {
    return this.usuariosService.getUsuarioById(id_usuario);
  }

  @Delete(':id_usuario')
  async deleteUsuarioById(@Param('id_usuario') id_usuario): Promise<any> {
    return this.usuariosService.deleteUsuarioById(id_usuario);
  }

  @Post()
  async createUsuario(@Body() app: any): Promise<any> {
    return await this.usuariosService.createUsuario(app);
  }

  @Put()
  async updateUsuario(@Body() app: any): Promise<any> {
    return await this.usuariosService.updateUsuario(app);
  }
}
