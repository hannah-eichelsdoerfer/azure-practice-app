import AzureADProvider from 'next-auth/providers/azure-ad';
import NextAuth, { AuthOptions, getServerSession } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { clientPromise } from '@/services/db';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { getUser } from '@/middleware';

export const authOptions: AuthOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: { params: { scope: 'openid profile user.Read email' } },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    // signIn: '/signin',
    newUser: '/register',
  },
  adapter: MongoDBAdapter(clientPromise),
  //   adapter: MongoDBAdapter(
  //     new Promise((resolve) => resolve(mongoose.connection.getClient()))
  //  ), // when using this, call connectMongoDB() in [...nextauth].ts top
  callbacks: {
    async jwt({ token, account, profile, trigger, user, session }) {
      if (trigger === 'signUp') {
        console.log('🎉 signing-up');
        // Your logic for new user sign-up here
      }
      if (trigger === 'update' && session?.name) {
        console.log('🎉 updating');
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session;
      }
      const userData = await getUser();

      if (userData) {
        token.registrationComplete = userData.registrationComplete;
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          registrationComplete: token.registrationComplete,
        },
      };
    },

    // async session({ session }) {
    //   const email = session?.user?.email as string;

    //   try {
    //     const data = await User.findOne({ email: User.email });

    //     const newSession = {
    //       ...session,
    //       user: {
    //         ...session.user,
    //         ...data?.user,
    //       },
    //     };

    //     return newSession;
    //   } catch (error: any) {
    //     console.error('Error retrieving user data: ', error.message);
    //     return session;
    //   }
    // },
    //   async redirect({ url, baseUrl }) {
    //     const session = getServerSession();
    //     const userExists = await User.findOne({
    //       email: 'hannaheichelsdoerfer@gmail.com',
    //     });

    //     if (!userExists) {
    //       return '/register';
    //     }
    //     return baseUrl;
    //   },
    // jwt: {
    //   encode: ({ secret, token }) => {
    //     const encodedToken = jsonwebtoken.sign(
    //       {
    //         ...token,
    //         iss: "grafbase",
    //         exp: Math.floor(Date.now() / 1000) + 60 * 60,
    //       },
    //       secret
    //     );

    //     return encodedToken;
    //   },
    //   decode: async ({ secret, token }) => {
    //     const decodedToken = jsonwebtoken.verify(token!, secret);
    //     return decodedToken as JWT;
    //   },
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
