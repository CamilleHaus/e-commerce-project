"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { mainLinks } from "@/constants";
import { userLinks } from "@/constants";
import { User } from "@prisma/client";
import CartIcon from "@/app/(shoppingCart)/components/ui/CartIcon";
import WishlistIcon from "@/app/(wishlist)/components/WishlistIcon";

// icons

import { AiOutlineUser } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { TbBracketsAngle } from "react-icons/tb";

interface INavBarProps {
  user: User;
}

const NavBar: React.FC<INavBarProps> = ({ user }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const userMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };
  
  return (
    <nav>
      <div className="main-container border-b border-1 flex justify-between items-center py-2 relative">
        <Link href={"/"}>
          <div className="flex gap-1 items-center text-xl font-medium text-black">
            <h1>DEV-THREADS</h1>
            <TbBracketsAngle />
          </div>
        </Link>

        <ul className="flex gap-10 max-md:hidden">
          {mainLinks.map((link, index) => (
            <Link key={index} href={link.route}>
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>

        <div className="flex flex-row gap-5 text-xl [&>*]:cursor-pointer">
          <CartIcon />
          <WishlistIcon />
          <div className="max-md:hidden flex gap-6" onClick={userMenuHandler}>
            <AiOutlineUser />
          </div>
          <div className="md:hidden" onClick={mobileMenuHandler}>
            {openMobileMenu ? <MdClose /> : <FiMenu />}
          </div>
        </div>

        {/* USER MENU */}
        {openUserMenu && (
          <div className="z-10 absolute right-0 top-[40px] w-28 bg-gray-700 shadow-md rounded-md p-4 text-white max-md:hidden text-center">
            {!user ? (
              <ul>
                <Link onClick={() => setOpenUserMenu(false)} href={"/sign-in"}>
                  <li>Log In</li>
                </Link>
                <Link onClick={() => setOpenUserMenu(false)} href={"/sign-up"}>
                  <li>Sign Up</li>
                </Link>
              </ul>
            ) : (
              <ul>
                {userLinks.map((link, index) => (
                  <Link
                    onClick={() => setOpenUserMenu(false)}
                    key={index}
                    href={link.route}
                  >
                    <li>{link.label}</li>
                  </Link>
                ))}
                <li className="cursor-pointer" onClick={() => signOut()}>
                  Sign Out
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* MOBILE MENU */}
      {openMobileMenu && (
        <div className="md:hidden">
          <div className="absolute right-5 w-48 bg-gray-700 py-5 shadow-md rounded-md p-4 text-white text-center z-[99999]">
            <ul className="flex flex-col gap-5">
              {mainLinks.map((link, index) => (
                <Link key={index} href={link.route}>
                  <li>{link.label}</li>
                </Link>
              ))}
              {!user ? (
                <>
                  <Link href={"/sign-in"}>
                    <li>Log In</li>
                  </Link>
                  <Link href={"/sign-up"}>
                    <li>Sign Up</li>
                  </Link>
                </>
              ) : (
                <>
                  {userLinks.map((link, index) => (
                    <Link key={index} href={link.route}>
                      <li>{link.label}</li>
                    </Link>
                  ))}
                  <li className="cursor-pointer" onClick={() => signOut()}>
                    Sign Out
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

// [&>*]:cursos-pointer --> Seleciona todos os elementos children e aplica o estilo
