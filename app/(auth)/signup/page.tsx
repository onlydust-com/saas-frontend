import { Github } from "lucide-react";

import { SignupCarousel } from "@/app/(auth)/signup/_features/signup-carousel/signup-caroursel";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export default function SignupPage() {
  return (
    <div className={"flex w-full max-w-xl flex-col gap-6 laptop:max-w-5xl"}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 laptop:grid-cols-2">
          <div className="bg-muted relative hidden border-r laptop:block">
            <SignupCarousel />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col border-b-1 px-6 py-5">
              <h1 className="font-clash text-3xl">Welcome to OnlyDust</h1>
            </div>

            <div className="flex flex-col gap-5 px-6 py-5">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle>Sign in</CardTitle>
                  <CardDescription className="text-foreground">
                    Log in to continue building the future of Web3. Access your dashboard, connect with ecosystems, and
                    shape tomorrow.
                  </CardDescription>
                  <CardDescription>Already have an account</CardDescription>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                  <Button variant={"secondary"}>
                    <Github className="h-4 w-4" />
                    Sign in with Github
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
                  <Button variant={"secondary"}>
                    <Github className="h-4 w-4" /> Sign up with Github
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
