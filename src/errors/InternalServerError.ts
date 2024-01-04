export default class InternalServerError extends Error {
  reasons: string[];

  constructor(reasons: string[]){
    super("INTERNAL_SERVER_ERROR");
    this.reasons = reasons;
  }
}
  