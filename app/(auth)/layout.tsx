import background from "@/public/images/backgrounds/auth-bg.png";
import Image from "next/image";
import { PropsWithChildren } from "react";

import { Logo } from "@/shared/components/logo/logo";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Image src={background} alt="" className={"absolute inset-0 size-full object-cover"} loading="eager" />

      <div className="relative z-10 flex min-h-svh flex-col p-6 md:p-10">
        <Logo classNames={{ image: "h-12" }} />

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full max-w-sm tablet:max-w-5xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
