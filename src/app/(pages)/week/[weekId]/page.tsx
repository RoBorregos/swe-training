import React from "react";
import WeekInfo from "~/app/_components/week/weekInfo";

const WeekPage = ({ params }: { params: Promise<{ weekId: string }> }) => {
  const { weekId } = React.use(params);

  return (
    <div>
      <WeekInfo id={parseInt(weekId)} />
    </div>
  );
};

export default WeekPage;
