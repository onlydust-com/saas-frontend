"use client";

import { Github, Linkedin } from "lucide-react";

import { SignupCarousel } from "@/app/(auth)/signup/_features/signup-carousel/signup-caroursel";

import { SocialIconLink } from "@/shared/features/social/social-icon-link/social-icon-link";
import { useAuthContext, withSignup } from "@/shared/providers/auth-provider";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { TypographyH2 } from "@/shared/ui/typography";

function SignupPage() {
  const { handleLogin } = useAuthContext();
  return (
    <div className={"flex w-full max-w-xl flex-col gap-6 laptop:max-w-6xl"}>
      <Card className="overflow-hidden">
        <CardContent className="flex p-0">
          <div className="relative hidden w-2/3 border-r bg-muted laptop:block">
            <SignupCarousel />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col border-b-1 px-6 py-5">
              <TypographyH2>Welcome to OnlyDust</TypographyH2>
            </div>

            <div className="flex h-full flex-col justify-between">
              <div className="flex flex-col gap-5 px-6 py-5">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription className="text-foreground">
                      Log in to continue building the future of Web3. Access your dashboard, connect with ecosystems,
                      and shape tomorrow.
                    </CardDescription>
                    <CardDescription>Already have an account</CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    <Button variant={"secondary"} onClick={handleLogin}>
                      <Github /> Sign in with Github
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription className="text-foreground">
                      Create your account to collaborate on cutting-edge projects, join thriving ecosystems, and bring
                      your ideas to life.
                    </CardDescription>
                    <CardDescription>Github account required</CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    <Button variant={"secondary"} onClick={handleLogin}>
                      <Github /> Sign up with Github
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-between gap-2 px-6 py-5">
                <Button variant={"link"} asChild size={"sm"}>
                  <a href="/documents/terms-and-conditions.pdf" target="_blank" rel="noopener noreferrer">
                    Terms & conditions
                  </a>
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://www.linkedin.com/company/only-dust" target="_blank" rel="noopener noreferrer">
                      <Linkedin />
                    </a>
                  </Button>

                  <Button variant="outline" size="icon" asChild>
                    <a href="https://x.com/onlydust_com" target="_blank" rel="noopener noreferrer">
                      <SocialIconLink url="https://x.com/onlydust_com" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withSignup(SignupPage);
