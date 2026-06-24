import ProblemCard from "~/app/_components/week/weekCard";
import PresentersSection from "~/app/_components/presentersSection";
import Subtitle from "~/app/_components/subtitle";
import Title from "~/app/_components/title";
import { backgroundColors, textColors } from "utils/colors";
import { api } from "~/trpc/server";
import { auth } from "~/server/auth";

const WeeklyProblems = async () => {
    const weeks = await api.week.getWeeksPublic();
    const session = await auth();
    const isAdmin = session?.user?.role?.toLowerCase() === "admin";

    // Presenters refer to a concrete week: the current one — the highest-numbered
    // unlocked week, or the highest-numbered week overall if none are unlocked yet.
    const weeksByNumberDesc = [...weeks].sort(
        (a, b) => (b.number ?? 0) - (a.number ?? 0),
    );
    const currentWeek =
        weeksByNumberDesc.find((w) => !w.isLocked) ?? weeksByNumberDesc[0];

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

            {currentWeek && (
                <div className="mt-10 w-full">
                    <PresentersSection
                        weekId={currentWeek.id}
                        weekLabel={`Week ${currentWeek.number}`}
                        isAdmin={isAdmin}
                    />
                </div>
            )}
        </div>
    );
};

export default WeeklyProblems;
