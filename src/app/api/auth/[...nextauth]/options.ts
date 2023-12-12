import type { NextAuthOptions } from 'next-auth'
// import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        // FacebookProvider({
        //     clientId: '1361038827821051' as string,
        //     clientSecret: 'cad14b5e85a97174de6eedb7d1912589' as string,
            
        // }),
        FacebookProvider({
            idToken: true,
            clientId: '1361038827821051' as string,
            clientSecret: 'cad14b5e85a97174de6eedb7d1912589' as string,
            authorization: {
              url: 'https://www.facebook.com/v11.0/dialog/oauth',
              params: {
                client_id: '1361038827821051',
                scope: 'openid email',
                response_type: 'code',
              },
            },
            token: {
              url: 'https://graph.facebook.com/oauth/access_token',
              async request(context) {
                console.log('context', context)
                const url =
                  `https://graph.facebook.com/oauth/access_token` +
                  `?code=${context.params.code}` +
                  `&client_id=${context.provider.clientId}` +
                  `&redirect_uri=${context.provider.callbackUrl}` +
                  `&client_secret=${context.provider.clientSecret}`;
                const response = await fetch(url);
                const tokens = await response.json();
                console.log('tokens', tokens)
                
                // localStorage.setItem('token', JSON.stringify(tokens))
                return { tokens };
              },
            },
          }),
    ],

    callbacks: {
        async jwt({ token, account, profile }: any) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
              token.accessToken = account.access_token
            }
            return token
          },
        async session({ session, token, user }: any) {
          // Send properties to the client, like an access_token and user id from a provider.
          session.accessToken = token.accessToken
          
          return session
        }
      }
}


