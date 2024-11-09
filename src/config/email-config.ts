import Imap from 'imap';

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

function getConfigValue(value: string | undefined, name: string): string {
  if (!isDefined(value)) {
    throw new Error(`${name} is not defined in environment variables`);
  }
  return value;
}

export function getImapConfig(): Imap.Config {
  try {
    const imapConfig: Imap.Config = {
      user: getConfigValue(process.env.EMAIL_USER, 'EMAIL_USER'),
      password: getConfigValue(process.env.EMAIL_PASSWORD, 'EMAIL_PASSWORD'),
      host: getConfigValue(process.env.IMAP_HOST, 'IMAP_HOST'),
      port: 993,
      tls: true,
    };

    return imapConfig;
  } catch (error) {
    console.error('Error in IMAP configuration:', error);
    throw error;
  }
}