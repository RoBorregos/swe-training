"use client";
import { cn } from "utils/merge";
import { FaUser } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { api } from "~/trpc/react";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";

interface ProfileCardProps {
  idUser: string;
  name?: string | null;
  image?: string | null;
}

export default function ProfileCard({
  idUser,
  name = "No Name",
  image,
}: ProfileCardProps) {
  const updateUser = api.profile.update.useMutation();
  const handleSend = async() =>{
        refetch();
        await updateUser.mutateAsync({id:idUser , leetcodeUser: NewLeetcodeUser});
    }
  const [NewLeetcodeUser, setInputValue] = useState("");
  const { data, isLoading, error, refetch, isRefetching } = api.profile.getById.useQuery(idUser);
  if (isLoading || error || !data) {
    return (
      <div className="p-6 w-80 bg-gray-700 rounded-xl text-center text-white">
        Loading…
      </div>
    );
  }

  const { leetcodeUser } = data;

  return (
    <div
      className={cn(
        "w-96 bg-gradient-to-br from-gray-800 to-gray-900",
        "p-6 rounded-2xl shadow-2xl text-white flex flex-col gap-4"
      )}
    >
      {/* Encabezado: foto y nombre */}
      <div className="flex items-center gap-4">
        {image ? (
          <img
            src={image}
            alt={`${name}'s profile`}
            className="w-20 h-20 rounded-full border-2 border-accent object-cover"
          />
        ) : (
          <FaUser className="w-20 h-20 text-accent" />
        )}
        <div>
          <h2 className="text-2xl font-bold leading-snug">{name}</h2>
          <p className="text-sm text-gray-400">{leetcodeUser ?? "No user"}</p>
        </div>
      </div>

      <hr className="border-gray-600" />

      {/* Formulario para cambiar LeetCode user */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="New LeetCode Handle"
          value={NewLeetcodeUser}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-gray-700 placeholder-gray-500 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-accent outline-none transition"
        />
        <button
          onClick={async () => {
            await updateUser.mutateAsync({
              id: idUser,
              leetcodeUser: NewLeetcodeUser,
            });
            refetch();
          }}
          disabled={isRefetching}
          className={cn(
            "p-3 rounded-full",
            isRefetching
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-accent hover:bg-accent-dark transition"
          )}
        >
          {isRefetching ? (
            <AiOutlineLoading className="animate-spin text-xl" />
          ) : (
            <IoMdSend className="text-xl text-white" />
          )}
        </button>
      </div>

      {/* Botón de cierre de sesión */}
      <div className="gap-2">
        <Link
          href="/api/auth/signout"
          className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition text-center"
        >
          Sign out
        </Link>
      </div>

    </div>
  );
}
