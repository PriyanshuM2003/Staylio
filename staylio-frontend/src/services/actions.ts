"use server";

import { api } from "@/lib/axios";
import { cookies } from "next/headers";

export async function handleRefresh() {
  const refreshToken = await getRefreshToken();
  const cookieStore = await cookies();

  try {
    const response = await api.post(
      "/auth/token/refresh/",
      {
        refresh: refreshToken,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const { access } = response.data;

    if (access) {
      cookieStore.set("session_access_token", access, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60,
        path: "/",
      });

      return access;
    } else {
      resetAuthCookies();
      return null;
    }
  } catch (error) {
    console.error("Axios error:", error);
    resetAuthCookies();
    return null;
  }
}

export async function handleLogin(
  userId: string,
  accessToken: string,
  refreshToken: string
) {
  const cookieStore = await cookies();
  cookieStore.set("session_userId", userId, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookieStore.set("session_access_token", accessToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60,
    path: "/",
  });

  cookieStore.set("session_refresh_token", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function resetAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set("session_userId", "");
  cookieStore.set("session_access_token", "");
  cookieStore.set("session_refresh_token", "");
}

export async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_userId")?.value;
  return userId ?? null;
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("session_access_token")?.value;
  accessToken ??= await handleRefresh();

  return accessToken;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("session_refresh_token")?.value;

  return refreshToken;
}
