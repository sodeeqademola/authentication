"use client";
import React from "react";
import { motion } from "framer-motion";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  // console.log(session, status);
  return (
    <div>
      <Navbar
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand>
          <p className="font-bold text-inherit text-white">Home</p>
        </NavbarBrand>

        <NavbarContent justify="end">
          {status === "authenticated" ? (
            <>
              <Button>
                <Link href={"/profile"}>{session?.user?.firstName}</Link>{" "}
              </Button>
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button>
                <Link href="/signin"> Login</Link>
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1 }}
              >
                <NavbarItem>
                  <Button>
                    <Link href="/signup"> Sign Up</Link>
                  </Button>
                </NavbarItem>
              </motion.div>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default Header;
