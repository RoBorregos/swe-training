import Link from "next/link";

const NavElement = ({ label, href }: { label: string, href: string }) => {
    return (
        <div className="text-primary-foreground font-code font-normal text-sm hover:cursor-pointer hover:underline">
            <Link href={href}>
                {label}
            </Link>
        </div>
    )
}

export default NavElement;