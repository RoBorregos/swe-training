
import Subtitle from "~/app/_components/subtitle";
import Title from "~/app/_components/title";
import ProfileCard from "~/app/_components/Profile/ProfileCard";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

const Profile = async () => {
    
    const session = await auth();
    if (!session) {
        return <div>You must be logged in to view your profile.</div>;
    }
    return (
        <div>
            <Title label="Profile" />
            <ProfileCard idUser={session.user.id ?? "NA"} />
        </div>
    )
}

export default Profile;