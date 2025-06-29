import { api } from "~/trpc/server";
import Title from "../title";
import Subtitle from "../subtitle";
import { auth } from "~/server/auth";
import Unauthorized from "../unauthorized";
import SolvedToggle from "./solvedToggle";
import { IoIosStar } from "react-icons/io";
import Link from "next/link";

const getLevelStyles = (level: string) => {
  switch (level) {
    case "WARMUP":
      return "bg-teal-500/60 text-teal-100 border-teal-400/50";
    case "MEDIUM":
      return "bg-yellow-500/60 text-yellow-100 border-yellow-400/50";
    case "HARDER":
      return "bg-orange-500/60 text-orange-100 border-orange-400/50";
    case "INSANE":
      return "bg-red-500/60 text-red-100 border-red-400/50";
    default:
      return "bg-gray-500/60 text-gray-100 border-gray-400/50";
  }
};

const WeekInfo = async ({ id }: { id: string }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const leetcodeUser = session?.user?.leetcodeUser;

  if (!session?.user) {
    return <Unauthorized />;
  }

  if (userId && leetcodeUser) {
    await api.leetcode.checkNewCompletions({
      userId: userId,
      leetcodeUser: leetcodeUser,
    });
  }
  const week = await api.week.getWeekPublic({ id: id });
  return (
    <div>
      {week ? (
        <div>
          <Title label={"Week " + week.number + " - " + week.title} />

          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between gap-10">
              <div className="">
                <Subtitle label="Overview" />
                <div className="font-main text-primary-foreground">
                  {week.description}
                </div>
                <ul className="list-disc pl-4 text-white">
                  {week.resources.map((resource, index) => (
                    <li key={index} className="text-primary-foreground">
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-max rounded-xl bg-primary-light p-4">
                <Subtitle label="Resources" />
                <div className="flex flex-col pr-5 font-main text-sm text-primary-foreground">
                  {week.detailResources.map((resource, index) => (
                    <Link
                      href={resource.url}
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-nowrap underline hover:text-gray-100"
                    >
                      {resource.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="font-main">
              <Subtitle label="Problem list" className="pb-4" />
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white text-left font-semibold text-white">
                    <th className="pb-2"> Problem </th>
                    <th className="pb-2"> Level </th>
                    <th className="pb-2"> Solved by </th>
                    <th className="pb-2"> Status </th>
                  </tr>
                </thead>
                <tbody>
                  {week.problems.map((problem) => (
                    <tr key={problem.id} className="text-white transition duration-300 hover:scale-[1.01] hover:bg-gray-800/50 cursor-pointer">
                      <td className="py-2">
                        <a
                          href={problem.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          <div className="flex flex-row items-center gap-2">
                            {problem.recommended && <IoIosStar />}
                            {problem.name}
                          </div>
                        </a>
                      </td>
                      <td className="py-2">
                        <span
                          className={`rounded-full border px-2 py-1 text-xs font-medium ${getLevelStyles(problem.level)}`}
                        >
                          {problem.level.charAt(0).toUpperCase() +
                            problem.level.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="py-2">{problem.solvedBy?.length ?? 0}</td>
                      <td className="py-2">
                        {userId ? (
                          <SolvedToggle
                            problemId={problem.id}
                            initialSolved={
                              problem.solvedBy?.some((u) => u.id === userId) ??
                              false
                            }
                            userId={userId}
                          />
                        ) : (
                          <span className="text-gray-400">Login required</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>Week not found</div>
      )}
    </div>
  );
};

export default WeekInfo;
