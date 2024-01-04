export default class BadResponseError extends Error {
  reasons: string[];

  constructor(reasons?: string[]){
    super("BAD_RESPONSE");
    this.reasons = reasons?? [];
  }
}
  