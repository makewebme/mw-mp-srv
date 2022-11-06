import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import bcrypt from 'bcrypt'

import { AuthService } from '@services/auth/auth.service'
import { Admin } from './admin.entity'
import RegisterDto from './dto/register.dto'


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async getAdminDataById(adminId: number): Promise<any> {
    return await this.adminRepository.findOne({
      where: {
        id: adminId,
      }
    })
  }

  async getAllAdmins(): Promise<Admin[]> {
    return this.adminRepository.find()
  }

  async getAdminByLoginOrEmail(loginOrEmail: string) {
    return await this.adminRepository.findOne({
      where: [
        { login: loginOrEmail },
        { email: loginOrEmail },
      ]
    })
  }

  async createAdmin(body: RegisterDto): Promise<Admin> {
    body.password = await bcrypt.hash(body.password, 1)
    const newAdmin = this.adminRepository.create(body)
    return await this.adminRepository.save(newAdmin)
  }

  async deleteAdmin(id: number) {
    return this.adminRepository.softDelete(id)
  }
}
