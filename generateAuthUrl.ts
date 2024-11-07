require('dotenv').config();  // Load environment variables from .env.local
const { google } = require('googleapis');

// Ensure environment variables are loaded
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URI) {
  throw new Error('Missing required environment variables.');
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const scopes = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send'
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',  // Ensures we get a refresh token
  scope: scopes,
});

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('GOOGLE_REDIRECT_URI:', process.env.GOOGLE_REDIRECT_URI);

console.log('Authorize this app by visiting this URL:', authorizationUrl);
