import Link from "next/link";
import { cn } from "utils/merge";
import { FaLock } from "react-icons/fa6";

interface CardProps {
    title: string,
    description: string,
    id: string,
    isBlocked: boolean,
    bgColor: string,
    textColor: string
};

const WeekCard = ({ title, description, id, isBlocked, bgColor, textColor }: CardProps) => {

    return (
        <div className={cn(bgColor || "bg-blue-500", ' rounded-xl p-4 flex flex-col hover:-translate-y-1 hover:-translate-x-1')}>
            <div className="flex flex-row items-center text-white justify-between">
                <div className="text-lg font-semibold">
                    {title}
                </div>
                {isBlocked && (
                    <FaLock className="text-xl" />
                )}
            </div>
            <div className="text-white font-extralight pb-5">
                {description}
            </div>
            {!isBlocked && (
                <Link href={`week/${id}`} className={`${textColor} bg-white text-sm rounded-full px-3 py-1 w-fit`}>
                    Check it out
                </Link>
            )}
        </div>
    )
}

export default WeekCard;
