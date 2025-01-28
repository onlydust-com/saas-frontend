"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

import { handleLoginWithRedirect } from "@/core/application/auth0-client-adapter/helpers";
import { useClientBootstrapAuth } from "@/core/bootstrap/auth/use-client-bootstrap-auth";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

interface AuthContext {
  isAuthenticated: boolean;
  redirectToSignup(): void;
  handleLogin(): void;
  redirectToApp(): void;
  isLoading: boolean;
}

const initialAuthContext: AuthContext = {
  isAuthenticated: false,
  redirectToSignup: () => {},
  handleLogin: () => {},
  redirectToApp: () => {},
  isLoading: true,
};

const AuthContext = createContext<AuthContext>(initialAuthContext);

const REDIRECT_TO_KEY = "redirectTo";

function setRedirectTo(url: string) {
  window.localStorage.setItem(REDIRECT_TO_KEY, url);
}

function getRedirectTo() {
  return window.localStorage.getItem(REDIRECT_TO_KEY) ?? NEXT_ROUTER.myDashboard.root;
}

function clearRedirectTo() {
  window.localStorage.removeItem(REDIRECT_TO_KEY);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useClientBootstrapAuth();
  const router = useRouter();

  function redirectToSignup() {
    if (!isAuthenticated && !isLoading && !error) {
      setRedirectTo(window.location.href);
      router.push(NEXT_ROUTER.signup.root);
    }
  }

  function redirectToApp() {
    // Keep as local var
    const redirectTo = getRedirectTo();
    clearRedirectTo();
    router.push(redirectTo);
  }

  function handleLogin() {
    if (!isAuthenticated && !isLoading && !error && loginWithRedirect) {
      handleLoginWithRedirect(loginWithRedirect);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, redirectToSignup, handleLogin, redirectToApp, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

export function withAuthenticated<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuthenticatedComponent(props: P) {
    const { isAuthenticated, redirectToSignup, isLoading } = useAuthContext();

    useEffect(() => {
      if (!isAuthenticated) {
        redirectToSignup();
      }
    }, [isAuthenticated, redirectToSignup]);

    if (!isAuthenticated || isLoading) {
      // TODO add spinner
      return null;
    }

    return <Component {...props} />;
  };
}

export function withSignup<P extends object>(Component: React.ComponentType<P>) {
  return function WithSignupComponent(props: P) {
    const router = useRouter();
    const { redirectToApp } = useAuthContext();
    const { user } = useAuthUser();

    useEffect(() => {
      if (user) {
        if (!user.hasAcceptedLatestTermsAndConditions) {
          router.push(NEXT_ROUTER.signup.termsAndConditions.root);
          return;
        }

        redirectToApp();
      }
    }, [router, user]);

    return <Component {...props} />;
  };
}
