import type { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const options: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      authorization: {
        url: "https://www.facebook.com/v11.0/dialog/oauth",
        params: {
          client_id: process.env.FACEBOOK_CLIENT_ID,
          scope: "openid email",
          response_type: "code",
        },
      },
      token: {
        url: "https://graph.facebook.com/oauth/access_token",
        async request(context) {
          // console.log("context >>", context);
          const url =
            `https://graph.facebook.com/oauth/access_token` +
            `?code=${context.params.code}` +
            `&client_id=${context.provider.clientId}` +
            `&redirect_uri=${context.provider.callbackUrl}` +
            `&client_secret=${context.provider.clientSecret}`;
          const response = await fetch(url);
          const tokens = await response.json();
          return { tokens };
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl
    },
  },
};
