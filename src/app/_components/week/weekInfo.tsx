import { api } from "~/trpc/server";
import Title from "../title";
import Subtitle from "../subtitle";
import { auth } from "~/server/auth";
import Unauthorized from "../unauthorized";
import SolvedToggle from "./solvedToggle";
import { IoIosStar } from "react-icons/io";
import Link from "next/link";
import { IoWarning } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";

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
                <UserStatus leetcodeUser={leetcodeUser ?? ""} />
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
                          <div
                            className="flex flex-row items-center gap-2"
                            title={
                              problem.recommended
                                ? "Recommended problem. Try to complete this challenge!"
                                : ""
                            }
                          >
                            {problem.recommended && <IoIosStar />}
                            {problem.name}
                          </div>
                        </a>
                      </td>
                      <td>
                        <span
                          className={`rounded-full border px-2 py-1 text-xs font-medium ${getLevelStyles(problem.level)}`}
                        >
                          {problem.level.charAt(0).toUpperCase() +
                            problem.level.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td>{problem.solvedBy?.length ?? 0}</td>
                      <td>
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

const UserStatus = async ({
  leetcodeUser,
  returnSuccess = true,
}: {
  leetcodeUser: string;
  returnSuccess?: boolean;
}) => {
  const leetcodeUserData =
    leetcodeUser && leetcodeUser.length > 0
      ? await api.leetcode.getLeetcodeUserData({
          username: leetcodeUser ?? "",
        })
      : null;

  if (leetcodeUser?.length == 0) {
    return (
      <div className="mt-5 flex flex-row items-center gap-3 text-red-500">
        <IoWarning size={30} />
        <p>
          You have not set your LeetCode username in your profile. Please do so
          to track your progress.
        </p>
      </div>
    );
  }

  if (!leetcodeUserData) {
    return (
      <div className="mt-5 flex flex-row items-center gap-3 text-orange-500">
        <IoWarning size={30} />
        <p>
          Unable to fetch LeetCode user data. Please check your username or try
          again later.
        </p>
      </div>
    );
  }

  if (returnSuccess)
    return (
      <div
        title={`Leetcode name: ${leetcodeUserData.matchedUser.profile.realName}. Description: ${leetcodeUserData.matchedUser.profile.aboutMe}`}
        className="mt-5 flex flex-row items-center gap-3 text-green-400"
      >
        <IoCheckmarkCircle size={30} />
        <p>Leetcode handle validated successfully. </p>
      </div>
    );

  return <></>;
};

export default WeekInfo;
