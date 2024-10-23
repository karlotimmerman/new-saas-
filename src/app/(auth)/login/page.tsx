"use client";

import { login, signup } from "./actions";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const message = searchParams?.get("message");

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen py-2",
      )}
    >
      <form className={cn("bg-white p-6 rounded-lg shadow-md w-full max-w-md")}>
        <h2 className={cn("text-2xl font-bold mb-6 text-center")}>Login</h2>
        {message && (
          <p className={cn("mb-4 text-sm text-red-600")}>{message}</p>
        )}
        <div className={cn("mb-4")}>
          <label
            htmlFor="email"
            className={cn("block text-sm font-medium text-gray-700")}
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={cn(
              "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm",
            )}
          />
        </div>
        <div className={cn("mb-6")}>
          <label
            htmlFor="password"
            className={cn("block text-sm font-medium text-gray-700")}
          >
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={cn(
              "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm",
            )}
          />
        </div>
        <div className={cn("mb-6 flex items-center")}>
          <Checkbox id="remember" name="remember" className={cn("mr-2")} />
          <label
            htmlFor="remember"
            className={cn("text-sm font-medium text-gray-700")}
          >
            Remember me
          </label>
        </div>
        <div className={cn("flex items-center justify-between mb-6")}>
          <Link
            href="/forgot-password"
            className={cn("text-sm text-primary hover:underline")}
          >
            Forgot password?
          </Link>
        </div>
        <div className={cn("flex items-center justify-between")}>
          <button
            formAction={login}
            className={cn(
              "bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
            )}
          >
            Log in
          </button>
          <button
            formAction={signup}
            className={cn(
              "bg-secondary text-white px-4 py-2 rounded-md shadow-sm hover:bg-secondary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary",
            )}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
