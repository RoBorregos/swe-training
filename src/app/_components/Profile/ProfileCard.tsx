"use client"
import { cn } from "utils/merge";
import { FaUser } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { api } from "~/trpc/react";
import { AiOutlineLoading } from "react-icons/ai";



const  ProfileCard =  ({ idUser }:  { idUser: string }) => {
    const udpateUser = api.profile.update.useMutation();
    const handleSend = async() =>{
        refetch();
        await udpateUser.mutateAsync({id:idUser , leetcodeUser: NewLeetcodeUser});
        

    }
    const [NewLeetcodeUser, setInputValue] = useState("");
    const { data, isLoading, error, refetch, isRefetching} =  api.profile.getById.useQuery(idUser);
    if(isLoading || error || !data){
        return <div>
            Wait a little more
        </div>
    }
    const {name, image, leetcodeUser} = data;
    

    return (
        <div className={cn("bg-primary-light", 'text-white rounded-xl p-4 flex flex-col')}>
            <div className="flex flex-row items-center  justify-between mb-4">
                <div className="flex flex-row items-center">
                    <img src={image ?? "N"} alt={`${name}'s profile`} className="w-20 h-20 rounded-full object-cover mr-3" />
                    <div className="flex flex-col items-start">
                        <div className="text-lg font-semibold items-center">
                            {name ?? "No Name"} 
                        </div>
                        <div className="text-lg font-light items-center">
                            {leetcodeUser ?? "No user"} 
                        </div>
                        
                    </div>
                </div>
                <FaUser className="text-4xl ml-3" />
            </div>
            <hr className="border-t border-gray-400 my-2 w-full" />
            <div className="flex items-center pl-2 mb-2 font-extrabold text-sm">
                Change Leetcode User:
            </div>
            <div className="flex flex-row items-center">
                <input
                    type="text"
                    placeholder="New Leetcode User"
                    value = {NewLeetcodeUser}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md bg-gray-500 text-white focus:outline-none focus:ring-2  focus-visible:-translate-y-0.5 duration-200" 
                />
                <div >
                    {!isRefetching ? (
                        <button className=" ml-4 rounded-full p-2 transition-all duration-200 transform hover:scale-110 hover:bg-gray-600 " 
                            onClick={handleSend}
                        >
                            <IoMdSend className="text-xl" />
                        </button>)
                        :(
                        <div className="ml-4 rounded-full p-2 bg-gray-600 ">
                            <AiOutlineLoading className="text-xl animate-spin"/>
                        </div> )
                    }
                </div>
                
            </div>
        </div>
    )
}

export default ProfileCard;