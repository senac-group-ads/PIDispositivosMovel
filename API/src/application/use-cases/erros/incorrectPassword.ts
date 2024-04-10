export class IncorrectUserPassword extends Error {
    constructor() {
      super('Incorrect email or password.')
    }
  }
