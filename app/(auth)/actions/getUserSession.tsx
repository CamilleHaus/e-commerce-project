import { auth } from "@/auth";

export async function getSession() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error("Error getting user session:", error);
    return null;
  }
}
