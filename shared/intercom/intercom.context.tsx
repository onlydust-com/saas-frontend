"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Intercom from "@intercom/messenger-js-sdk";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

import { useAuthUser } from "../hooks/auth/use-auth-user";

interface IntercomContextInterface {
  hideIntercomLauncher: () => void;
  showIntercomLauncher: () => void;
}

export const IntercomContext = createContext<IntercomContextInterface>({
  hideIntercomLauncher: () => {},
  showIntercomLauncher: () => {},
});

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID ?? "";

export function IntercomProvider({ children }: PropsWithChildren) {
  const { user } = useAuthUser();
  const { getAccessTokenSilently } = useAuth0();

  function hideIntercomLauncher() {
    const intercomLauncher = document.querySelector("#intercom-container") as HTMLElement;
    if (intercomLauncher) {
      intercomLauncher.style.display = "none";
    }
  }

  function showIntercomLauncher() {
    const intercomLauncher = document.querySelector("#intercom-container") as HTMLElement;
    if (intercomLauncher) {
      intercomLauncher.style.display = "block";
    }
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

  return (
    <IntercomContext.Provider value={{ hideIntercomLauncher, showIntercomLauncher }}>
      {children}
    </IntercomContext.Provider>
  );
}

export function useIntercom() {
  return useContext(IntercomContext);
}
