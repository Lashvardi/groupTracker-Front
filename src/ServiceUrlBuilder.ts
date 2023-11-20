export class ServiceUrlBuilder {
  private static DOMAIN_URL = 'https://localhost:7273/';
  private static API_POSTFIX = 'api/';

  public static buildUrl(url: string) {
    return this.DOMAIN_URL + this.API_POSTFIX + url;
  }

  public static buildRootUrl(url: string) {
    return this.DOMAIN_URL + url;
  }

  public static buildLoginUrl(email: string, password: string): string {
    const baseUrl = ServiceUrlBuilder.buildRootUrl('Lecturer/Login');
    const encodedEmail = encodeURIComponent(email);
    const encodedPassword = encodeURIComponent(password);

    return `${baseUrl}?email=${encodedEmail}&password=${encodedPassword}`;
  }

  public static buildVerifyAccountUrl(email?: string, code?: string): string {
    const baseUrl = ServiceUrlBuilder.buildRootUrl('Lecturer/verify');

    const encodedEmail = encodeURIComponent(email || '');
    const encodedCode = encodeURIComponent(code || '');

    return `${baseUrl}?email=${encodedEmail}&token=${encodedCode}`;
  }

  public static buildGetSessionsForLecturerUrl(lecturerId: number): string {
    const baseUrl = ServiceUrlBuilder.buildRootUrl(
      'Group/get-sessions-for-lecturer'
    );
    const encodedLecturerId = encodeURIComponent(lecturerId.toString());

    return `${baseUrl}?lecturerId=${encodedLecturerId}`;
  }
  
}
