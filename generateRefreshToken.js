const { google } = require('googleapis');
const readline = require('readline');

// Load client secrets from environment variables
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Scopes needed to access Gmail API
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];

// Generate the authorization URL
const url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Important to get a refresh token
  scope: SCOPES,
});

console.log('Authorize this app by visiting this URL:', url);

// Create an interface to read the authorization code from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', (code) => {
  rl.close();
  // Get the token using the code provided by the user
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    
    // Log the refresh token to the console
    console.log('Your refresh token is:', token.refresh_token);
  });
});
