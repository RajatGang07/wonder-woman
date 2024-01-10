// import type { NextAuthOptions } from 'next-auth';
import FacebookProvider from "next-auth/providers/facebook";

export const options = {
  providers: [
    FacebookProvider({
      idToken: true,
      clientId: '1361038827821051',
      clientSecret: 'cad14b5e85a97174de6eedb7d1912589',
      scope: 'email,ads_read,public_profile,read_insights,pages_read_engagement,business_management',
    }),

  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
    // async redirect({ url, baseUrl }: any) {
    //   return baseUrl
    // },
  },
};
