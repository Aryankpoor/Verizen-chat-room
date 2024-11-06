const {google} = require('googleapis');
import { NextResponse } from 'next/server';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export async function GET() {
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
    });

    const emails = await Promise.all(
      response.data.messages.map(async (message: { id: any; }) => {
        const email = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        });

        const subject = email.data.payload.headers.find(
          (header: { name: string; }) => header.name === 'Subject'
        ).value;
        const from = email.data.payload.headers.find(
          (header: { name: string; }) => header.name === 'From'
        ).value;

        return {
          id: email.data.id,
          subject,
          from,
          snippet: email.data.snippet,
        };
      })
    );

    return NextResponse.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}