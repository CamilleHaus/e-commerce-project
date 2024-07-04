import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers




























// export const authOptions: AuthOptions = {
//     adapter: PrismaAdapter(prisma) as any,
//     providers: [
//       CredentialsProvider({
//         name: 'credentials',
//         credentials: {
//           email: { label: 'email', type: 'text' },
//           password: { label: 'password', type: 'password' }
//         },
//         async authorize(credentials) {
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error('Invalid credentials');
//           }

//           // Verificando se as "credentials" são válidas para login
  
//           const user = await prisma.user.findUnique({
//             where: {
//               email: credentials.email
//             }
//           });

//           // Recuperando o usuário do DB
  
//           if (!user || !user?.hashedPassword) {
//             throw new Error('Invalid credentials');
//           }

//           // Verificando se o usuário e a passaword (hashed) batem com o DB
  
//           const isCorrectPassword = await bcrypt.compare(
//             credentials.password,
//             user.hashedPassword
//           );
  
//           if (!isCorrectPassword) {
//             throw new Error('Invalid credentials');
//           }

//           // Comparando se a senha que o usuário forneceu bate com a hasheada que recuperamos do DB
  
//           return user;
//         }
//       })
//     ],
    
//     pages: {
//       signIn: "/sign-in",
//     },
    
//     session: {
//       strategy: "jwt",
//     },
    
//     secret: process.env.NEXTAUTH_SECRET,
//   };
  
//   const handler = NextAuth(authOptions);
  
//   export { handler as GET, handler as POST };
