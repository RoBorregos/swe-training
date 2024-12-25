import React from "react";
import Subtitle from "~/app/_components/subtitle";
import Title from "~/app/_components/title";

const WeekPage = ({ params }: { params: Promise<{ weekId: string }> }) => {
  const { weekId } = React.use(params);
  const title = "Week " + weekId + " - Data Structures";

  return (
    <div>
      <Title label={title} />

      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-between">
          <div>
            <Subtitle label="Overview" />
            <div className="text-primary-foreground font-main">
              Problems related to bla bla bla. Main topics
              <br /> Stack
              <br /> Queue
              <br /> ALgo
            </div>
          </div>

          <div className="bg-primary-light rounded-xl p-4 w-1/3">
            <Subtitle label="Resources" />
            <div className="text-primary-foreground font-main text-sm">
              <div>
                Link1 <br /> Link2 <br /> Link2 <br /> Link2 <br /> Link2
              </div>
            </div>

          </div>

        </div>

        <div className="font-main">
          <Subtitle label="Problem list" className="pb-4" />
          <table className="w-full">
            <thead>
              <tr className="border-b border-white text-white font-semibold text-left">
                <th> Problem </th>
                <th> Level </th>
                <th> Solved by </th>
                <th> Status </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-white ">
                <td> <a href="https://leetcode.com/" target="_blank" className="hover:underline"> Hello </a> </td>
                <td> Hi </td>
                <td> Hi </td>
                <td> Hi </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WeekPage;