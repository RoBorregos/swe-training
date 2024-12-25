import ProblemCard from "~/app/_components/problems/problemCard";
import Subtitle from "~/app/_components/subtitle";
import Title from "~/app/_components/title";
import colors from "utils/colors"

const WeeklyProblems = () => {
    return (
        <div>
            <Title label="Weekly Problems" />
            <Subtitle label="Weeks" className="pb-4" />

            <div className="grid grid-cols-3 text-main px-10 gap-10">
                {colors.map((color, key) => (
                    <div key={key}>
                        <ProblemCard key={key} title="Algoritm" description="idk solve tings" id={"1"} isBlocked={true} bg={color.bg} font={color.font} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeeklyProblems;