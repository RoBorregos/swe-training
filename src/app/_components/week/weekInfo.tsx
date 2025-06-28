import { api } from "~/trpc/server";
import Title from "../title";
import Subtitle from "../subtitle";
import { auth } from "~/server/auth";
import Unauthorized from "../unauthorized";
import SolvedToggle from "./solvedToggle";
import { IoIosStar } from "react-icons/io";
import Link from "next/link";

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
              <div>
                <Subtitle label="Overview" />
                <div className="font-main text-primary-foreground">
                  {week.description}
                </div>
                <ul className="text-white list-disc pl-4">
                  {week.resources.map((resource, index) => (
                    <li key={index} className="text-primary-foreground ">
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-1/3 rounded-xl bg-primary-light p-4">
                <Subtitle label="Resources" />
                <div className="font-main text-sm text-primary-foreground">
                  {week.detailResources.map((resource, index) => (
                    <Link href={resource.url} key={index} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-100">
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
                    <th> Problem </th>
                    <th> Level </th>
                    <th> Solved by </th>
                    <th> Status </th>
                  </tr>
                </thead>
                <tbody>
                  {week.problems.map((problem) => (
                    <tr key={problem.id} className="text-white">
                      <td>
                        <a
                          href={problem.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          <div className="flex flex-row items-center gap-2">
                            {problem.recommended && (
                              <IoIosStar />
                            )}
                            {problem.name}
                          </div>
                        </a>
                      </td>
                      <td>{problem.level}</td>
                      <td>{problem.solvedBy?.length ?? 0}</td>
                      <td>
                        {userId ? (
                          <SolvedToggle
                            problemId={problem.id}
                            initialSolved={problem.solvedBy?.some((u) => u.id === userId) ?? false}
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
