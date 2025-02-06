"use client";

import logoWhite from "@/public/images/logos/logo-white.svg";
import background from "@/public/images/splash/github-callback-background.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Typo } from "@/design-system/atoms/typo";

import { NEXT_ROUTER } from "@/shared/constants/router";

const GenericState = (
  <div className={"fixed inset-0 z-[9999]"}>
    <Image src={background} alt="" className={"absolute inset-0 size-full object-cover"} />
    <div className={"relative h-dvh w-dvw place-content-center place-items-center p-4"}>
      <Image src={logoWhite} alt="OnlyDust" width={78} height={78} className={"m-auto pb-[12%] desktop:pb-[170px]"} />

      <div className={"grid gap-5 text-center"}>
        <Typo
          variant={"heading"}
          size={"2xl"}
          weight={"medium"}
          translate={{
            token: "splash:githubCallback.title",
          }}
        />
        <Typo
          variant={"heading"}
          size={"md"}
          color={"tertiary"}
          translate={{
            token: "splash:githubCallback.subtitle",
          }}
        />
      </div>
    </div>
  </div>
);

function handleNavigation(searchParams: ReturnType<typeof useSearchParams>, router: ReturnType<typeof useRouter>) {
  const installationId = searchParams.get("installation_id");
  const state = searchParams.get("state");

  if (installationId && !state) {
    router.push(NEXT_ROUTER.createProject.root);
    return null;
  }

  if (!installationId && !state) {
    router.push(NEXT_ROUTER.home.root);
    return null;
  }

  return GenericState;
}

export default function GithubCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return handleNavigation(searchParams, router);
}
