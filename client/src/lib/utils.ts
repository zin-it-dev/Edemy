import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "@clerk/nextjs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getToken(): Promise<string | null> {
  const { getToken } = await auth();
  try {
    const token = await getToken();
    return token;
  } catch (error) {
    console.error('Failed to retrieve Clerk token:', error);
    return null;
  }
}