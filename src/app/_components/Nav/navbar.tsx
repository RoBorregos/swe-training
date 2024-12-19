import Link from "next/link";
import Image from "next/image"
import NavElement from "./navElement";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import logo from "../../../../public/images/Logo.png"

const Navbar = async () => {
    const session = await auth();

    if (session?.user) {
        void api.post.getLatest.prefetch();
    }

    return (
        <div className="w-full flex flex-row justify-between bg-primary-light py-5 px-10 border-b border-neutral-700">
            <div className="flex flex-row items-center gap-6">
                <Link href="/">
                    <Image src={logo} alt="Logo" className="h-[2rem] w-fit cursor-pointer object-contain" />
                </Link>
                <NavElement href="/leaderboard" label="Leaderboard" />
                <NavElement href="/resources" label="Resources" />
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
                <p className="text-primary-foreground font-code font-normal text-sm hover:cursor-pointer hover:underline">
                    {session && <span> {session.user?.name}</span>}
                </p>
                <Link
                    href={session ? "/api/auth/signout" : "/api/auth/signin"}
                    className="text-primary-foreground font-code font-normal text-sm hover:cursor-pointer hover:underline"
                >
                    {session ? "Sign out" : "Sign in"}
                </Link>
            </div>
        </div>
    )
}

export default Navbar;