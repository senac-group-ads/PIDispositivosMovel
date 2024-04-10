export class UnexistUser extends Error {
    constructor() {
      super('Unexist user.')
    }
  }