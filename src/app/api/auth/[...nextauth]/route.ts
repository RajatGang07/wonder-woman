import NextAuth from 'next-auth'
import { options } from './options'

const handler = NextAuth(options)

// console.log('options:', options);

export { handler as GET, handler as POST }