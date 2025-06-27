import { api } from "~/trpc/server";
import Title from "../title";
import Subtitle from "../subtitle";
import { auth } from "~/server/auth";

const WeekInfo = async ({id}: { id: string }) => {
  const week = await api.week.getWeekPublic({id: id});
  console.log(week);
  const session = await auth();
  const userId = session?.user?.id;
  const leetcodeUser = session?.user?.leetcodeUser;

  // Only call backend if needed information exists.
  if (userId && leetcodeUser) {
    await api.leetcode.checkNewCompletions({
      userId: userId,
      leetcodeUser: leetcodeUser,
    });
  }

  return (
    <div>
      {week ? (
        <div>
          <Title label={"Week " + week.number + " - " + week.title} />

          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
              <div>
                <Subtitle label="Overview" />
                <div className="font-main text-primary-foreground">
                  {week.description}
                </div>
              </div>

              <div className="w-1/3 rounded-xl bg-primary-light p-4">
                <Subtitle label="Resources" />
                <div className="font-main text-sm text-primary-foreground">
                  {/* {week.resources.map((resource, index) => (
                    <div key={index} className="mb-2">
                      <a
                        href={resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {resource}
                      </a>
                    </div>
                  ))} */}
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
                  {/* <tr className="text-white ">
                                        <td> <a href="https://leetcode.com/" target="_blank" className="hover:underline"> Hello </a> </td>
                                        <td> Hi </td>
                                        <td> Hi </td>
                                        <td> Hi </td>
                                    </tr> */}
                  {week.problems.map((problem) => (
                    <tr key={problem.id} className="text-white">
                      <td>
                        <a
                          href={problem.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {problem.name}
                        </a>
                      </td>
                      <td>{problem.level}</td>
                      <td>{problem.solvedBy?.length ?? 0}</td>
                      <td>
                        {userId && problem.solvedBy?.some((u) => u.id === userId)
                          ? "Solved"
                          : "Unsolved"}
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
