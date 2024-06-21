export class InvalidCredentialError extends Error {
  constructor() {
    super('Email or password are incorrect !')
  }
}
