import ProblemCard from "~/app/_components/week/weekCard";
import Subtitle from "~/app/_components/subtitle";
import Title from "~/app/_components/title";
import { backgroundColors, textColors } from "utils/colors";
import { api } from "~/trpc/server";

const WeeklyProblems = async () => {
    const weeks = await api.week.getWeeksPublic();

    return (
        <div>
            <Title label="Weekly Problems" />
            <Subtitle label="Weeks" className="pb-4" />

            <div className="grid grid-cols-3 text-main px-10 gap-10">
                {weeks.map((week, key) => (
                    <div key={key}>
                        <ProblemCard key={key} title={`Week ${week.number}`} description={week.title} id={week.id} isBlocked={week.isBlocked} bgColor={backgroundColors.get(week.color) ?? "bg-white"} textColor={textColors.get(week.color) ?? "text-black"} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeeklyProblems;
