// src/app/_components/nav/UserMenu.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";                        // ← 1) importamos Link
import { useSession, signIn } from "next-auth/react";
import { cn } from "utils/merge";
import ProfileCard from "../Profile/ProfileCard";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (loading) {
    return <span className="text-primary-foreground">Loading...</span>;
  }

  if (!session) {
    return (
      <Link
        href="/api/auth/signin"
        className="text-primary-foreground font-code text-sm hover:underline"
      >
        Sign in
      </Link>
    );
  }

  const { user } = session;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 font-code text-sm",
          "text-primary-foreground hover:underline"
        )}
      >
        {user.image && (
          <img
            src={user.image}
            alt={user.name ?? ""}
            className="w-6 h-6 rounded-full object-cover"
          />
        )}
        <span>{user.name}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-primary-light text-white rounded-xl p-6 shadow-lg w-120"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close profile"
              className="absolute top-2 right-3 text-2xl leading-none"
            >
              &times;
            </button>

            {/* ProfileCard */}
            <ProfileCard
              idUser={user.id}
              name={user.name}
              image={user.image}
            />
          </div>
        </div>
      )}
    </div>
  );
}
