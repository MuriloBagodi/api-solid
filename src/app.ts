import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const app = fastify()
