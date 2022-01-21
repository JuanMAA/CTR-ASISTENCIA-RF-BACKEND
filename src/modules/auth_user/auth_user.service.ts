/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from './auth_user.entity';
import { UsuariosDto } from './auth_user.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly auth_userRepository: Repository<AuthUser>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsuarios(): Promise<AuthUser[]> {
    const query = this.auth_userRepository
      .createQueryBuilder('auth_user')
      .select('auth_user')
      .orderBy('auth_user.id', 'ASC');
    const auth_user = query.getMany();
    return auth_user;
  }

  async getUsuarioById(id): Promise<any> {
    const query = this.auth_userRepository
      .createQueryBuilder('auth_user')
      .select('auth_user')
      .where(`auth_user.id = :id`, { id: id });
    try {
      const usuario = await query.getOne();
      return usuario;
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }

  async deleteUsuarioById(id_usuario: number): Promise<any> {
    let usuario_deleted = new UsuariosDto();
    usuario_deleted = await this.findUsuarioByIdOrError(id_usuario);

    try {
      usuario_deleted = await this.auth_userRepository.save(usuario_deleted);
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }

  async findUsuarioByIdOrError(id_usuario: number): Promise<UsuariosDto> {
    const usuario = await this.findUsuarioById(id_usuario);
    if (usuario === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Usuario no encontrado.',
        },
        404,
      );
    }
    return usuario;
  }

  async findUsuarioById(id: number): Promise<any> {
    return await this.auth_userRepository.findOne({
      id,
    });
  }

  async createUsuario(newUsuario: any) {
    newUsuario.email = newUsuario.email.toLowerCase();

    if (newUsuario === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Por favor incluir información de usuario requerida.',
        },
        400,
      );
    }

    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const password = newUsuario.contrasena_uno;
    const hash = bcrypt.hashSync(password, saltRounds);
    newUsuario.contrasena = hash;
    newUsuario.status = 'ACTIVE';

    try {
      const usuario = await this.auth_userRepository.save(newUsuario);
      newUsuario.id_usuario = usuario.id_usuario;
      return usuario;
    } catch (ex) {
      if (
        ex.message.includes('duplicate key value violates unique') ||
        ex.message.includes('llave duplicada')
      ) {
        if (ex.detail.includes('(usuario)')) {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: 'El usuario ya esta registrado.',
            },
            500,
          );
        } else if (ex.detail.includes('(email)')) {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: 'El email ya esta registrado por otro usuario.',
            },
            500,
          );
        }
      }
    }
  }

  async findByIdSwitch(id: number): Promise<any> {
    return await this.auth_userRepository.findOne({
      id,
    });
  }

  async updateUsuario(usuario: any) {
    if (usuario === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Por favor incluir información de usuario requerida.',
        },
        400,
      );
    }
    let usuario_edited = new UsuariosDto();
    usuario_edited = await this.findByIdSwitch(usuario.id_usuario);

    if (usuario.contrasena_uno !== usuario.contrasena_rep) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Las contraseñas ingresadas no coinciden.',
        },
        400,
      );
    }

    try {
      usuario_edited = await this.auth_userRepository.save(usuario_edited);
    } catch (ex) {
      if (
        ex.message.includes('duplicate key value violates unique') ||
        ex.message.includes('llave duplicada')
      ) {
        if (ex.detail.includes('(usuario)')) {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: 'El usuario ya esta registrado.',
            },
            500,
          );
        } else if (ex.detail.includes('(email)')) {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: 'El email ya esta registrado por otro usuario.',
            },
            500,
          );
        }
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
    return usuario_edited;
  }

  async validaLoginAuth(usuarioDto: any, refreshToken?: boolean): Promise<any> {
    const query: any = this.auth_userRepository
      .createQueryBuilder('auth_user')
      .select('auth_user')
      .where(`auth_user.email = :email`, {
        email: usuarioDto.email,
      });

    let usuario: any = null;

    try {
      usuario = await query.getOne();
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }

    if (!usuario) {
      throw new UnauthorizedException({
        error: 'Credenciales no válidas',
      });
    }

    if (usuario.status === 'DESACTIVE') {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'El usuario se encuentra deshabilitado!',
        },
        500,
      );
    }

    const bcrypt = require('bcrypt');

    const validation = bcrypt.compareSync(
      usuarioDto.contrasena,
      usuario.contrasena,
    );

    if (!validation && !refreshToken) {
      throw new UnauthorizedException({
        error: 'Credenciales no válidas',
      });
    }

    const payload: any = {
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      ap_paterno: usuario.ap_paterno,
      ap_materno: usuario.ap_materno,
      tipo_usuario: usuario.tipo_usuario,
      //email: usuario.email,
      //roles: rolesUsuario,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return token;
  }
}
