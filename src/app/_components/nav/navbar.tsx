import Link from "next/link";
import Image from "next/image"
import { auth } from "~/server/auth";
import logo from "../../../../public/images/Logo.png"
import NavElement from "./navElement";
import UserMenu from "./UserMenu";

const Navbar = async () => {
    const session = await auth();

    return (
        <div className="w-full flex flex-row justify-between bg-primary-light py-5 px-10 border-b border-neutral-700">
            <div className="flex flex-row items-center gap-12">
                <Link href="/">
                    <Image src={logo} alt="Logo" className="h-[2rem] w-fit cursor-pointer object-contain" />
                </Link>
                <NavElement href="/weekly-problems" label="Weekly Problems" />
                <NavElement href="/leaderboard" label="Leaderboard" />
                <NavElement href="/resources" label="Resources" />
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
                <UserMenu />
            </div>
        </div>
    )
}

export default Navbar;