import Link from "next/link";

export const GlowButton = ({
  label,
  href,
}: {
  label: string;
  href: string;
}) => {
  return (
    <div className="glow-on-hover p-2 font-code text-sm font-normal text-neutral-300 hover:cursor-pointer hover:underline">
      <Link href={href}>{label}</Link>
    </div>
  );
};
