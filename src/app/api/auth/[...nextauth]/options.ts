import type { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const options: NextAuthOptions = {
  providers: [
    FacebookProvider({
      idToken: true,
      clientId: "1361038827821051" as string,
      clientSecret: "cad14b5e85a97174de6eedb7d1912589" as string,
      authorization: {
        url: "https://www.facebook.com/v11.0/dialog/oauth",
        params: {
          client_id: "1361038827821051",
          scope: "openid,email,read_insights,ads_management,ads_read,business_management,public_profile",
          response_type: "code",
        },
      },
      // token: {
      //   url: "https://graph.facebook.com/oauth/access_token",
      //   async request(context) {
      //     console.log("context >>", context);
      //     const url =
      //       `https://graph.facebook.com/oauth/access_token` +
      //       `?code=${context.params.code}` +
      //       `&client_id=${context.provider.clientId}` +
      //       `&redirect_uri=${context.provider.callbackUrl}` +
      //       `&client_secret=${context.provider.clientSecret}`;
      //     const response = await fetch(url);
      //     const tokens = await response.json();
      //     return { tokens };
      //   },
      // },
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
    // async redirect({ url, baseUrl }: any) {
    //   return baseUrl
    // },
  },
};

https://www.facebook.com/login/reauth.php?app_id=1361038827821051&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv11.0%2Fdialog%2Foauth%3Fclient_id%3D1361038827821051%26scope%3Dopenid%252Cemail%252Cread_insights%252Cads_management%252Cads_read%252Cbusiness_management%252Cpublic_profile%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fforesee.beigebananas.com%252Fapi%252Fauth%252Fcallback%252Ffacebook%26state%3DKj4H3J95j4LxhH9kqd8-5K44jWDpm3KY7SRXzcarRUc%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3Df35b433d-9b2a-4ee3-b2f2-f598ffc81fe7%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fforesee.beigebananas.com%2Fapi%2Fauth%2Fcallback%2Ffacebook%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3DKj4H3J95j4LxhH9kqd8-5K44jWDpm3KY7SRXzcarRUc%23_%3D_&display=page&locale=en_GB&pl_dbl=0