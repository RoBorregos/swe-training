import Title from "~/app/_components/title";
import ProfileCard from "~/app/_components/Profile/ProfileCard";
import { auth } from "~/server/auth";

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