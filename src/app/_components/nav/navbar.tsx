import Link from "next/link";
import Image from "next/image"
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import logo from "../../../../public/images/Logo.png"
import NavElement from "./navElement";
import UserMenu from "./UserMenu";

const Navbar = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    const canReview =
        session?.user?.role === "ADMIN" || session?.user?.isReviewer === true;

    let pendingReviews = 0;
    let myComments = 0;
    if (userId) {
        if (canReview) {
            pendingReviews = await db.resumeSubmission.count({
                where: { comments: { none: {} } },
            });
        }
        const mine = await db.resumeSubmission.findUnique({
            where: { userId },
            select: { _count: { select: { comments: true } } },
        });
        myComments = mine?._count.comments ?? 0;
    }

    return (
        <div className="z-50 fixed w-full flex flex-row justify-between bg-primary-light py-5 px-10 border-b border-neutral-700">
            <div className="flex flex-row items-center gap-12">
                <Link href="/">
                    <Image src={logo} alt="Logo" className="h-[2rem] w-fit cursor-pointer object-contain" />
                </Link>
                <NavElement href="/weekly-problems" label="Weekly Problems" />
                <NavElement href="/leaderboard" label="Leaderboard" />
                <div className="flex flex-row items-center gap-2">
                    <NavElement href="/resume-review" label="Resume Review" />
                    {canReview && pendingReviews > 0 && (
                        <span
                            title={`${pendingReviews} resumes pendientes de revisar`}
                            className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-300"
                        >
                            {pendingReviews}
                        </span>
                    )}
                    {myComments > 0 && (
                        <span
                            title={`${myComments} comentarios en tu resume`}
                            className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-semibold text-blue-300"
                        >
                            {myComments} 💬
                        </span>
                    )}
                </div>
                <NavElement href="/resources" label="Resources" />
                { session?.user?.role == "ADMIN"  ? <NavElement href="/admin" label="Manage" /> : ""}
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
                <UserMenu />
            </div>
        </div>
    )
}

export default Navbar;
