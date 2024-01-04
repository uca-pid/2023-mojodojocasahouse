export default class NetworkError extends Error {
  reasons: string[];

  constructor(reasons?: string[]){
    super("NETWORK_ERROR");
    this.reasons = reasons?? [];
  }
}
