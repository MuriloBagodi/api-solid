import { ResourceNotFoundError } from './../../services/errors_handlers/resource-not-found'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../usersRepository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(userId: string) {
    const user = this.items.find((user) => user.id === userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }
    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
