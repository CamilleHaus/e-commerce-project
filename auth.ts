import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prismaDB"
import bcrypt from "bcrypt";


export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials: any) => {

                console.log(credentials, "##### credentials")

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string }
                    });

                    const compare = await bcrypt.compare(
                        credentials.password,
                        user?.hashedPassword as string
                    )

                    if (!compare) {
                        throw new Error("Credentials not valid")
                    }

                    if (compare) {
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


// O problema está no hasheamento e na comparação entre as senhas!!!


