import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../usersRepository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'any_id',
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

// async findByEmail() {
//   return null
// },

// async create(data) {
//
// },
