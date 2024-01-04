export default class ExistingEmailError extends Error {
    reasons: string[];
  
    constructor(reasons: string[]){
      super("EMAIL_ALREADY_EXISTING");
      this.reasons = reasons;
    }
}
  