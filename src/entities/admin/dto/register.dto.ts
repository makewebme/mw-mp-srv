import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { E_AdminRole } from '@entities/role/role.enum'


export default class RegisterDto {
  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsEnum(E_AdminRole)
  role: E_AdminRole

  @IsNotEmpty()
  @IsString()
  nameFirst: string

  @IsNotEmpty()
  @IsString()
  nameLast: string
}
