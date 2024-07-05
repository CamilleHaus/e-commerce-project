"use client";

import { useFormStatus } from "react-dom";

interface IButtonProps {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  type,
  children,
  onClick,
  disabled,
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-disabled={pending}
      className="bg-gray-700 text-white py-1 px-3 shadow rounded-md"
    >
      {children}
    </button>
  );
};

export default Button;
