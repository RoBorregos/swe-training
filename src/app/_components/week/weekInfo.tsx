import { api } from "~/trpc/server";
import Title from "../title";
import Subtitle from "../subtitle";

const WeekInfo = async ({ id }: { id: number }) => {
    const week = await api.week.getWeek(id);

    return (
        <div>

            {week ? (
                <div>
                    <Title label={"Week " + id + " - " + week.title} />

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-row justify-between">
                            <div>
                                <Subtitle label="Overview" />
                                <div className="text-primary-foreground font-main">
                                    Problems related to bla bla bla. Main topics

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
            ) : (
                <div>
                    Week not found
                </div>
            )}

        </div>
    )
}

export default WeekInfo;