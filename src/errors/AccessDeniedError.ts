export default class AccessDeniedError extends Error {
  reasons: string[];

  constructor(reasons: string[]){
    super("ACCESS_DENIED");
    this.reasons = reasons;
  }
}
