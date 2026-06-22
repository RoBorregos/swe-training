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

            <div className="text-main grid grid-cols-1 gap-6 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 lg:gap-10">
                {weeks.map((week, key) => (
                    <div key={key}>
                        <ProblemCard
                            key={key}
                            title={`Week ${week.number}`}
                            description={week.title}
                            id={week.id}
                            isLocked={week.isLocked}
                            unlockDate={week.unlockDate}
                            bgColor={backgroundColors.get(week.color) ?? "bg-white"}
                            textColor={textColors.get(week.color) ?? "text-black"}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyProblems;
