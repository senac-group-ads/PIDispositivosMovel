export class UnexistPet extends Error {
    constructor() {
      super('Unexist pet.')
    }
  }