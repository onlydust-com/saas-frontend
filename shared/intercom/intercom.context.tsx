"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { Intercom, show } from "@intercom/messenger-js-sdk";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

import { useAuthUser } from "../hooks/auth/use-auth-user";

interface IntercomContextInterface {
  openIntercom: () => void;
}

export const IntercomContext = createContext<IntercomContextInterface>({
  openIntercom: () => {},
});

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID ?? "";

export function IntercomProvider({ children }: PropsWithChildren) {
  const { user } = useAuthUser();
  const { getAccessTokenSilently } = useAuth0();

  function openIntercom() {
    show();
  }

  async function initIntercom() {
    try {
      if (!INTERCOM_APP_ID) {
        return;
      }

      const token = await getAccessTokenSilently();

      fetch("/api/intercom", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          Intercom({
            app_id: INTERCOM_APP_ID,
            user_id: user?.id,
            name: user?.login,
            email: user?.email,
            user_hash: data.hash,
            custom_launcher_selector: "intercom-launcher",
            z_index: 40, // Needs to be below the side panels
          });
        })
        .catch(() => {
          console.log("Failed to initialize Intercom");
        });
    } catch {
      console.log("Failed to initialize Intercom");
    }
  }

  useEffect(() => {
    if (user) {
      initIntercom();
    }
  }, [user]);

  return <IntercomContext.Provider value={{ openIntercom }}>{children}</IntercomContext.Provider>;
}

export function useIntercom() {
  return useContext(IntercomContext);
}
