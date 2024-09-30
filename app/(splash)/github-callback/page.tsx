import logoWhite from "@/public/images/logos/logo-white.svg";
import background from "@/public/images/splash/github-callback-background.svg";
import Image from "next/image";

import { Typo } from "@/design-system/atoms/typo";

export default function GithubCallbackPage() {
  return (
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
}
