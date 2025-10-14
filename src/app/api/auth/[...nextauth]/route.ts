// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// --- DUMMY USER STORE ---
// In a real application, this logic would connect to a database
// and securely hash the passwords (e.g., using bcrypt).
const DUMMY_USERS = [
  { id: "1", email: "user@example.com", password: "password123", name: "Explorer" },
];

export const authOptions: NextAuthOptions = {
  // 1. Configure Providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., "Sign in with...")
      name: "Credentials",
      // Credentials are used to generate a form on the sign-in page.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Look up the user by email
        const user = DUMMY_USERS.find(u => u.email === credentials?.email);

        if (user && user.password === credentials?.password) {
          // If the user is found and password is correct, return the user object
          // This object will be passed to the 'session' and 'jwt' callbacks.
          return { id: user.id, email: user.email, name: user.name };
        } else {
          // If credentials are bad, return null to signify failed authentication
          return null
        }
      }
    })
    // You could also add GoogleProvider, GitHubProvider, etc. here
  ],
  
  // 2. Session Strategy
  // We use JWT strategy for the App Router as it is stateless and scalable
  session: {
    strategy: "jwt",
  },

  // 3. Pages Configuration
  // Direct NextAuth.js to use your custom login page
  pages: {
    signIn: '/login', // Assumes you will create a 'src/app/login/page.tsx'
  },
  
  // 4. Secret
  secret: process.env.NEXTAUTH_SECRET,
  
  // 5. Callbacks (Optional but useful for JWT strategy)
  callbacks: {
    async jwt({ token, user }) {
      // 'user' is only present on the initial sign in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user ID to the session object
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
}

// Handler creation (standard App Router convention)
const handler = NextAuth(authOptions)

// Export both GET and POST handlers for all NextAuth requests
export { handler as GET, handler as POST }

// TypeScript module augmentation to add 'id' to the session user type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}