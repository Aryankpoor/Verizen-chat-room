import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Here you should implement your own logic to verify the credentials
        // For this example, we're just checking if the email and password are provided
        if (credentials?.username && credentials?.password) {
          return { id: "1", name: credentials.username, email: credentials.username }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }