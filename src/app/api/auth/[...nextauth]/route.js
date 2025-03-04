import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const authOptions = {
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find user in the database
        const user = await prisma.User.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Validate password
        const passwordOk = await bcrypt.compare(credentials.password, user.password);
        if (!passwordOk) {
          throw new Error("Incorrect password");
        }

        console.log("Log in Successful!"); 

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT instead of database sessions
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } });
        session.user.id = dbUser?.id;
      }
      return session;
    },
  },
};

export async function isAdmin() {
  const session = await getServerSession(authOptions); 
  const userEmail = session?.user?.email; 

  if (!userEmail) {
    return false; 
  }

  const userInformation = await prisma.UserInfo.findUnique({
                            where: { email:userEmail }
                          }); 
  if (!userInformation) {
    return false; 
  }
  return userInformation.admin; 
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };