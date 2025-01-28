"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Intercom from "@intercom/messenger-js-sdk";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

import { useAuthUser } from "../hooks/auth/use-auth-user";

interface IntercomContextInterface {
  sample: string;
}

export const IntercomContext = createContext<IntercomContextInterface>({
  sample: "",
});

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID ?? "";

export function IntercomProvider({ children }: PropsWithChildren) {
  const { user } = useAuthUser();
  const { getAccessTokenSilently } = useAuth0();

  async function initIntercom() {
    try {
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
          });
        })
        .catch(e => {
          console.error("Failed to initialize Intercom:", e);
        });
    } catch {
      //
    }
  }

  useEffect(() => {
    if (user) {
      initIntercom();
    }
  }, [user]);

  return <IntercomContext.Provider value={{ sample: "" }}>{children}</IntercomContext.Provider>;
}

export function useIntercom() {
  return useContext(IntercomContext);
}
