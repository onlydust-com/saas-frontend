import "keen-slider/keen-slider.min.css";
import { ReactNode } from "react";
import "react-flagpack/dist/style.css";
import "remixicon/fonts/remixicon.css";

import { AppWrapper } from "@/shared/features/app-wrapper/app-wrapper";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AppWrapper>{children}</AppWrapper>;
}
