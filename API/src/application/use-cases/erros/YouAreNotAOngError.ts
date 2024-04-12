export class YouAreNotAOngError extends Error {
    constructor() {
      super('Você não pode cadastrar um pet.')
    }
  }