export default class DataValidationError extends Error {
  reasons: string[];

  constructor(reasons: string[]){
    super("VALIDATION_FAILED");
    this.reasons = reasons;
  }
}
