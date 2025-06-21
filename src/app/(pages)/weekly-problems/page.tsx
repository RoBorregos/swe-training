// app/(admin)/admin/weekly/page.tsx
import { api } from "~/trpc/server";
import Title from "~/app/_components/title";
import Subtitle from "~/app/_components/subtitle";
import ProblemCard from "~/app/_components/week/weekCard";
import AdminProblemEditor from "~/app/_components/week/adminProblemEditor";
import { redirect } from "next/navigation";
import { backgroundColors, textColors } from "utils/colors";
import { useSession } from "next-auth/react";

const AdminWeeklyPage = async () => {
  const session = useSession();
  session.user.role !== "ADMIN" && redirect("/");

  const weeks = await api.week.getWeeks();

  return (
    <div className="px-10">
      <Title label="Admin: Weekly Problems" />
      <Subtitle label="Edición de problemas por semana" className="pb-4" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {weeks.map((week) => (
          <div
            key={week.id}
            className="border rounded-xl shadow-md p-5 bg-white dark:bg-zinc-900"
          >
            <ProblemCard
              key={week.id}
              title={week.title}
              description={week.description}
              number={week.number}
              isBlocked={week.isBlocked}
              bgColor={backgroundColors.get(week.color) ?? "bg-white"}
              textColor={textColors.get(week.color) ?? "text-black"}
            />

            <AdminProblemEditor weekId={week.id} problems={week.problems} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminWeeklyPage;
