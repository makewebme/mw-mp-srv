import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { genSalt, hash } from 'bcrypt'

import { User } from './user.entity'
import { UpdateUserDto } from './dto/updateUser.dto'
import { RegisterUserDto } from './dto/registerUser.dto'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  availableFields = [
    'login',
    'email',
    'phone',
    'nameFirst',
    'nameLast',
    'birthDate',
    'gender',
  ]

  // Filter body's fileds from available fields list
  private filterFields(body: { [k: string]: any }) {
    const filteredBody: { [k: string]: any } = {}

    Object.keys(body).filter((k) => {
      if (this.availableFields.includes(k)) {
        filteredBody[k] = body[k]
      }
    })

    return filteredBody
  }

  async createUser(userData: RegisterUserDto) {
    const salt = await genSalt(10)

    const hashedPassword = await hash(userData.password, salt)

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    })

    return await this.userRepository.save(newUser)
  }

  async getAllUsers() {
    return await this.userRepository.find({
      select: this.availableFields as any
    })
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      select: this.availableFields as any
    })
  }

  async getUserByLoginOrEmail(loginOrEmail: string) {
    return await this.userRepository.findOne({
      where: [
        { login: loginOrEmail },
        { email: loginOrEmail },
      ]
    })
  }

  async updateUserData(id: number, body: UpdateUserDto) {
    return await this.userRepository.update(
      { id },
      this.filterFields(body)
    )
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id)
  }
}
