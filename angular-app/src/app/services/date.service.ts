export abstract class DateService {

  /**
   * Formats a given date to the format dd/MM/yyyy
   * @param date The date
   */
  static format(date: Date): string {
    return [('0' + date.getDate()).slice(-2), ('0' + (date.getMonth() + 1)).slice(-2), date.getFullYear()].join('/');
  }

  /**
   * Calculates the number of years from a provided date
   * @param date The date
   */
  static calculateAge(date: any): number {
    // Year of 365.25 days (because of leap years)
    const yearInMs = 3.15576e+10;
    const birthday = date ? date.toDate() : new Date();

    return ((Date.now() - birthday) / (yearInMs));
  }
}
