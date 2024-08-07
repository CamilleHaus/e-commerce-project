"use client";

import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Link from "next/link";
  
const SignInForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Sucessfully signed in!");
      router.push("/");
    } catch (error: any) {
      console.log(error)
      toast.error("Invalid email and/or password");
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl md:outline outline-1 outline-gray-200">
      <div className="px-4 py-8 sm:rounded-lg sm:px-10">
        <h1 className="text-2xl mb-5">Sign In</h1>
        <form ref={formRef} className="space-y-6 mb-5" onSubmit={handleSubmit}>
          <Input label="Email" id="email" type="email" />
          <Input label="Password" id="password" type="password" />
          <Button type="submit">Log in</Button>
        </form>
        <Link href={"/sign-up"}>
          <span className="mt-3 hover:underline">
            Don't have an account? Create one &#8594;
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
