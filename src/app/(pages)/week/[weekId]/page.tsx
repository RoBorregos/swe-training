import React from "react";
import Subtitle from "~/app/_components/subtitle";
import Title from "~/app/_components/title";
import WeekInfo from "~/app/_components/week/weekInfo";


const WeekPage = ({ params }: { params: Promise<{ weekId: string }> }) => {
  const { weekId } = React.use(params);

  return (

    <div>
      <WeekInfo id={parseInt(weekId)} />
    </div>

  );
}

export default WeekPage;