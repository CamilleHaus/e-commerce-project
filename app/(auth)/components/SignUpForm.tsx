"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useState } from "react";
import { TbBracketsAngle } from "react-icons/tb";
import { createUser } from "../actions/authActions";
import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);

  const session = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      toast.success("You are already signed in!");

      router.push("/");
    }
  }, [session.status, router]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmiting(true);

    const result = await createUser(formData);

    if (result?.existingUser) {
      toast.error(result.existingUser);
    } else {
      toast.success("Welcome! Please sign in 😊");
      ref.current?.reset();
      router.push("/sign-in");
    }

    setIsSubmiting(false);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl md:outline outline-1 outline-gray-200">
      <div className="px-4 py-8 sm:rounded-lg sm:px-10">
        <div
          className="md:text-4xl sm:text-2xl mb-5 uppercase w-full text-center flex items-center text-white
                gap-1 justify-center bg-gray-700 py-4 rounded-md"
        >
          <h1>Join the DT Squad</h1>
          <TbBracketsAngle />
        </div>
        <form
          className="space-y-6 mb-3"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
          ref={ref}
        >
          <Input type="text" id="name" label="Name" disabled={isSubmiting} />
          <Input type="email" id="email" label="Email" disabled={isSubmiting} />
          <Input
            type="password"
            id="password"
            label="Password"
            disabled={isSubmiting}
          />
          <Button type="submit">Create Account</Button>
        </form>
        <Link href={"/sign-in"}>
          <span className="mt-3 hover:underline">
            Already have an account? Sign in &#8594;
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;

// O useEffect verifica se você já est;a logado e se estiver, te empurra para a home e não te dá acesso a pagina de sign in.
