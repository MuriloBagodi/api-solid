export class TimeHasExceedLimit extends Error {
  constructor() {
    super('Time to validate the check-in has exceed')
  }
}
