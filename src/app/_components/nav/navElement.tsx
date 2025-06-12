import Link from "next/link";

const NavElement = ({ label, href }: { label: string; href: string }) => {
  return (
    <div className="p-2 font-code text-sm font-normal text-neutral-300 hover:cursor-pointer hover:underline">
      <Link href={href}>{label}</Link>
    </div>
  );
};

export default NavElement;
