import { FastifyReply, FastifyRequest } from 'fastify'
import { string, z } from 'zod'
import { InvalidCredentialError } from '@/services/errors_handlers/invalid-credential-error'
import { makeAuthtenticateUseCase } from '@/services/factories/make-authenticate-use-case'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: string().email(),
    password: string().min(8),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthtenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await res.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await res.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )
    res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }
}
