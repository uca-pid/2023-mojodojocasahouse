export default class SessionExpiredError extends Error {
  reasons: string[];

  constructor(reasons: string[]){
    super("SESSION_EXPIRED");
    this.reasons = reasons;
  }
}
