export default class ErrorWithStatus extends Error {
  public status: number;

  constructor(status: number) {
    super();
    this.status = status;
  }
}