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
}
