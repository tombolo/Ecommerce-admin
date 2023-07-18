import NextAuth from 'next-auth';
import { getServerSession } from 'next-auth/server';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn(user, account, profile) {
      return true; // Allow any account to sign in
    },
    session({ session, token, user }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
