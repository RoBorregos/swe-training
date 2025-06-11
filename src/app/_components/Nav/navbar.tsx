"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/Logo.png";
import NavElement from "./navElement";
import type { Session } from "next-auth";
import useShiftKey from "~/app/_hooks/useShiftKey";
import { BurningButton } from "~/app/_components/buttons/Burning";

const Navbar = ({ session }: { session: Session | null }) => {
  const shiftPressed = useShiftKey();

  return (
    <div className="flex w-full flex-row justify-between border-b border-neutral-700 bg-primary-light px-10 py-5">
      <div className="flex flex-row items-center gap-12">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            className="h-[2rem] w-fit cursor-pointer object-contain"
          />
        </Link>
        <NavElement href="/weekly-problems" label="Weekly Problems" />
        <NavElement href="/leaderboard" label="Leaderboard" />
        <NavElement href="/resources" label="Resources" />
        {session?.user && shiftPressed && (
          <NavElement href="/roboleetcode" label="Roboleetcode 👀" />
        )}
        {session?.user && shiftPressed && <BurningButton />}
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <p className="font-code text-sm font-normal text-primary-foreground hover:cursor-pointer hover:underline">
          {session && <span> {session.user?.name}</span>}
        </p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="font-code text-sm font-normal text-primary-foreground hover:cursor-pointer hover:underline"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
