import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";
import AuthContext from "@/context/authContext";
import getCurrentUser from "./(auth)/actions/getCurrentUser";
import ToasterContext from "@/context/HotToastContext";
import CartContext from "@/context/CartContext";
import Footer from "@/components/Footer";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Dev-Threads",
  description: "E-commerce Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();


  return (
    <html lang="en">
      <body className={`${raleway.className} flex flex-col min-h-screen`}>
        <AuthContext>
          <CartContext>
            <ToasterContext />
            <NavBar user={user!} />
            {children}
            <Footer />
          </CartContext>
        </AuthContext>
      </body>
    </html>
  );
}
