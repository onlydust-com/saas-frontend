import { PropsWithChildren } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";

function Section({ children }: PropsWithChildren) {
  return (
    <section className="rounded-lg border border-container-stroke-separator bg-container-3 px-4 py-3">
      {children}
    </section>
  );
}

export function Summary() {
  return (
    <Paper size={"s"} container={"transparent"}>
      <div className="grid gap-3">
        <header className={"flex items-center gap-1"}>
          <Icon name={"ri-pie-chart-line"} size={16} />
          <Typo size={"xs"} weight={"medium"} translate={{ token: "programs:grantForm.summary.title" }} />
        </header>

        <Section>
          <div className="mb-4 flex items-center justify-between">
            <AvatarDescription
              avatarProps={{
                src: "",
                alt: "",
                size: "s",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.balance",
                  values: {
                    budget: "Starknet",
                  },
                },
              }}
            />

            <Typo size={"s"} color={"text-2"}>
              1000 STRK
            </Typo>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <AvatarDescription
              avatarProps={{
                src: "",
                alt: "",
                size: "s",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.grant",
                  values: {
                    budget: "Starknet",
                  },
                },
              }}
            />

            <div className={"flex items-center gap-1"}>
              <Icon name={"ri-arrow-right-line"} className={"text-label-blue"} />
              <Typo size={"s"}>1000 STRK</Typo>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-container-stroke-separator pt-2">
            <AvatarDescription
              avatarProps={{
                src: "",
                alt: "",
                size: "s",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.balance",
                  values: {
                    budget: "Starknet",
                  },
                },
              }}
            />

            <Typo size={"s"} color={"text-2"}>
              1000 STRK
            </Typo>
          </div>
        </Section>

        <Section>
          <div className="mb-4 flex items-center justify-between">
            <AvatarDescription
              avatarProps={{
                src: "",
                alt: "",
                size: "s",
                shape: "square",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.project.balance",
                  values: {
                    project: "Hylé",
                  },
                },
              }}
            />

            <Typo size={"s"} color={"text-2"}>
              1000 STRK
            </Typo>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <AvatarDescription
              avatarProps={{
                src: "",
                alt: "",
                size: "s",
                shape: "square",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.grant",
                  values: {
                    budget: "Starknet",
                  },
                },
              }}
            />

            <div className={"flex items-center gap-1"}>
              <Icon name={"ri-arrow-down-line"} className={"text-label-green"} />
              <Typo size={"s"}>1000 STRK</Typo>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-container-stroke-separator pt-2">
            <AvatarDescription
              avatarProps={{
                src: "",
                alt: "",
                size: "s",
                shape: "square",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.project.balance",
                  values: {
                    project: "Hylé",
                  },
                },
              }}
            />

            <Typo size={"s"} color={"text-2"}>
              1000 STRK
            </Typo>
          </div>
        </Section>
      </div>
    </Paper>
  );
}
