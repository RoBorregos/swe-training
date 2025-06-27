"use client"
import Title from "~/app/_components/title";
import AdminViewBlock from "~/app/_components/admin/adminViewBlock";
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import type { Prisma, Week } from "@prisma/client";

type ProblemWithSolvedBy = Prisma.ProblemGetPayload<{
  include: {solvedBy: true }
}>

const Admin = () => {
  
    const [weeks, setWeeks] = useState<Week[]>([]);
    const [problems, setProblems] = useState<ProblemWithSolvedBy[]>([]);
  
    const fetchWeeks = api.week.getWeeks.useQuery();

    const fetchProblems = api.problem.getAll.useQuery();

    useEffect(() => {
      if (fetchWeeks.data) {
        setWeeks(fetchWeeks.data);
      }
    }, [fetchWeeks.data]);

    useEffect(() => {
      if (fetchProblems.data) {
        setProblems(fetchProblems.data);
      }
    }, [fetchProblems.data]);
    
    return (
	<div className="flex flex-col gap-12">
	<Title label="Problem Setup"/>
	{ weeks.map((w) => <AdminViewBlock key={w.id} problems={problems} week={w}/> ) }
	</div>
    )
}

export default Admin;
