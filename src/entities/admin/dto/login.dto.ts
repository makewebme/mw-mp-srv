import { IsNotEmpty, IsString } from 'class-validator'


export default class LoginDto {
  @IsNotEmpty()
  @IsString()
  loginOrEmail: string

  @IsNotEmpty()
  @IsString()
  password: string
}
