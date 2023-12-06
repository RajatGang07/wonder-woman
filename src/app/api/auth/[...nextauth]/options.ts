import type { NextAuthOptions } from 'next-auth'
// import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        FacebookProvider({
            clientId: '1361038827821051' as string,
            clientSecret: 'cad14b5e85a97174de6eedb7d1912589' as string,
        }),
    ],
}