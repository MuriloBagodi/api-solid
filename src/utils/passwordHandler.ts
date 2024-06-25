import bcrypt from 'bcrypt'

export async function passwordHash(password: string): Promise<string> {
  const hashed = await bcrypt.hash(password, 6)
  return hashed
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const hashed = await bcrypt.compare(password, hashedPassword)

  return hashed
}
