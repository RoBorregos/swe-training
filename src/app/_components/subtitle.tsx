import { cn } from "utils/merge"

const Subtitle = ({ label, className }: { label: string, className?: string }) => {
    return (
        <div className={cn("text-white text-xl font-main font-semibold", className)}>
            {label}
        </div>
    )
}

export default Subtitle;
