import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prismaDB"
import bcrypt from "bcrypt";


export const { auth, handlers, signIn, signOut} = NextAuth({
    providers: [
      Credentials({
    credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
    },
    authorize: async(credentials: any) => {

        console.log(credentials, "##### credentials")

        try {
            const user = await prisma.user.findUnique({
            where: { email: credentials.email  as string}
        });

        console.log(user, "#####use")

        // if( credentials.email !== user?.email || credentials.password !== user?.hashedPassword) {
        //     throw new Error("Invalid credentials");
        // }

        const compare = bcrypt.compare(
            credentials.password,
            user?.hashedPassword as string
        )

        if (!compare) {
            throw new Error("Credentials not valid")
        }

        if (user && user.hashedPassword === credentials.password) {
            console.log(credentials.password, "##### credentials passowrd")
              return user;
        } else {
                throw new Error("Invalid credentials");
           }

            
        } catch (error) {
            throw new Error(`Authentication error: ${error}`);
        }
    },
})],
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,

    }) 

// const config = {
//     providers: [credentials]
// } satisfies NextAuthConfig;

// export const { handlers, auth, signIn, signOut } = NextAuth(credentialsConfig)



// O problema está no hasheamento e na comparação entre as senhas!!!


