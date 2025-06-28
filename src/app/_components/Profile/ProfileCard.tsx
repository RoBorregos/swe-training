"use client";
import { cn } from "utils/merge";
import { FaUser } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { api } from "~/trpc/react";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";
import { IoWarning } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";

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
  const [NewLeetcodeUser, setInputValue] = useState("");

  const { data, isLoading, error, refetch, isRefetching } =
    api.profile.getById.useQuery(idUser);
  if (isLoading || error || !data) {
    return (
      <div className="w-80 rounded-xl bg-gray-700 p-6 text-center text-white">
        Loading…
      </div>
    );
  }

  const { leetcodeUser } = data;

  return (
    <div
      className={cn(
        "w-96 bg-gradient-to-br from-gray-800 to-gray-900",
        "flex flex-col gap-4 rounded-2xl p-6 text-white shadow-2xl",
      )}
    >
      {/* Encabezado: foto y nombre */}
      <div className="flex items-center gap-4">
        {image ? (
          <img
            src={image}
            alt={`${name}'s profile`}
            className="h-20 w-20 rounded-full border-2 border-accent object-cover"
          />
        ) : (
          <FaUser className="h-20 w-20 text-accent" />
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
          className="flex-1 rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-accent"
        />
        <button
          onClick={async () => {
            await updateUser.mutateAsync({
              id: idUser,
              leetcodeUser: NewLeetcodeUser,
            });
            await refetch();
          }}
          disabled={isRefetching || NewLeetcodeUser.length === 0}
          className={cn(
            "rounded-full p-3",
            isRefetching || NewLeetcodeUser.length === 0
              ? "cursor-not-allowed bg-gray-600"
              : "hover:bg-accent-dark bg-accent transition",
          )}
        >
          {isRefetching ? (
            <AiOutlineLoading className="animate-spin text-xl" />
          ) : (
            <IoMdSend className="text-xl text-white" />
          )}
        </button>
      </div>

      <UserStatus leetcodeUser={leetcodeUser ?? ""} returnSuccess={true} />

      {/* Botón de cierre de sesión */}
      <div className="gap-2">
        <Link
          href="/api/auth/signout"
          className="block w-full rounded-lg bg-red-600 py-2 text-center font-semibold text-white transition hover:bg-red-700"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
}
const UserStatus = ({
  leetcodeUser,
  returnSuccess = true,
}: {
  leetcodeUser: string;
  returnSuccess?: boolean;
}) => {
  const { data: leetcodeData, isLoading } =
    api.leetcode.getLeetcodeUserData.useQuery(
      {
        username: leetcodeUser ?? "",
      },
      {
        enabled: leetcodeUser.length > 0,
      },
    );

  if (leetcodeUser?.length == 0) {
    return (
      <div className="flex flex-row items-center justify-center gap-3 text-red-500">
        <IoWarning size={30} />
        <p>No LeetCode username set.</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center gap-3 text-blue-500">
        <AiOutlineLoading className="animate-spin" size={30} />
        <p>Validating leetcode handle...</p>
      </div>
    );
  }

  if (!leetcodeData) {
    return (
      <div className="flex flex-row items-center justify-center gap-3 text-orange-500">
        <IoWarning size={30} />
        <p>
          Unable to fetch LeetCode user data. Please check your username or try
          again later.
        </p>
      </div>
    );
  }

  if (returnSuccess)
    return (
      <div
        title={`Leetcode name: ${leetcodeData.matchedUser.profile.realName}. Description: ${leetcodeData.matchedUser.profile.aboutMe}`}
        className="flex flex-row items-center justify-center gap-3 text-green-400"
      >
        <IoCheckmarkCircle size={30} />
        <p>Leetcode handle validated!</p>
      </div>
    );

  return <></>;
};
