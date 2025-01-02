import { cn } from "utils/merge"

const Title = ({ label, className }: { label: string, className?: string }) => {
    return (
        <div className={cn("text-2xl font-extrabold sm:text-4xl text-accent pb-8", className)}>
            {label}
        </div>
    )
}

export default Title;