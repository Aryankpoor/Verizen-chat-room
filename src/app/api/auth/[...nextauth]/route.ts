import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials');
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send'
        }
      }
    }),
  ],
  // Add debug logs
  debug: true,
})

export { handler as GET, handler as POST }