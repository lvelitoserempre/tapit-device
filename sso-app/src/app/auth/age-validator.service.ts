export default class AgeValidatorService {
  private constructor() {
  }

  static olderThan(date: Date, years: number) {
    const time = Date.now() - (31536000000 * years);

    return date.getTime() < time;
  }
}
