"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "utils/merge";
import { FaLock } from "react-icons/fa6";
import { formatMonterrey } from "~/util/timezone";

interface CardProps {
  title: string;
  description: string;
  id: string;
  isLocked: boolean;
  unlockDate: Date | null;
  bgColor: string;
  textColor: string;
}

const WeekCard = ({
  title,
  description,
  id,
  isLocked,
  unlockDate,
  bgColor,
  textColor,
}: CardProps) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        bgColor || "bg-blue-500",
        "flex flex-col rounded-xl p-4 hover:-translate-x-1 hover:-translate-y-1",
      )}
      onClick={() => {
        if (!isLocked) {
          router.push(`/week/${id}`);
        }
      }}
    >
      <div className="flex flex-row items-center justify-between text-white">
        <div className="text-lg font-semibold">{title}</div>
        {isLocked && <FaLock className="text-xl" />}
      </div>
      <div className="pb-5 font-extralight text-white">{description}</div>
      {isLocked ? (
        unlockDate && (
          <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-sm text-white">
            Disponible el {formatMonterrey(new Date(unlockDate))}
          </span>
        )
      ) : (
        <Link
          href={`week/${id}`}
          className={`${textColor} w-fit rounded-full bg-white px-3 py-1 text-sm`}
        >
          Check it out
        </Link>
      )}
    </div>
  );
};

export default WeekCard;
